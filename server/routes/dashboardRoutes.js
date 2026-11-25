import { Router } from 'express';
import { getDashboardStats } from '../db.js';
import { requireAuth } from '../middleware.js';

export const dashboardRouter = Router();

/**
 * Admin: Get dashboard summary statistics
 * GET /api/dashboard/stats
 */
dashboardRouter.get('/stats', requireAuth, (req, res) => {
  const stats = getDashboardStats();
  return res.json({ stats });
});
