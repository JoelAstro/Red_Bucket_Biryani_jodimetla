import React, { useEffect, useState } from 'react';
import {
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  PhoneCall,
  Image as ImageIcon,
  AlertTriangle,
  History,
  TrendingUp,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { adminApi, type DashboardStats } from '../services/adminApi';
import { useAdminAuth } from '../context/AdminAuthContext';

interface DashboardPageProps {
  onNavigateTab: (tabId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab }) => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await adminApi.getDashboardStats();
      setStats(res.stats);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard statistics.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* Must-change password alert banner */}
      {user?.mustChangePassword && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/60 border-2 border-gold/60 text-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold/20 text-gold shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5 text-gold animate-bounce" />
            </div>
            <div>
              <div className="font-black text-sm sm:text-base text-gold tracking-wide">
                Security Notice: Initial Password Active
              </div>
              <p className="text-xs sm:text-sm text-cream/80 mt-0.5">
                You are currently using the default system credentials. Please set your own private Kitchen Head password.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('account')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gold hover:bg-amber-300 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md shrink-0 transition-all active:scale-95"
          >
            Change Password Now
          </button>
        </div>
      )}

      {/* Top Header & Refresh Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Kitchen Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            Kitchen Head Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 mt-0.5">
            Real-time status of Jodimetla branch menu, active dishes, and kitchen operations.
          </p>
        </div>

        <button
          onClick={loadStats}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-gold/40 text-cream/90 hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-60 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gold ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-brand-red/40 text-red-200 text-xs">
          {error}
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* Total Menu Items */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-lg relative overflow-hidden group hover:border-gold/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-bold text-cream/60 uppercase tracking-wider">
              Total Menu Items
            </span>
            <div className="p-2 rounded-xl bg-neutral-900 border border-white/5 text-gold group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-black text-white font-['Montserrat',sans-serif]">
            {isLoading ? '...' : stats?.totalMenuItems ?? 0}
          </div>
          <div className="text-[11px] text-cream/50 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Across 6 bucket experiences</span>
          </div>
        </div>

        {/* Available Food Items */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-emerald-500/20 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Available Dishes
            </span>
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-black text-emerald-300 font-['Montserrat',sans-serif]">
            {isLoading ? '...' : stats?.availableItems ?? 0}
          </div>
          <div className="text-[11px] text-cream/50 mt-1">
            Ready for customer ordering
          </div>
        </div>

        {/* Unavailable Food Items */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-amber-500/20 shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
              Sold Out / Inactive
            </span>
            <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-black text-amber-300 font-['Montserrat',sans-serif]">
            {isLoading ? '...' : stats?.unavailableItems ?? 0}
          </div>
          <div className="text-[11px] text-cream/50 mt-1">
            {stats && stats.unavailableItems > 0 ? 'Marked unavailable' : 'All dishes in stock'}
          </div>
        </div>

        {/* Total Food Categories */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-lg relative overflow-hidden group hover:border-gold/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-bold text-cream/60 uppercase tracking-wider">
              Categories
            </span>
            <div className="p-2 rounded-xl bg-neutral-900 border border-white/5 text-gold group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-black text-white font-['Montserrat',sans-serif]">
            {isLoading ? '...' : stats?.totalCategories ?? 0}
          </div>
          <div className="text-[11px] text-cream/50 mt-1">
            Solo to Mighty Sixty
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Access: Menu Management */}
        <button
          onClick={() => onNavigateTab('menu')}
          className="p-5 rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-brand-red/30 hover:border-brand-red text-left shadow-lg hover:shadow-brand-red/20 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-brand-red/20 text-brand-red group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 text-brand-red" />
            </div>
            <ArrowRight className="w-5 h-5 text-cream/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <div className="font-black text-base text-white group-hover:text-gold transition-colors">
              Menu & Availability
            </div>
            <p className="text-xs text-cream/70 mt-1">
              Add new dishes, update prices, and toggle real-time stock availability.
            </p>
          </div>
        </button>

        {/* Quick Access: Contact Management */}
        <button
          onClick={() => onNavigateTab('contact')}
          className="p-5 rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-gold/30 hover:border-gold text-left shadow-lg hover:shadow-gold/20 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-gold/20 text-gold group-hover:scale-105 transition-transform">
              <PhoneCall className="w-6 h-6 text-gold" />
            </div>
            <ArrowRight className="w-5 h-5 text-cream/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <div className="font-black text-base text-white group-hover:text-gold transition-colors">
              Contact & Timings
            </div>
            <p className="text-xs text-cream/70 mt-1">
              Update phone numbers, WhatsApp contact, Google Map links, and daily hours.
            </p>
          </div>
        </button>

        {/* Quick Access: Food Images */}
        <button
          onClick={() => onNavigateTab('images')}
          className="p-5 rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-white/10 hover:border-gold/50 text-left shadow-lg hover:shadow-gold/10 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-neutral-800 text-cream group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6 text-gold" />
            </div>
            <ArrowRight className="w-5 h-5 text-cream/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <div className="font-black text-base text-white group-hover:text-gold transition-colors">
              Food Image Assets
            </div>
            <p className="text-xs text-cream/70 mt-1">
              Upload fresh dish photos, preview items, and manage food image assignments.
            </p>
          </div>
        </button>
      </div>

      {/* Category Breakdown & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mb-4 text-gold font-bold text-sm">
            <Layers className="w-4 h-4 text-gold" />
            <span>Dishes by Food Category</span>
          </div>

          <div className="space-y-2.5">
            {stats && stats.categoryCounts ? (
              Object.entries(stats.categoryCounts).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/70 border border-white/5">
                  <span className="text-xs font-semibold text-cream/90">{cat}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-red/20 text-gold text-xs font-black">
                    {count} dishes
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-cream/40 py-4 text-center">Loading breakdown...</div>
            )}
          </div>
        </div>

        {/* Recent Administrative Activity */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gold font-bold text-sm">
                <History className="w-4 h-4 text-gold" />
                <span>Recent Administrative Activity</span>
              </div>

              <button
                onClick={() => onNavigateTab('activity')}
                className="text-xs text-gold hover:underline font-bold"
              >
                View Full Log →
              </button>
            </div>

            <div className="space-y-2.5">
              {stats?.recentActivities && stats.recentActivities.length > 0 ? (
                stats.recentActivities.map((act) => (
                  <div key={act.id} className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3 text-xs">
                    <div className="p-1.5 rounded-lg bg-brand-red/15 text-brand-red shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{act.description}</div>
                      <div className="text-[11px] text-cream/50 mt-0.5 flex items-center gap-2">
                        <span>{new Date(act.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <span className="text-gold/80">{act.user}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-cream/50 py-6 text-center">
                  No recent activities recorded yet.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 text-right">
            <span className="text-[11px] text-cream/40">
              Jodimetla Branch Database Synchronized
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
