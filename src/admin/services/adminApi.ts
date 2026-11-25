const TOKEN_KEY = 'rbb_admin_token';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  mustChangePassword?: boolean;
}

export interface DashboardStats {
  totalMenuItems: number;
  availableItems: number;
  unavailableItems: number;
  totalCategories: number;
  recentActivities: ActivityItem[];
  categoryCounts: Record<string, number>;
}

export interface ActivityItem {
  id: string;
  action: string;
  description: string;
  section: string;
  user: string;
  timestamp: string;
}

export interface AdminImageItem {
  id: string;
  name: string;
  url: string;
  category: string;
  size: number;
  createdAt: string;
}

class AdminApiService {
  private getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  public setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // ignore
    }
  }

  public clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>)
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(endpoint, {
      ...options,
      headers
    });

    if (res.status === 401) {
      this.clearToken();
      // Dispatch auth change event so UI can react immediately
      window.dispatchEvent(new Event('rbb-admin-unauthorized'));
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || `Request failed with status ${res.status}`);
    }

    return data as T;
  }

  /* Auth Methods */
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const data = await this.request<{ success: boolean; token: string; user: AdminUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setToken(data.token);
    return data;
  }

  async getMe(): Promise<{ user: AdminUser }> {
    return this.request<{ user: AdminUser }>('/api/auth/me');
  }

  async changePassword(currentPassword: string, newPassword: string, confirmPassword?: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
    });
  }

  async logout(): Promise<void> {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  }

  /* Dashboard Stats */
  async getDashboardStats(): Promise<{ stats: DashboardStats }> {
    return this.request<{ stats: DashboardStats }>('/api/dashboard/stats');
  }

  /* Menu Management */
  async getMenuItems(): Promise<{ items: any[]; categories: any[] }> {
    return this.request<{ items: any[]; categories: any[] }>('/api/menu');
  }

  async addMenuItem(itemData: any): Promise<{ success: boolean; item: any }> {
    return this.request<{ success: boolean; item: any }>('/api/menu', {
      method: 'POST',
      body: JSON.stringify(itemData)
    });
  }

  async updateMenuItem(id: string, updates: any): Promise<{ success: boolean; item: any }> {
    return this.request<{ success: boolean; item: any }>(`/api/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async toggleAvailability(id: string, isAvailable: boolean): Promise<{ success: boolean; item: any; message: string }> {
    return this.request<{ success: boolean; item: any; message: string }>(`/api/menu/${id}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ isAvailable })
    });
  }

  async deleteMenuItem(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/api/menu/${id}`, {
      method: 'DELETE'
    });
  }

  /* Contact Management */
  async getContactInfo(): Promise<{ contact: any }> {
    return this.request<{ contact: any }>('/api/contact');
  }

  async updateContactInfo(info: any): Promise<{ success: boolean; contact: any; message: string }> {
    return this.request<{ success: boolean; contact: any; message: string }>('/api/contact', {
      method: 'PUT',
      body: JSON.stringify(info)
    });
  }

  /* Food Images Management */
  async uploadImage(file: File): Promise<{ success: boolean; file: { url: string; filename: string } }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.request<{ success: boolean; file: { url: string; filename: string } }>('/api/images/upload', {
      method: 'POST',
      body: formData
    });
  }

  async getImages(): Promise<{ images: AdminImageItem[] }> {
    return this.request<{ images: AdminImageItem[] }>('/api/images');
  }

  /* Activity History */
  async getActivities(limit = 100): Promise<{ activities: ActivityItem[] }> {
    return this.request<{ activities: ActivityItem[] }>(`/api/activity?limit=${limit}`);
  }
}

export const adminApi = new AdminApiService();
