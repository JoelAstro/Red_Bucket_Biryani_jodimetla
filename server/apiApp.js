import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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
apiApp.use(express.json());
apiApp.use(express.urlencoded({ extended: true }));

// Serve static uploads
apiApp.use('/uploads', express.static(UPLOAD_DIR));

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
