import { Router } from 'express';
import { getContactInfo, updateContactInfo } from '../db.js';
import { requireAuth } from '../middleware.js';

export const contactRouter = Router();

/**
 * Public: Get restaurant contact information & hours
 * GET /api/contact
 */
contactRouter.get('/', (req, res) => {
  const contact = getContactInfo();
  return res.json({ contact });
});

/**
 * Admin: Update restaurant contact information
 * PUT /api/contact
 */
contactRouter.put('/', requireAuth, (req, res) => {
  try {
    const {
      fullName,
      phone,
      whatsappNumber,
      email,
      address,
      googleMapsUrl,
      openingHours
    } = req.body || {};

    // Validate phone numbers (must be 10 digits)
    if (phone && !/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      return res.status(400).json({ error: 'Primary phone number must be a valid 10-digit number.' });
    }

    if (whatsappNumber && !/^\d{10,12}$/.test(whatsappNumber.replace(/[^0-9]/g, ''))) {
      return res.status(400).json({ error: 'WhatsApp number must be a valid 10-digit or country-code number.' });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const updated = updateContactInfo(req.body, req.user.email);
    return res.json({
      success: true,
      message: 'Restaurant contact information updated successfully.',
      contact: updated
    });
  } catch (err) {
    console.error('Error updating contact info:', err);
    return res.status(500).json({ error: 'Failed to update restaurant contact details.' });
  }
});
