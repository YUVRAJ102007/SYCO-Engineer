import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Persona } from '../types/user';
import { Order, OrderStatus, Address } from '../types/order';
import { DEMO_PERSONAS } from '../data/personas';
import { PRODUCTS } from '../data/products';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  currentUser: UserProfile;
  activePersonaId: string;
  switchPersona: (personaId: string) => void;
  availablePersonas: Persona[];
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  advanceOrderStatus: (orderId: string) => OrderStatus | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'AUR-829410',
    date: '14 Oct 2026',
    customerName: 'Alex Morgan',
    customerEmail: 'alex.morgan@auramart.io',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      id: 'addr-1',
      name: 'Alex Morgan',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Highline Residency',
      addressLine2: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'home',
    },
    items: [
      {
        id: 'elec-headphone-01',
        product: PRODUCTS.find((p) => p.id === 'elec-headphone-01')!,
        quantity: 1,
        addedAt: Date.now() - 3 * 86400000,
      },
      {
        id: 'book-ddia-01',
        product: PRODUCTS.find((p) => p.id === 'book-ddia-01')!,
        quantity: 1,
        addedAt: Date.now() - 3 * 86400000,
      },
    ],
    subtotal: 10198,
    discountTotal: 6600,
    couponDiscount: 500,
    tax: 1835,
    shippingFee: 0,
    total: 9698,
    status: 'out_for_delivery',
    estimatedDeliveryDate: 'Today by 6:00 PM',
    paymentDetails: {
      method: 'upi',
      upiId: 'alex@okhdfcbank',
      transactionId: 'UPI-TXN-9021849',
      status: 'paid',
    },
    trackingHistory: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Order confirmed and verified',
        time: '14 Oct 2026, 10:14 AM',
      },
      {
        status: 'confirmed',
        title: 'Payment Confirmed',
        description: 'Payment authorized via UPI',
        time: '14 Oct 2026, 10:15 AM',
      },
      {
        status: 'processing',
        title: 'Packed & Dispatched',
        description: 'Packed at Bengaluru Fulfillment Center 2',
        time: '14 Oct 2026, 04:30 PM',
      },
      {
        status: 'shipped',
        title: 'In Transit',
        description: 'Departed sorting hub via Aura Express Courier',
        time: '15 Oct 2026, 08:20 AM',
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Courier agent Ramesh (+91 98111 22233) is on the way',
        time: 'Today, 09:15 AM',
      },
    ],
  },
  {
    id: 'AUR-718293',
    date: '28 Sep 2026',
    customerName: 'Alex Morgan',
    customerEmail: 'alex.morgan@auramart.io',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      id: 'addr-1',
      name: 'Alex Morgan',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Highline Residency',
      addressLine2: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'home',
    },
    items: [
      {
        id: 'elec-acc-01',
        product: PRODUCTS.find((p) => p.id === 'elec-acc-01')!,
        quantity: 1,
        addedAt: Date.now() - 20 * 86400000,
      },
    ],
    subtotal: 3899,
    discountTotal: 2100,
    couponDiscount: 0,
    tax: 701,
    shippingFee: 0,
    total: 3899,
    status: 'delivered',
    estimatedDeliveryDate: 'Delivered on 30 Sep 2026',
    paymentDetails: {
      method: 'card',
      lastFourDigits: '4242',
      transactionId: 'CC-TXN-4920194',
      status: 'paid',
    },
    trackingHistory: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Order confirmed and verified',
        time: '28 Sep 2026, 02:40 PM',
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Delivered to resident and signed by Alex',
        time: '30 Sep 2026, 03:15 PM',
      },
    ],
  },
];

const ORDER_STAGE_SEQUENCE: OrderStatus[] = [
  'placed',
  'confirmed',
  'processing',
  'shipped',
  'out_for_delivery',
  'delivered',
];

const STAGE_DETAILS: Record<OrderStatus, { title: string; description: string }> = {
  placed: { title: 'Order Placed', description: 'Order received and logged in system' },
  confirmed: { title: 'Order Confirmed', description: 'Seller approved order and reserved inventory' },
  processing: { title: 'Packed in Hub', description: 'Item safely packaged with bubble wrap at warehouse' },
  shipped: { title: 'Dispatched in Transit', description: 'Package in transit via Aura Logistics Express' },
  out_for_delivery: { title: 'Out for Delivery', description: 'Delivery executive is nearby your address' },
  delivered: { title: 'Delivered Successfully', description: 'Package handed over and verified' },
  cancelled: { title: 'Cancelled', description: 'Order has been cancelled' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePersonaId, setActivePersonaId] = useState<string>('persona-alex');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    return loadFromStorage<UserProfile>('aura_current_user', DEMO_PERSONAS[0].profile);
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>(() => {
    return loadFromStorage<Order[]>('aura_orders_history', INITIAL_ORDERS);
  });

  const { success, info } = useNotification();

  useEffect(() => {
    saveToStorage('aura_current_user', currentUser);
  }, [currentUser]);

  useEffect(() => {
    saveToStorage('aura_orders_history', orders);
  }, [orders]);

  const switchPersona = (personaId: string) => {
    const found = DEMO_PERSONAS.find((p) => p.id === personaId);
    if (found) {
      setActivePersonaId(personaId);
      setCurrentUser(found.profile);
      setIsAuthenticated(true);
      info('User Switched', `Logged in as ${found.name} (${found.role})`);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
    success('Logged In', `Welcome back, ${currentUser.name}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    info('Logged Out', 'You are browsing as a Guest.');
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const advanceOrderStatus = (orderId: string): OrderStatus | null => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return null;

    const currentIndex = ORDER_STAGE_SEQUENCE.indexOf(targetOrder.status);
    if (currentIndex < 0 || currentIndex >= ORDER_STAGE_SEQUENCE.length - 1) {
      return null;
    }

    const nextStatus = ORDER_STAGE_SEQUENCE[currentIndex + 1];
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const stageInfo = STAGE_DETAILS[nextStatus];

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedHistory = [
            ...ord.trackingHistory,
            {
              status: nextStatus,
              title: stageInfo.title,
              description: stageInfo.description,
              time: `Just now (${nowTime})`,
            },
          ];

          return {
            ...ord,
            status: nextStatus,
            trackingHistory: updatedHistory,
          };
        }
        return ord;
      })
    );

    success('Order Status Updated (Simulation)', `Order ${orderId} moved to ${stageInfo.title}`);
    return nextStatus;
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addr,
      id: 'addr-' + Date.now(),
    };
    setCurrentUser((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, newAddress],
    }));
    success('Address Added', 'Saved to your delivery address book.');
  };

  const deleteAddress = (addressId: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.filter((a) => a.id !== addressId),
    }));
    info('Address Removed');
  };

  const setDefaultAddress = (addressId: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    }));
    success('Default Address Updated');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activePersonaId,
        switchPersona,
        availablePersonas: DEMO_PERSONAS,
        isAuthenticated,
        login,
        logout,
        orders,
        addOrder,
        advanceOrderStatus,
        addAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
