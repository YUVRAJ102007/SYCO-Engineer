import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export interface LocationInfo {
  pincode: string;
  city: string;
  state: string;
  isServiceable: boolean;
  estimatedDeliveryHours: number;
}

const DEFAULT_LOCATION: LocationInfo = {
  pincode: '560038',
  city: 'Bengaluru',
  state: 'Karnataka',
  isServiceable: true,
  estimatedDeliveryHours: 24, // 1 day
};

interface LocationContextType {
  location: LocationInfo;
  updatePincode: (code: string) => { success: boolean; message: string; city?: string };
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const PINCODE_MAP: Record<string, { city: string; state: string; hours: number }> = {
  '560038': { city: 'Bengaluru', state: 'Karnataka', hours: 24 },
  '560001': { city: 'Bengaluru Central', state: 'Karnataka', hours: 18 },
  '400001': { city: 'Mumbai', state: 'Maharashtra', hours: 24 },
  '400050': { city: 'Bandra, Mumbai', state: 'Maharashtra', hours: 24 },
  '110001': { city: 'New Delhi', state: 'Delhi', hours: 24 },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', hours: 36 },
  '700001': { city: 'Kolkata', state: 'West Bengal', hours: 36 },
  '500001': { city: 'Hyderabad', state: 'Telangana', hours: 24 },
  '411001': { city: 'Pune', state: 'Maharashtra', hours: 24 },
};

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationInfo>(() => {
    return (
      loadFromStorage<LocationInfo>('zenvora_delivery_location', null as any) ||
      loadFromStorage<LocationInfo>('aura_delivery_location', DEFAULT_LOCATION)
    );
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    saveToStorage('zenvora_delivery_location', location);
  }, [location]);

  const updatePincode = (code: string) => {
    const trimmed = code.trim();
    if (!/^\d{6}$/.test(trimmed)) {
      return { success: false, message: 'Please enter a valid 6-digit Indian PIN code.' };
    }

    if (PINCODE_MAP[trimmed]) {
      const match = PINCODE_MAP[trimmed];
      const newLoc: LocationInfo = {
        pincode: trimmed,
        city: match.city,
        state: match.state,
        isServiceable: true,
        estimatedDeliveryHours: match.hours,
      };
      setLocation(newLoc);
      return { success: true, message: `Delivering to ${match.city}, ${match.state}`, city: match.city };
    } else {
      // General valid 6-digit fallback
      const newLoc: LocationInfo = {
        pincode: trimmed,
        city: 'Metropolitan Area',
        state: 'India',
        isServiceable: true,
        estimatedDeliveryHours: 48,
      };
      setLocation(newLoc);
      return { success: true, message: `Delivering to PIN ${trimmed} (Standard 2-Day Delivery)`, city: 'Standard Delivery' };
    }
  };

  return (
    <LocationContext.Provider value={{ location, updatePincode, isModalOpen, setIsModalOpen }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
