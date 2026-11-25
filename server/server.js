import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiApp } from './apiApp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = process.env.PORT || 3001;

const app = express();

// Mount all API routes
app.use(apiApp);

// In production, serve Vite compiled client assets
if (process.env.NODE_ENV === 'production' || process.argv.includes('--serve-dist')) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🍗 Red Bucket Biryani Server running at http://localhost:${PORT}`);
});
