import { Persona } from '../types/user';

export const DEMO_PERSONAS: Persona[] = [
  {
    id: 'persona-alex',
    name: 'Alex Morgan',
    role: 'Senior Software Engineer',
    description: 'Looking for high-performance development hardware, noise-canceling gear, and tech books.',
    profile: {
      id: 'usr-001',
      name: 'Alex Morgan',
      email: 'alex.morgan@zenvora.io',
      phone: '+91 98765 43210',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      primeMember: true,
      savedAddresses: [
        {
          id: 'addr-1',
          name: 'Alex Morgan',
          phone: '+91 98765 43210',
          addressLine1: 'Flat 402, Highline Residency',
          addressLine2: 'Indiranagar 100ft Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          isDefault: true,
          type: 'home'
        },
        {
          id: 'addr-2',
          name: 'Alex Morgan (Office)',
          phone: '+91 98765 43210',
          addressLine1: 'Zenvora Tech Tower, 6th Floor',
          addressLine2: 'Outer Ring Road, Bellandur',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560103',
          isDefault: false,
          type: 'work'
        }
      ],
      preferences: {
        darkMode: false,
        orderNotifications: true,
        dealAlerts: true
      }
    }
  },
  {
    id: 'persona-priya',
    name: 'Priya Sharma',
    role: 'Architect & Designer',
    description: 'Browsing minimalist interior lighting, espresso machines, and artisanal organic gourmet.',
    profile: {
      id: 'usr-002',
      name: 'Priya Sharma',
      email: 'priya.design@zenvora.io',
      phone: '+91 91234 56789',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      primeMember: true,
      savedAddresses: [
        {
          id: 'addr-3',
          name: 'Priya Sharma',
          phone: '+91 91234 56789',
          addressLine1: 'B-14, Greenview Terrace',
          addressLine2: 'Bandra West, Hill Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050',
          isDefault: true,
          type: 'home'
        }
      ],
      preferences: {
        darkMode: false,
        orderNotifications: true,
        dealAlerts: false
      }
    }
  }
];
