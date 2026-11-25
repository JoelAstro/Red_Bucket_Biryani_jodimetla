import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MapPin,
  Clock,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { adminApi } from '../services/adminApi';
import { useRestaurantData } from '../../context/RestaurantDataContext';

export const ContactManagementPage: React.FC = () => {
  const { refreshData } = useRestaurantData();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    branchName: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    googleMapsUrl: '',
    days: 'Every day',
    timings: '12:00 PM – 1:00 AM',
    openTime: '12:00',
    closeTime: '01:00',
    weeklyClosingDay: 'None (Open 7 Days a Week)'
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const loadContact = async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.getContactInfo();
      if (res && res.contact) {
        const c = res.contact;
        setFormData({
          fullName: c.fullName || '',
          branchName: c.branchName || '',
          phone: c.phone || '',
          whatsappNumber: c.whatsappNumber || '',
          email: c.email || 'redbucketbiryani.jodimetla@gmail.com',
          address: c.address || 'Jodimetla, Hyderabad, Telangana 500088',
          googleMapsUrl: c.googleMapsUrl || '',
          days: c.openingHours?.days || 'Every day',
          timings: c.openingHours?.timings || '12:00 PM – 1:00 AM',
          openTime: c.openingHours?.openTime || '12:00',
          closeTime: c.openingHours?.closeTime || '01:00',
          weeklyClosingDay: c.openingHours?.weeklyClosingDay || 'None (Open 7 Days a Week)'
        });
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to load contact information.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  const handleValidateAndOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Phone validation (10 digits)
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      showNotification('error', 'Primary contact phone number must be exactly 10 digits.');
      return;
    }

    // 2. WhatsApp validation (10 to 12 digits)
    const cleanWa = formData.whatsappNumber.replace(/[^0-9]/g, '');
    if (cleanWa.length < 10 || cleanWa.length > 12) {
      showNotification('error', 'WhatsApp contact number must be 10 or 12 digits with country code.');
      return;
    }

    // 3. Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showNotification('error', 'Please enter a valid email address.');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleExecuteSave = async () => {
    try {
      setIsSaving(true);
      setShowConfirmModal(false);

      const payload = {
        fullName: formData.fullName,
        branchName: formData.branchName,
        phone: formData.phone.replace(/[^0-9]/g, ''),
        whatsappNumber: formData.whatsappNumber.replace(/[^0-9]/g, ''),
        email: formData.email,
        address: formData.address,
        googleMapsUrl: formData.googleMapsUrl,
        openingHours: {
          days: formData.days,
          timings: formData.timings,
          openTime: formData.openTime,
          closeTime: formData.closeTime,
          weeklyClosingDay: formData.weeklyClosingDay
        }
      };

      const res = await adminApi.updateContactInfo(payload);
      showNotification('success', res.message || 'Contact details updated successfully across website.');
      // Synchronize public site context
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update contact info.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 select-none max-w-4xl">
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
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Store Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            Contact & Operating Hours
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 mt-0.5">
            Single source of truth. Updates here automatically sync across the entire public website.
          </p>
        </div>

        <button
          onClick={loadContact}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-gold/40 text-cream/90 hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-60 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gold ${isLoading ? 'animate-spin' : ''}`} />
          <span>Reload Details</span>
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleValidateAndOpenConfirm} className="space-y-6">
        {/* Section 1: Brand & Identity */}
        <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-gold font-bold text-sm border-b border-white/10 pb-3">
            <Info className="w-4 h-4 text-gold" />
            <span>Restaurant Brand & Branch Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Full Restaurant Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Branch Label *
              </label>
              <input
                type="text"
                required
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Numbers & Email */}
        <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-gold font-bold text-sm border-b border-white/10 pb-3">
            <PhoneCall className="w-4 h-4 text-gold" />
            <span>Ordering Phone & WhatsApp Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Primary Calling Phone (10 digits) *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 8008906029"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-mono focus:outline-none"
              />
              <span className="text-[10px] text-cream/40 mt-1 block">
                Synchronizes Call Now buttons in header, hero, menu, and footer.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                WhatsApp Order Number *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="e.g. 918008906029"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-mono focus:outline-none"
              />
              <span className="text-[10px] text-cream/40 mt-1 block">
                Synchronizes WhatsApp buttons and pre-filled order messages.
              </span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Official Restaurant Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. redbucketbiryani.jodimetla@gmail.com"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Physical Location & Google Maps */}
        <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-gold font-bold text-sm border-b border-white/10 pb-3">
            <MapPin className="w-4 h-4 text-gold" />
            <span>Branch Physical Address & Google Maps</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Complete Branch Address *
              </label>
              <textarea
                rows={2}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Google Maps Location / Directions URL *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  required
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-mono text-xs focus:outline-none"
                />
                {formData.googleMapsUrl && (
                  <a
                    href={formData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900 border border-white/10 text-gold hover:text-white shrink-0"
                    title="Test Google Maps Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Operating Hours & Schedule */}
        <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-gold font-bold text-sm border-b border-white/10 pb-3">
            <Clock className="w-4 h-4 text-gold" />
            <span>Operating Timings & Weekly Schedule</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Operating Days Display *
              </label>
              <input
                type="text"
                required
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                placeholder="e.g. Every day"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Operating Timings Display *
              </label>
              <input
                type="text"
                required
                value={formData.timings}
                onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                placeholder="e.g. 12:00 PM – 1:00 AM"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Opening Time (24h format, e.g. 12:00)
              </label>
              <input
                type="text"
                value={formData.openTime}
                onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                placeholder="12:00"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Closing Time (24h format, e.g. 01:00 next day)
              </label>
              <input
                type="text"
                value={formData.closeTime}
                onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                placeholder="01:00"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-mono focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-cream/80 uppercase tracking-wider mb-1">
                Weekly Closing Day
              </label>
              <input
                type="text"
                value={formData.weeklyClosingDay}
                onChange={(e) => setFormData({ ...formData, weeklyClosingDay: e.target.value })}
                placeholder="e.g. None (Open 7 Days a Week)"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-white font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="h-12 px-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-red via-deep-red to-burgundy hover:from-red-600 hover:to-brand-red text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 active:scale-95 transition-all disabled:opacity-60"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4 text-gold" />
            )}
            <span>Save Contact Changes</span>
          </button>
        </div>
      </form>

      {/* Save Confirmation Dialog Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-950 border border-gold/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-gold">
              <div className="p-2 rounded-xl bg-gold/20">
                <Save className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-black text-white">Confirm Synchronization</h3>
            </div>

            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
              These changes will update the phone numbers, WhatsApp contact, address, and operating hours across the entire public website (including sticky headers, hero section, menu CTAs, and footer).
              <br /><br />
              Are you sure you want to apply these updates now?
            </p>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-cream/70 hover:text-white border border-white/10 text-xs font-bold"
              >
                Review Again
              </button>
              <button
                type="button"
                onClick={handleExecuteSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-red to-deep-red text-white font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                Yes, Save & Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
