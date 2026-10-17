import { Address } from './order';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  primeMember: boolean;
  savedAddresses: Address[];
  preferences: {
    darkMode: boolean;
    orderNotifications: boolean;
    dealAlerts: boolean;
  };
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  profile: UserProfile;
}
