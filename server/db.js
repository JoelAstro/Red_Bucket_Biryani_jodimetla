import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashPassword } from './auth.js';
import { MENU_ITEMS, BUCKET_EXPERIENCES } from '../src/data/menuData.ts';
import { RESTAURANT_INFO } from '../src/data/restaurantInfo.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../data/restaurant_db.json');

// In-memory database cache
let db = null;
const activeSessions = new Map();

/**
 * Initialize database with existing project data if file doesn't exist
 */
function initDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(raw);
      // Ensure required collections exist
      if (!db.users) db.users = [];
      if (!db.menuItems) db.menuItems = [];
      if (!db.categories) db.categories = [];
      if (!db.contact) db.contact = {};
      if (!db.activity) db.activity = [];
      return;
    } catch (err) {
      console.error('Error reading database file, re-initializing:', err);
    }
  }

  console.log('Seeding initial restaurant database from project sources...');
  
  // Hash initial password for Kitchen Head account
  const initialEmail = process.env.INITIAL_ADMIN_EMAIL || 'joelramireddy@gmail.com';
  const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || 'RedBucket@2026';
  const { salt, hash } = hashPassword(initialPassword);

  const initialUser = {
    id: 'user-kitchen-head-1',
    email: initialEmail,
    name: 'Kitchen Head',
    role: 'kitchen_head',
    salt,
    passwordHash: hash,
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Ensure each menu item has isAvailable flag (default true)
  const seededMenuItems = MENU_ITEMS.map((item) => ({
    ...item,
    isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
    updatedAt: new Date().toISOString()
  }));

  const seededContact = {
    ...RESTAURANT_INFO,
    email: 'redbucketbiryani.jodimetla@gmail.com',
    address: 'Near Jodimetla Crossroads, Warangal Highway, Ghatkesar Mandal, Hyderabad, Telangana 500088',
    openingHours: {
      ...RESTAURANT_INFO.openingHours,
      weeklyClosingDay: 'None (Open 7 Days a Week)'
    },
    updatedAt: new Date().toISOString()
  };

  const initialActivity = [
    {
      id: 'act-' + Date.now(),
      action: 'SYSTEM_INITIALIZED',
      description: 'Kitchen Head Admin Console initialized with 33 verified menu items',
      section: 'System',
      user: 'System Initialization',
      timestamp: new Date().toISOString()
    }
  ];

  db = {
    users: [initialUser],
    menuItems: seededMenuItems,
    categories: BUCKET_EXPERIENCES,
    contact: seededContact,
    activity: initialActivity
  };

  saveDatabaseSync();
}

/**
 * Persist database to disk atomically
 */
function saveDatabaseSync() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to save database file:', err);
  }
}

// Ensure database is ready
initDatabase();

/* =========================================================================
   USER & AUTH METHODS
   ========================================================================= */

export function getUserByEmail(email) {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  return db.users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export function getUserById(id) {
  return db.users.find((u) => u.id === id) || null;
}

export function updateUserPassword(userId, newSalt, newHash, userEmail) {
  const user = getUserById(userId);
  if (!user) return false;
  user.salt = newSalt;
  user.passwordHash = newHash;
  user.mustChangePassword = false;
  user.updatedAt = new Date().toISOString();
  logActivity('PASSWORD_CHANGED', 'Kitchen Head password changed successfully', 'Account', userEmail || user.email);
  saveDatabaseSync();
  return true;
}

export function createSession(user) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36) + Math.random().toString(36).substring(2);
  const sessionData = {
    userId: user.id,
    email: user.email,
    role: user.role,
    mustChangePassword: user.mustChangePassword,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  activeSessions.set(token, sessionData);
  return token;
}

export function getSession(token) {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }
  return session;
}

export function deleteSession(token) {
  if (!token) return;
  activeSessions.delete(token);
}

/* =========================================================================
   MENU METHODS
   ========================================================================= */

export function getMenuItems() {
  return db.menuItems || [];
}

export function getMenuItemById(id) {
  return (db.menuItems || []).find((item) => item.id === id) || null;
}

