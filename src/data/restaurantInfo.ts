export interface RestaurantInfo {
  brandName: string;
  fullName: string;
  branchName: string;
  locationName: string;
  address: string;
  phone: string;
  displayPhone: string;
  telLink: string;
  whatsappNumber: string;
  defaultWhatsappMessage: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    days: string;
    timings: string;
    openTime: string; // "12:00"
    closeTime: string; // "01:00" (next day)
  };
  tagline: string;
  subtagline: string;
}

export const RESTAURANT_INFO: RestaurantInfo = {
  brandName: "Red Bucket Biryani",
  fullName: "Red Bucket Biryani | Jodimetla",
  branchName: "Jodimetla Branch",
  locationName: "Jodimetla, Hyderabad",
  address: "Red Bucket Biryani, Jodimetla, Hyderabad, Telangana",
  phone: "8008906029",
  displayPhone: "+91 80089 06029",
  telLink: "tel:+918008906029",
  whatsappNumber: "918008906029",
  defaultWhatsappMessage: "Hi Red Bucket Biryani, I would like to know more about your menu and bucket options.",
  googleMapsUrl:
    "https://www.google.com/maps/place/Red+Bucket+Biryani+%7C+Jodimetla/@17.4248694,78.6418128,17z/data=!4m16!1m9!3m8!1s0x3bcb9fb4c2e66d6f:0xe1a48f1efe142c01!2sRed+Bucket+Biryani+%7C+Jodimetla!8m2!3d17.4248694!4d78.6443877!9m1!1b1!16s%2Fg%2F11s57c2b3f!3m5!1s0x3bcb9fb4c2e66d6f:0xe1a48f1efe142c01!8m2!3d17.4248694!4d78.6443877!16s%2Fg%2F11s57c2b3f",
  coordinates: {
    lat: 17.4248694,
    lng: 78.6443877,
  },
  openingHours: {
    days: "Every day",
    timings: "12:00 PM – 1:00 AM",
    openTime: "12:00",
    closeTime: "01:00",
  },
  tagline: "BUCKETS FULL OF BIRYANI. HEARTS FULL OF HAPPINESS.",
  subtagline:
    "Your favourite biryani, served in signature buckets. Perfect for every craving and every celebration.",
};

export const getWhatsAppLink = (customText?: string): string => {
  const text = customText || RESTAURANT_INFO.defaultWhatsappMessage;
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

export const getOrderItemWhatsAppLink = (itemName: string, bucketSize: string, price: number): string => {
  const text = `Hi Red Bucket Biryani (Jodimetla Branch), I would like to order: ${itemName} (${bucketSize} - ₹${price}). Please confirm order details.`;
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

/**
 * Returns whether the restaurant is currently open based on Indian Standard Time (UTC+5:30)
 * Open 12:00 PM (noon) to 1:00 AM (next morning)
 */
export const isRestaurantOpenNow = (): { isOpen: boolean; statusText: string } => {
  // Current time in IST
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() * 60000;
  const istTime = new Date(now.getTime() + utcOffset + 3600000 * 5.5);
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const currentDecimalHour = hours + minutes / 60;

  // Open from 12:00 (12.0) through 24.0 (midnight) and 00:00 to 01:00 (1.0)
  const isOpen = currentDecimalHour >= 12.0 || currentDecimalHour < 1.0;

  if (isOpen) {
    return {
      isOpen: true,
      statusText: "Open Now • Closes at 1:00 AM",
    };
  } else {
    return {
      isOpen: false,
      statusText: "Opens Today at 12:00 PM",
    };
  }
};
