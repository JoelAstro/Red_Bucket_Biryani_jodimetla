import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ShieldCheck,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
  Key
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AccountSettingsPage: React.FC = () => {
  const { user, changePassword, logout } = useAdminAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 5000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!currentPassword || !newPassword) {
      showNotification('error', 'Please fill in both current and new passwords.');
      return;
    }

    if (newPassword.length < 8) {
      showNotification('error', 'New password must be at least 8 characters in length.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('error', 'New password and confirmation do not match.');
      return;
    }

    try {
      setIsLoading(true);
      await changePassword(currentPassword, newPassword, confirmPassword);
      showNotification('success', 'Password updated successfully! Your new password is now active.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to change password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 select-none max-w-3xl">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xl animate-in slide-in-from-top-2 duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/90 border border-brand-red/50 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-brand-red" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold tracking-wider uppercase mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Security & Credentials</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
          Account Settings & Security
        </h1>
        <p className="text-xs sm:text-sm text-cream/70 mt-0.5">
          Manage your Kitchen Head credentials, review active permissions, and update password.
        </p>
      </div>

      {/* Current Account Profile Card */}
      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-gold font-black text-lg">
            KH
          </div>
          <div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <span>{user?.name || 'Kitchen Head'}</span>
              <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-black uppercase tracking-wider">
                Kitchen Admin
              </span>
            </div>
            <div className="text-xs text-cream/70 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>{user?.email || 'joelramireddy@gmail.com'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Branch Scope</span>
            <div className="font-semibold text-white">Jodimetla Branch, Hyderabad</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Role Permissions</span>
            <div className="font-semibold text-white">Menu, Availability, Images & Contact</div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950/80 border border-gold/30 shadow-xl space-y-5">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2.5 rounded-xl bg-gold/20 text-gold">
            <Key className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white">Change Kitchen Head Password</h2>
            <p className="text-xs text-cream/60">
              Ensure your new password contains at least 8 characters.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-10 pr-10 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cream/50 hover:text-white"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
              New Password (minimum 8 characters) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showNew ? 'text' : 'password'}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter strong new password"
                className="w-full pl-10 pr-10 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cream/50 hover:text-white"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
              Confirm New Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showNew ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-deep-red hover:from-red-600 hover:to-brand-red text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-red/40 active:scale-95 transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Logout Box */}
      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Sign Out of Kitchen Console</div>
          <p className="text-xs text-cream/60 mt-0.5">
            End your active administrative session on this device.
          </p>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-red-950/80 text-cream hover:text-red-300 border border-white/10 hover:border-red-500/50 text-xs font-bold transition-all flex items-center gap-2 active:scale-95 w-fit"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
