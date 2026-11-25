import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiApp } from './apiApp.js';

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
const DIST_DIR = path.resolve(BASE_DIR, '../dist');
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
