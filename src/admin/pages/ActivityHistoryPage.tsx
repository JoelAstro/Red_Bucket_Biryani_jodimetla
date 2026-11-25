import React, { useState, useEffect } from 'react';
import {
  History,
  User,
  Tag,
  Filter,
  RefreshCw,
  Sparkles,
  UtensilsCrossed,
  PhoneCall,
  Image as ImageIcon,
  Key,
  CheckCircle2
} from 'lucide-react';
import { adminApi, type ActivityItem } from '../services/adminApi';

export const ActivityHistoryPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.getActivities(200);
      setActivities(res.activities || []);
    } catch (err) {
      console.error('Failed to load activity history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const getActionIcon = (section: string) => {
    switch (section) {
      case 'Menu':
        return <UtensilsCrossed className="w-4 h-4 text-brand-red" />;
      case 'Availability':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'Contact':
        return <PhoneCall className="w-4 h-4 text-gold" />;
      case 'Images':
        return <ImageIcon className="w-4 h-4 text-amber-400" />;
      case 'Account':
        return <Key className="w-4 h-4 text-purple-400" />;
      default:
        return <History className="w-4 h-4 text-cream/70" />;
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (sectionFilter === 'all') return true;
    return act.section.toLowerCase() === sectionFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 select-none max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-gold text-xs font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            Activity History & Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-cream/70 mt-0.5">
            Transparent chronological record of all administrative updates performed by the Kitchen Head.
          </p>
        </div>

        <button
          onClick={loadActivities}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-gold/40 text-cream/90 hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-60 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gold ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Log</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-lg flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-cream/60 mr-2 font-bold">
          <Filter className="w-3.5 h-3.5 text-gold" />
          <span>Filter by Section:</span>
        </div>

        {['all', 'Menu', 'Availability', 'Contact', 'Images', 'Account'].map((sec) => (
          <button
            key={sec}
            onClick={() => setSectionFilter(sec)}
            className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
              sectionFilter.toLowerCase() === sec.toLowerCase()
                ? 'bg-gold text-neutral-950'
                : 'bg-neutral-900 text-cream/70 hover:text-white'
            }`}
          >
            {sec === 'all' ? 'All Activities' : sec}
          </button>
        ))}
      </div>

      {/* Activity Timeline List */}
      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-xl space-y-4">
        {isLoading ? (
          <div className="py-16 text-center text-cream/50 space-y-2">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs">Loading activity history...</div>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="py-16 text-center text-cream/40 text-xs">
            No activity records match the selected filter.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-white/10 shrink-0 mt-0.5 sm:mt-0">
                    {getActionIcon(act.section)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">
                      {act.description}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-cream/50 mt-1">
                      <span className="flex items-center gap-1 text-gold/90 font-medium">
                        <Tag className="w-3 h-3 text-gold" />
                        <span>{act.section}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{act.user}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right text-[11px] text-cream/40 pl-11 sm:pl-0 shrink-0 flex items-center sm:flex-col sm:items-end gap-2 sm:gap-0">
                  <span className="font-mono text-cream/60">
                    {new Date(act.timestamp).toLocaleDateString()}
                  </span>
                  <span>{new Date(act.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
