import React, { useState } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Image as ImageIcon,
  PhoneCall,
  History,
  UserCog,
  LogOut,
  Menu as MenuIcon,
  X,
  ExternalLink,
  ChevronRight,
  ChefHat
} from 'lucide-react';
import { useAdminAuth } from './context/AdminAuthContext';
import { Logo } from '../components/Logo';
import { DashboardPage } from './pages/DashboardPage';
import { MenuManagementPage } from './pages/MenuManagementPage';
import { FoodImagesPage } from './pages/FoodImagesPage';
import { ContactManagementPage } from './pages/ContactManagementPage';
import { ActivityHistoryPage } from './pages/ActivityHistoryPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';

interface AdminLayoutProps {
  onBackToSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToSite }) => {
  const { user, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
    { id: 'images', label: 'Food Images', icon: ImageIcon },
    { id: 'contact', label: 'Contact & Timings', icon: PhoneCall },
    { id: 'activity', label: 'Activity History', icon: History },
    { id: 'account', label: 'Account Settings', icon: UserCog }
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigateTab={handleSelectTab} />;
      case 'menu':
        return <MenuManagementPage />;
      case 'images':
        return <FoodImagesPage />;
      case 'contact':
        return <ContactManagementPage />;
      case 'activity':
        return <ActivityHistoryPage />;
      case 'account':
        return <AccountSettingsPage />;
      default:
        return <DashboardPage onNavigateTab={handleSelectTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#110406] text-cream flex select-none">
      {/* ========================================================= */}
      {/* DESKTOP SIDEBAR (Static Left Column)                      */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-neutral-950/95 border-r border-white/10 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 space-y-6">
          {/* Logo Brand Header */}
          <div className="border-b border-white/10 pb-4">
            <Logo showBranch={false} />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-red/20 text-gold text-[10px] font-black uppercase tracking-wider mt-2 border border-brand-red/30">
              <ChefHat className="w-3 h-3 text-gold" />
              <span>Kitchen Head Console</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Kitchen Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left group ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-red via-deep-red to-burgundy text-white shadow-md shadow-brand-red/30'
                      : 'text-cream/75 hover:text-white hover:bg-neutral-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-cream/60 group-hover:text-gold'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-neutral-950 space-y-2">
          {/* User pill */}
          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5 flex items-center gap-2.5 text-xs">
            <div className="w-8 h-8 rounded-lg bg-brand-red/20 text-gold flex items-center justify-center font-black shrink-0">
              KH
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white truncate text-[11px]">{user?.email}</div>
              <div className="text-[10px] text-cream/50">Jodimetla Kitchen</div>
            </div>
          </div>

          {/* View Website Button */}
          <button
            onClick={onBackToSite}
            className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-cream/80 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
            <span>View Public Website</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-red-950/70 text-cream/70 hover:text-red-300 border border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE SIDEBAR DRAWER (Touch-friendly slide-over)          */}
      {/* ========================================================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="relative z-10 w-[85vw] max-w-xs h-full h-[100dvh] max-h-[100dvh] bg-neutral-950 border-r border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="p-5 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <Logo showBranch={false} />
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 rounded-xl bg-neutral-900 border border-white/15 text-cream hover:text-white"
                >
                  <X className="w-5 h-5 text-gold" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-red to-deep-red text-white shadow-md'
                          : 'text-cream/80 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-cream/60'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-white/10 space-y-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={onBackToSite}
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 text-cream/80 hover:text-white border border-white/10 text-xs font-bold flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
                <span>View Public Website</span>
              </button>

              <button
                onClick={logout}
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 text-cream/70 hover:text-red-300 border border-white/10 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA                                         */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 h-16 bg-neutral-950/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-white/10 text-cream hover:text-white"
              aria-label="Open sidebar"
            >
              <MenuIcon className="w-5 h-5 text-gold" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-cream/60">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-gold font-bold capitalize">
                {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Public site quick link */}
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs font-bold text-cream/80 hover:text-white transition-all shadow-sm active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            {/* User Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-gold font-black text-xs">
                KH
              </div>
              <div className="hidden md:block text-left leading-tight">
                <div className="text-xs font-bold text-white">Kitchen Head</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
};
