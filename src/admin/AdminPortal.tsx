import React from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { LoginPage } from './pages/LoginPage';
import { AdminLayout } from './AdminLayout';

interface AdminPortalProps {
  onBackToSite: () => void;
}

const AdminPortalContent: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#110406] flex items-center justify-center text-cream">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-bold text-gold uppercase tracking-widest">
            Verifying Kitchen Head Session...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onBackToSite={onBackToSite} />;
  }

  return <AdminLayout onBackToSite={onBackToSite} />;
};

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  return (
    <AdminAuthProvider>
      <AdminPortalContent onBackToSite={onBackToSite} />
    </AdminAuthProvider>
  );
};
