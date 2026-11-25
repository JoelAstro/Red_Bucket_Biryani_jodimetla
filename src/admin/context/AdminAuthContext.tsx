import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi, type AdminUser } from '../services/adminApi';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (curr: string, next: string, confirm?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const data = await adminApi.getMe();
      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener('rbb-admin-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('rbb-admin-unauthorized', handleUnauthorized);
  }, []);

  const login = async (email: string, pass: string) => {
    const data = await adminApi.login(email, pass);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await adminApi.logout();
    } finally {
      setUser(null);
    }
  };

  const changePassword = async (curr: string, next: string, confirm?: string) => {
    await adminApi.changePassword(curr, next, confirm);
    if (user) {
      setUser({ ...user, mustChangePassword: false });
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        changePassword,
        refreshUser
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
