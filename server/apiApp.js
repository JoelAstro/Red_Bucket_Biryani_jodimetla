import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureDatabaseLoaded } from './db.js';
import { authRouter } from './routes/authRoutes.js';
import { menuRouter } from './routes/menuRoutes.js';
import { contactRouter } from './routes/contactRoutes.js';
import { imageRouter } from './routes/imageRoutes.js';
import { activityRouter } from './routes/activityRoutes.js';
import { dashboardRouter } from './routes/dashboardRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.resolve(__dirname, '../public/uploads');

export const apiApp = express();

// Standard middlewares
apiApp.use(cors({ origin: true, credentials: true }));

// Normalize URL for Netlify Functions (e.g. /.netlify/functions/api/... -> /api/...)
apiApp.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    const stripped = req.url.slice('/.netlify/functions/api'.length) || '/';
    if (stripped.startsWith('/uploads')) {
      req.url = stripped;
    } else {
      req.url = stripped.startsWith('/api') ? stripped : `/api${stripped}`;
    }
  }
  next();
});

// Ensure database is connected / loaded from persistent store on every request
apiApp.use(async (req, res, next) => {
  try {
    await ensureDatabaseLoaded();
    next();
  } catch (err) {
    console.error('[API] Database initialization error:', err);
    res.status(500).json({ error: 'Database service initialization error' });
  }
});

apiApp.use(express.json());
apiApp.use(express.urlencoded({ extended: true }));

// Serve local static uploads if present
apiApp.use('/uploads', express.static(UPLOAD_DIR));
apiApp.use('/api/uploads', express.static(UPLOAD_DIR));

// Fallback image streaming for images stored in cloud/Netlify Blobs
apiApp.get(['/uploads/:filename', '/api/uploads/:filename'], (req, res, next) => {
  req.url = `/blob/${req.params.filename}`;
  imageRouter(req, res, next);
});

// Mount API subrouters
apiApp.use('/api/auth', authRouter);
apiApp.use('/api/menu', menuRouter);
apiApp.use('/api/contact', contactRouter);
apiApp.use('/api/images', imageRouter);
apiApp.use('/api/activity', activityRouter);
apiApp.use('/api/dashboard', dashboardRouter);

// Health check endpoint
apiApp.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Red Bucket Biryani Kitchen Head API',
    timestamp: new Date().toISOString()
  });
});
