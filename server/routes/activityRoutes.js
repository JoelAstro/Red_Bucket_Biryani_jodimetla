import { Router } from 'express';
import { getActivities } from '../db.js';
import { requireAuth } from '../middleware.js';

export const activityRouter = Router();

/**
 * Admin: Get activity log
 * GET /api/activity
 */
activityRouter.get('/', requireAuth, (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
  const activities = getActivities(limit);
  return res.json({ activities });
});
