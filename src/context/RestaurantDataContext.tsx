import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS, BUCKET_EXPERIENCES, type MenuItem, type BucketExperience } from '../data/menuData';
import { RESTAURANT_INFO, type RestaurantInfo } from '../data/restaurantInfo';

interface RestaurantDataContextType {
  menuItems: MenuItem[];
  categories: BucketExperience[];
  contactInfo: RestaurantInfo;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  getWhatsAppLink: (customText?: string) => string;
  getOrderItemWhatsAppLink: (itemName: string, bucketSize: string, price: number) => string;
  isRestaurantOpenNow: () => { isOpen: boolean; statusText: string };
}

const RestaurantDataContext = createContext<RestaurantDataContextType | undefined>(undefined);

export const RestaurantDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    // Default from static file, ensuring isAvailable defaults to true
    return MENU_ITEMS.map((item) => ({
      ...item,
      isAvailable: (item as any).isAvailable !== undefined ? (item as any).isAvailable : true
    }));
  });

  const [categories, setCategories] = useState<BucketExperience[]>(BUCKET_EXPERIENCES);
  const [contactInfo, setContactInfo] = useState<RestaurantInfo>(RESTAURANT_INFO);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch live menu and contact simultaneously
      const [menuRes, contactRes] = await Promise.allSettled([
        fetch('/api/menu').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/contact').then((r) => (r.ok ? r.json() : null))
      ]);

      if (menuRes.status === 'fulfilled' && menuRes.value) {
        if (Array.isArray(menuRes.value.items) && menuRes.value.items.length > 0) {
          setMenuItems(menuRes.value.items);
        }
        if (Array.isArray(menuRes.value.categories) && menuRes.value.categories.length > 0) {
          setCategories(menuRes.value.categories);
        }
      }

      if (contactRes.status === 'fulfilled' && contactRes.value && contactRes.value.contact) {
        setContactInfo((prev) => ({
          ...prev,
          ...contactRes.value.contact
        }));
      }
    } catch (err) {
      console.warn('Using bundled restaurant data (API offline or loading):', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getWhatsAppLink = (customText?: string): string => {
    const text = customText || contactInfo.defaultWhatsappMessage;
    return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getOrderItemWhatsAppLink = (itemName: string, bucketSize: string, price: number): string => {
    const text = `Hi Red Bucket Biryani (${contactInfo.branchName}), I would like to order: ${itemName} (${bucketSize} - ₹${price}). Please confirm order details.`;
    return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const isRestaurantOpenNow = (): { isOpen: boolean; statusText: string } => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 3600000;
    const istDate = new Date(now.getTime() + utcOffset + istOffset);

    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Default open from 12:00 PM (720 min) to 1:00 AM (60 min)
    const openMinutes = 12 * 60; // 720
    const closeMinutes = 1 * 60; // 60

    const isOpen = totalMinutes >= openMinutes || totalMinutes < closeMinutes;

    return {
      isOpen,
      statusText: isOpen ? 'Open Now (12:00 PM – 1:00 AM)' : 'Closed Now (Opens at 12:00 PM)'
    };
  };

  return (
    <RestaurantDataContext.Provider
      value={{
        menuItems,
        categories,
        contactInfo,
        isLoading,
        refreshData: fetchData,
        getWhatsAppLink,
        getOrderItemWhatsAppLink,
        isRestaurantOpenNow
      }}
    >
      {children}
    </RestaurantDataContext.Provider>
  );
};

export const useRestaurantData = (): RestaurantDataContextType => {
  const context = useContext(RestaurantDataContext);
  if (!context) {
    throw new Error('useRestaurantData must be used within a RestaurantDataProvider');
  }
  return context;
};
