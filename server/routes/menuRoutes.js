import { Router } from 'express';
import {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  toggleMenuItemAvailability,
  deleteMenuItem,
  getCategories
} from '../db.js';
import { requireAuth } from '../middleware.js';

export const menuRouter = Router();

/**
 * Public: Get all menu items and categories
 * GET /api/menu
 */
menuRouter.get('/', (req, res) => {
  const items = getMenuItems();
  const categories = getCategories();
  return res.json({ items, categories });
});

/**
 * Public/Admin: Get single menu item by ID
 * GET /api/menu/:id
 */
menuRouter.get('/:id', (req, res) => {
  const item = getMenuItemById(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }
  return res.json({ item });
});

/**
 * Admin: Add new menu item
 * POST /api/menu
 */
menuRouter.post('/', requireAuth, (req, res) => {
  try {
    const { name, price, bucketCategory, foodType, foodCategory } = req.body || {};

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Food item name is required.' });
    }

    if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ error: 'A valid positive price is required.' });
    }

    const newItem = addMenuItem(req.body, req.user.email);
    return res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error('Error adding menu item:', err);
    return res.status(500).json({ error: 'Failed to add menu item.' });
  }
});

/**
 * Admin: Update existing menu item
 * PUT /api/menu/:id
 */
menuRouter.put('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const existing = getMenuItemById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    const updated = updateMenuItem(id, req.body, req.user.email);
    return res.json({ success: true, item: updated });
  } catch (err) {
    console.error('Error updating menu item:', err);
    return res.status(500).json({ error: 'Failed to update menu item.' });
  }
});

/**
 * Admin: Toggle food availability (Available / Unavailable)
 * PATCH /api/menu/:id/availability
 */
menuRouter.patch('/:id/availability', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body || {};

    if (isAvailable === undefined) {
      return res.status(400).json({ error: 'Availability state (isAvailable) is required.' });
    }

    const item = toggleMenuItemAvailability(id, isAvailable, req.user.email);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    return res.json({
      success: true,
      message: `Item marked as ${item.isAvailable ? 'available' : 'unavailable'}.`,
      item
    });
  } catch (err) {
    console.error('Error toggling availability:', err);
    return res.status(500).json({ error: 'Failed to update food item availability.' });
  }
});

/**
 * Admin: Remove a menu item
 * DELETE /api/menu/:id
 */
menuRouter.delete('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const existing = getMenuItemById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    const removed = deleteMenuItem(id, req.user.email);
    if (!removed) {
      return res.status(500).json({ error: 'Failed to delete menu item.' });
    }

    return res.json({ success: true, message: `"${existing.name}" removed from menu.` });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    return res.status(500).json({ error: 'Failed to delete menu item.' });
  }
});
