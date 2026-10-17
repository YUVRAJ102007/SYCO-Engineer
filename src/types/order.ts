import { CartItem, Coupon } from './cart';

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'home' | 'work' | 'other';
}

export interface PaymentDetails {
  method: 'upi' | 'card' | 'netbanking' | 'cod';
  providerName?: string;
  lastFourDigits?: string;
  upiId?: string;
  transactionId: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface Order {
  id: string; // e.g. "AUR-928410"
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  couponDiscount: number;
  appliedCoupon?: Coupon | null;
  tax: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  estimatedDeliveryDate: string;
  paymentDetails: PaymentDetails;
  trackingHistory: {
    status: OrderStatus;
    title: string;
    description: string;
    time: string;
  }[];
}
