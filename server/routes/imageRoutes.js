import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware.js';
import { logActivity } from '../db.js';

function getBaseDir() {
  if (typeof import.meta?.dirname === 'string') {
    return import.meta.dirname;
  }
  try {
    if (typeof import.meta?.url === 'string') {
      return path.dirname(fileURLToPath(import.meta.url));
    }
  } catch {}
  if (typeof __dirname !== 'undefined' && __dirname) {
    return __dirname;
  }
  return process.cwd();
}

const BASE_DIR = getBaseDir();
const UPLOAD_DIR = path.resolve(BASE_DIR, '../../public/uploads');

// Attempt to create local upload directory if writable
try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch {
  // Read-only filesystem in serverless sandbox
}

let netlifyImageStore = null;

async function getNetlifyImageStore() {
  if (netlifyImageStore) return netlifyImageStore;
  try {
    const { getStore } = await import('@netlify/blobs');
    const storeOptions = { name: 'food-images' };
    if (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_ACCESS_TOKEN) {
      storeOptions.siteID = process.env.NETLIFY_SITE_ID;
      storeOptions.token = process.env.NETLIFY_ACCESS_TOKEN;
    }
    netlifyImageStore = getStore(storeOptions);
    return netlifyImageStore;
  } catch {
    return null;
  }
}

// Use memoryStorage so file buffer is available for Netlify Blobs & local disk
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export const imageRouter = Router();

/**
 * Upload a food image
 * POST /api/images/upload
 */
imageRouter.post('/upload', requireAuth, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Image size exceeds the 5MB maximum limit.' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please select an image file to upload.' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const cleanBase = path
      .basename(req.file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const uniqueName = `food-${Date.now()}-${cleanBase}${ext}`;

    // 1. Try persisting to Netlify Blobs
    const store = await getNetlifyImageStore();
    if (store) {
      try {
        await store.set(uniqueName, req.file.buffer, {
          metadata: {
            contentType: req.file.mimetype,
            originalName: req.file.originalname,
            size: req.file.size,
            uploadedAt: new Date().toISOString()
          }
        });
        console.log(`[Images] Saved "${uniqueName}" to Netlify Blobs persistent store.`);
      } catch (blobErr) {
        console.error('[Images] Error writing to Netlify Blobs:', blobErr);
      }
    }

    // 2. Also save to local disk if directory is writable
    try {
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }
      fs.writeFileSync(path.join(UPLOAD_DIR, uniqueName), req.file.buffer);
    } catch {
      // In serverless, disk might be read-only - Netlify Blobs handles it
    }

    const publicUrl = `/uploads/${uniqueName}`;

    logActivity(
      'IMAGE_UPLOADED',
      `Uploaded new food image: "${uniqueName}" (${(req.file.size / 1024).toFixed(1)} KB)`,
      'Images',
      req.user.email
    );

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      file: {
        filename: uniqueName,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: publicUrl
      }
    });
  });
});

/**
 * Stream an uploaded image from Netlify Blobs or local disk
 * GET /api/images/blob/:filename
 */
imageRouter.get('/blob/:filename', async (req, res) => {
  const { filename } = req.params;

  // 1. Check local disk
  const localPath = path.join(UPLOAD_DIR, filename);
  if (fs.existsSync(localPath)) {
    return res.sendFile(localPath);
  }

  // 2. Check Netlify Blobs
  const store = await getNetlifyImageStore();
  if (store) {
    try {
      const { data, metadata } = await store.getWithMetadata(filename, { type: 'arrayBuffer' });
      if (data) {
        const buffer = Buffer.from(data);
        const contentType = metadata?.contentType || 'image/jpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        return res.send(buffer);
      }
    } catch (err) {
      console.error(`[Images] Error fetching blob "${filename}":`, err.message);
    }
  }

  return res.status(404).send('Image not found');
});

/**
 * List uploaded and existing catalog food images
 * GET /api/images
 */
imageRouter.get('/', requireAuth, async (req, res) => {
  try {
    const images = [];
    const seenNames = new Set();

    // 1. Read local uploaded images if available
    if (fs.existsSync(UPLOAD_DIR)) {
      try {
        const uploadFiles = fs.readdirSync(UPLOAD_DIR);
        uploadFiles.forEach((file) => {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const stats = fs.statSync(path.join(UPLOAD_DIR, file));
            seenNames.add(file);
            images.push({
              id: `upload-${file}`,
              name: file,
              url: `/uploads/${file}`,
              category: 'Uploaded Foods',
              size: stats.size,
              createdAt: stats.birthtime.toISOString()
            });
          }
        });
      } catch {}
    }

    // 2. Read images from Netlify Blobs persistent store
    const store = await getNetlifyImageStore();
    if (store) {
      try {
        const { blobs } = await store.list();
        if (Array.isArray(blobs)) {
          blobs.forEach((blob) => {
            if (!seenNames.has(blob.key)) {
              seenNames.add(blob.key);
              images.push({
                id: `blob-${blob.key}`,
                name: blob.key,
                url: `/uploads/${blob.key}`,
                category: 'Uploaded Foods (Cloud)',
                size: blob.metadata?.size || 0,
                createdAt: blob.metadata?.uploadedAt || blob.uploadedAt || new Date().toISOString()
              });
            }
          });
        }
      } catch (err) {
        console.warn('[Images] Could not list Netlify Blobs images:', err.message);
      }
    }

    // 3. Read existing bundled bucket images
    const bucketImagesDir = path.resolve(BASE_DIR, '../../public/images/buckets');
    if (fs.existsSync(bucketImagesDir)) {
      try {
        const bucketFiles = fs.readdirSync(bucketImagesDir);
        bucketFiles.forEach((file) => {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const stats = fs.statSync(path.join(bucketImagesDir, file));
            images.push({
              id: `bucket-${file}`,
              name: file,
              url: `/images/buckets/${file}`,
              category: 'Official Buckets',
              size: stats.size,
              createdAt: stats.birthtime.toISOString()
            });
          }
        });
      } catch {}
    }

    return res.json({ images });
  } catch (err) {
    console.error('Error listing images:', err);
    return res.status(500).json({ error: 'Failed to retrieve image list.' });
  }
});
