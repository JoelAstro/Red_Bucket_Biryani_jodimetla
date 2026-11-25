import { Router } from 'express';
import { getUserByEmail, getUserById, updateUserPassword, createSession, deleteSession } from '../db.js';
import { verifyPassword, hashPassword } from '../auth.js';
import { requireAuth } from '../middleware.js';

export const authRouter = Router();

/**
 * Kitchen Head Login
 * POST /api/auth/login
 */
authRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = verifyPassword(password, user.salt, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = createSession(user);

    // Return safe user details (NO password hash or salt)
    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        mustChangePassword: user.mustChangePassword
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

/**
 * Get Current Logged-in User
 * GET /api/auth/me
 */
authRouter.get('/me', requireAuth, (req, res) => {
  const user = getUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User account not found.' });
  }

  return res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      mustChangePassword: user.mustChangePassword
    }
  });
});

/**
 * Change Kitchen Head Password
 * POST /api/auth/change-password
 */
authRouter.post('/change-password', requireAuth, (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body || {};

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirmation do not match.' });
    }

    const user = getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    const isValid = verifyPassword(currentPassword, user.salt, user.passwordHash);
    if (!isValid) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    // Hash and store new password
    const { salt: newSalt, hash: newHash } = hashPassword(newPassword);
    updateUserPassword(user.id, newSalt, newHash, user.email);

    return res.json({
      success: true,
      message: 'Password changed successfully.'
    });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({ error: 'Internal server error while updating password.' });
  }
});

/**
 * Kitchen Head Logout
 * POST /api/auth/logout
 */
authRouter.post('/logout', requireAuth, (req, res) => {
  deleteSession(req.token);
  return res.json({ success: true, message: 'Logged out successfully.' });
});
