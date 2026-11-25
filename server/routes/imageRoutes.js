import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware.js';
import { logActivity } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.resolve(__dirname, '../../public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const uniqueName = `food-${Date.now()}-${cleanBase}${ext}`;
    cb(null, uniqueName);
  }
});

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
  upload.single('image')(req, res, (err) => {
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

    const publicUrl = `/uploads/${req.file.filename}`;

    logActivity(
      'IMAGE_UPLOADED',
      `Uploaded new food image: "${req.file.filename}" (${(req.file.size / 1024).toFixed(1)} KB)`,
      'Images',
      req.user.email
    );

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: publicUrl
      }
    });
  });
});

/**
 * List uploaded and existing catalog food images
 * GET /api/images
 */
imageRouter.get('/', requireAuth, (req, res) => {
  try {
    const images = [];

    // 1. Read uploaded images
    if (fs.existsSync(UPLOAD_DIR)) {
      const uploadFiles = fs.readdirSync(UPLOAD_DIR);
      uploadFiles.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          const stats = fs.statSync(path.join(UPLOAD_DIR, file));
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
    }

    // 2. Read existing bucket images
    const bucketImagesDir = path.resolve(__dirname, '../../public/images/buckets');
    if (fs.existsSync(bucketImagesDir)) {
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
    }

    return res.json({ images });
  } catch (err) {
    console.error('Error listing images:', err);
    return res.status(500).json({ error: 'Failed to retrieve image list.' });
  }
});
