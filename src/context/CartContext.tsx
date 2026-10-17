import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Product } from '../types/product';
import { CartItem, Coupon, CartSummary } from '../types/cart';
import { AVAILABLE_COUPONS } from '../data/coupons';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useNotification } from './NotificationContext';

interface CartContextType {
  cartItems: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  saveForLater: (itemId: string) => void;
  moveToCart: (itemId: string) => void;
  removeSavedItem: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  summary: CartSummary;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return loadFromStorage<CartItem[]>('zenvora_cart_items', []);
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    return loadFromStorage<CartItem[]>('zenvora_saved_for_later', []);
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    return loadFromStorage<Coupon | null>('zenvora_applied_coupon', null);
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { success, warning, info } = useNotification();

  useEffect(() => {
    saveToStorage('zenvora_cart_items', cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveToStorage('zenvora_saved_for_later', savedForLater);
  }, [savedForLater]);

  useEffect(() => {
    saveToStorage('zenvora_applied_coupon', appliedCoupon);
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    const itemId = selectedVariant ? `${product.id}-${selectedVariant}` : product.id;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(product.stockCount, updated[existingIndex].quantity + quantity);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          quantity: Math.min(product.stockCount, quantity),
          selectedVariant,
          addedAt: Date.now(),
        };
        return [newItem, ...prev];
      }
    });

    success('Added to Cart', `${product.title.slice(0, 32)}... (Qty: ${quantity})`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      info('Item Removed', `${item.product.title.slice(0, 30)}... removed from cart.`);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const maxStock = item.product.stockCount;
          const validQty = Math.min(maxStock, quantity);
          if (quantity > maxStock) {
            warning('Max Stock Reached', `Only ${maxStock} items available in stock.`);
          }
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const saveForLater = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    setSavedForLater((prev) => [item, ...prev.filter((i) => i.id !== itemId)]);
    info('Saved for Later', `${item.product.title.slice(0, 30)}... moved to saved items.`);
  };

  const moveToCart = (itemId: string) => {
    const item = savedForLater.find((i) => i.id === itemId);
    if (!item) return;

    setSavedForLater((prev) => prev.filter((i) => i.id !== itemId));
    addToCart(item.product, item.quantity, item.selectedVariant);
  };

  const removeSavedItem = (itemId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const foundCoupon = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === trimmed);

    if (!foundCoupon) {
      warning('Invalid Coupon', `Coupon code "${code}" is not valid or has expired.`);
      return { success: false, message: 'Invalid coupon code.' };
    }

    // Check minimum order value
    const currentSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (currentSubtotal < foundCoupon.minimumOrderValue) {
      warning(
        'Minimum Order Not Met',
        `Add items worth ₹${(foundCoupon.minimumOrderValue - currentSubtotal).toLocaleString('en-IN')} more to use "${foundCoupon.code}".`
      );
      return {
        success: false,
        message: `Min order value for ${foundCoupon.code} is ₹${foundCoupon.minimumOrderValue.toLocaleString('en-IN')}`,
      };
    }

    setAppliedCoupon(foundCoupon);
    success('Coupon Applied!', `${foundCoupon.code}: ${foundCoupon.description}`);
    return { success: true, message: `Coupon ${foundCoupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    if (appliedCoupon) {
      setAppliedCoupon(null);
      info('Coupon Removed', 'Coupon discount has been removed.');
    }
  };

  // Calculations
  const summary: CartSummary = useMemo(() => {
    const freeShippingThreshold = 999;

    let subtotal = 0;
    let originalSubtotal = 0;
    let itemCount = 0;

    cartItems.forEach((item) => {
      subtotal += item.product.price * item.quantity;
      originalSubtotal += item.product.originalPrice * item.quantity;
      itemCount += item.quantity;
    });

    const discountTotal = Math.max(0, originalSubtotal - subtotal);

    let couponDiscount = 0;
    if (appliedCoupon) {
      if (subtotal >= appliedCoupon.minimumOrderValue) {
        if (appliedCoupon.discountType === 'percentage') {
          couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
        } else {
          couponDiscount = appliedCoupon.discountValue;
        }
      }
    }

    // Free delivery above threshold or if cart is empty
    const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 99;
    const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

    // GST is included in MRP in India, but display 18% reference portion
    const tax = Math.round(subtotal * 0.18);

    const total = Math.max(0, subtotal - couponDiscount + shippingFee);

    return {
      subtotal,
      discountTotal,
      couponDiscount,
      appliedCoupon,
      tax,
      shippingFee,
      total,
      freeShippingThreshold,
      amountNeededForFreeShipping,
      itemCount,
    };
  }, [cartItems, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        removeSavedItem,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        summary,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
