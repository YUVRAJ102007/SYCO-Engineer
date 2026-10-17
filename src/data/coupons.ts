import { Coupon } from '../types/cart';

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrderValue: 999,
    description: '10% instant discount on orders above ₹999 (New Customer Welcome)'
  },
  {
    code: 'AURA500',
    discountType: 'fixed',
    discountValue: 500,
    minimumOrderValue: 2499,
    description: 'Flat ₹500 instant discount on orders above ₹2,499'
  },
  {
    code: 'FESTIVE20',
    discountType: 'percentage',
    discountValue: 20,
    minimumOrderValue: 4999,
    description: 'Mega 20% discount on luxury electronics and fashion orders above ₹4,999'
  },
  {
    code: 'STUDENT5',
    discountType: 'percentage',
    discountValue: 5,
    minimumOrderValue: 499,
    description: 'Extra 5% discount for students and developers'
  }
];
