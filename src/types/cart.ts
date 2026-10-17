import { Product } from './product';

export interface CartItem {
  id: string; // unique item entry id (could be product.id + variant.id)
  product: Product;
  quantity: number;
  selectedVariant?: string;
  addedAt: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g., 10 for 10%, or 500 for ₹500
  minimumOrderValue: number;
  description: string;
}

export interface CartSummary {
  subtotal: number;
  discountTotal: number;
  couponDiscount: number;
  appliedCoupon: Coupon | null;
  tax: number; // GST 18%
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  itemCount: number;
}