export function addMenuItem(newItemData, userEmail) {
  const id = newItemData.id || `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const item = {
    id,
    name: newItemData.name.trim(),
    bucketCategory: newItemData.bucketCategory || 'solo',
    bucketLabel: newItemData.bucketLabel || 'Solo Bucket',
    serves: newItemData.serves || '1–2 persons',
    price: Number(newItemData.price) || 0,
    foodType: newItemData.foodType || 'chicken',
    foodCategory: newItemData.foodCategory || 'Chicken',
    description: newItemData.description ? newItemData.description.trim() : '',
    badge: newItemData.badge ? newItemData.badge.trim() : undefined,
    image: newItemData.image ? newItemData.image.trim() : undefined,
    isVeg: Boolean(newItemData.isVeg),
    isBestseller: Boolean(newItemData.isBestseller),
    isAvailable: newItemData.isAvailable !== undefined ? Boolean(newItemData.isAvailable) : true,
    updatedAt: new Date().toISOString()
  };

  db.menuItems.unshift(item);
  logActivity('ITEM_ADDED', `Added new menu item: "${item.name}" (₹${item.price})`, 'Menu', userEmail);
  saveDatabaseSync();
  return item;
}

export function updateMenuItem(id, updates, userEmail) {
  const index = (db.menuItems || []).findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = db.menuItems[index];
  const updated = {
    ...current,
    ...updates,
    id: current.id, // prevent changing primary id
    price: updates.price !== undefined ? Number(updates.price) : current.price,
    updatedAt: new Date().toISOString()
  };

  db.menuItems[index] = updated;
  logActivity('ITEM_EDITED', `Updated details for menu item: "${updated.name}"`, 'Menu', userEmail);
  saveDatabaseSync();
  return updated;
}

export function toggleMenuItemAvailability(id, isAvailable, userEmail) {
  const index = (db.menuItems || []).findIndex((item) => item.id === id);
  if (index === -1) return null;

  db.menuItems[index].isAvailable = Boolean(isAvailable);
  db.menuItems[index].updatedAt = new Date().toISOString();

  const statusStr = isAvailable ? 'AVAILABLE' : 'UNAVAILABLE (Sold Out)';
  logActivity(
    'AVAILABILITY_CHANGED',
    `Marked "${db.menuItems[index].name}" as ${statusStr}`,
    'Availability',
    userEmail
  );
  saveDatabaseSync();
  return db.menuItems[index];
}

export function deleteMenuItem(id, userEmail) {
  const index = (db.menuItems || []).findIndex((item) => item.id === id);
  if (index === -1) return false;

  const item = db.menuItems[index];
  db.menuItems.splice(index, 1);
  logActivity('ITEM_REMOVED', `Removed menu item: "${item.name}"`, 'Menu', userEmail);
  saveDatabaseSync();
  return true;
}

export function getCategories() {
  return db.categories || [];
}

/* =========================================================================
   CONTACT & RESTAURANT INFO METHODS
   ========================================================================= */

export function getContactInfo() {
  return db.contact || {};
}

export function updateContactInfo(newInfo, userEmail) {
  db.contact = {
    ...db.contact,
    ...newInfo,
    updatedAt: new Date().toISOString()
  };

  // Re-generate derived links if numbers changed
  if (newInfo.phone) {
    db.contact.displayPhone = `+91 ${newInfo.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}`;
    db.contact.telLink = `tel:+91${newInfo.phone}`;
  }
  if (newInfo.whatsappNumber) {
    db.contact.whatsappNumber = newInfo.whatsappNumber.replace(/[^0-9]/g, '');
  }

  logActivity('CONTACT_UPDATED', 'Updated restaurant contact details and opening hours', 'Contact', userEmail);
  saveDatabaseSync();
  return db.contact;
}

/* =========================================================================
   ACTIVITY HISTORY METHODS
   ========================================================================= */

export function getActivities(limit = 50) {
  return (db.activity || []).slice(0, limit);
}

export function logActivity(action, description, section, userEmail) {
  const entry = {
    id: 'act-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    action,
    description,
    section: section || 'General',
    user: userEmail || 'Kitchen Head',
    timestamp: new Date().toISOString()
  };

  if (!db.activity) db.activity = [];
  db.activity.unshift(entry);

  // Keep last 300 activities
  if (db.activity.length > 300) {
    db.activity = db.activity.slice(0, 300);
  }
}

/* =========================================================================
   DASHBOARD STATS
   ========================================================================= */

export function getDashboardStats() {
  const items = db.menuItems || [];
  const totalMenuItems = items.length;
  const availableItems = items.filter((i) => i.isAvailable !== false).length;
  const unavailableItems = items.filter((i) => i.isAvailable === false).length;
  const totalCategories = (db.categories || []).length;
  const recentActivities = (db.activity || []).slice(0, 5);

  const categoryCounts = {};
  items.forEach((item) => {
    const cat = item.foodCategory || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return {
    totalMenuItems,
    availableItems,
    unavailableItems,
    totalCategories,
    recentActivities,
    categoryCounts
  };
}
