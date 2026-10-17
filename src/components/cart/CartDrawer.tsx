import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Sparkles,
  BookmarkCheck,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    saveForLater,
    summary,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponFeedback({ success: res.success, text: res.message });
    if (res.success) setCouponCodeInput('');
  };

  const percentToFree = Math.min(
    100,
    Math.round((summary.subtotal / summary.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-aura-500/10 text-aura-600 rounded-lg">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Shopping Cart</h3>
              <p className="text-xs text-slate-500">
                {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Milestone Progress */}
        <div className="px-5 py-3 bg-aura-50/60 dark:bg-aura-950/30 border-b border-aura-100 dark:border-aura-900/50">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-aura-900 dark:text-aura-300">
              <Truck size={14} className="text-aura-600" />
              {summary.amountNeededForFreeShipping > 0 ? (
                <>Add <strong className="text-aura-600 dark:text-aura-400">{formatCurrency(summary.amountNeededForFreeShipping)}</strong> for FREE Shipping!</>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> You unlocked FREE Shipping!
                </span>
              )}
            </span>
            <span className="text-slate-500">{percentToFree}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                percentToFree >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-aura-500 to-indigo-500'
              }`}
              style={{ width: `${percentToFree}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag size={56} className="text-slate-300 dark:text-slate-700 mb-3" />
              <h4 className="font-bold text-slate-700 dark:text-slate-200 text-base">Your cart is empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore best-selling electronics, fashion, and deals of the day to add products.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/products');
                }}
                className="mt-5 px-5 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 shadow-2xs group"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-xl bg-slate-100 dark:bg-slate-700 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartDrawerOpen(false)}
                        className="font-bold text-xs text-slate-900 dark:text-white hover:text-aura-600 line-clamp-2 leading-tight"
                      >
                        {item.product.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.product.brand} {item.selectedVariant && `• ${item.selectedVariant}`}
                    </p>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 bg-slate-50 dark:bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-slate-900 dark:text-white w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 dark:text-white block">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-400">
                          {formatCurrency(item.product.price)} each
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Save for later link */}
                  <button
                    onClick={() => saveForLater(item.id)}
                    className="text-[11px] text-aura-600 dark:text-aura-400 hover:underline flex items-center gap-1 mt-1 font-medium"
                  >
                    <BookmarkCheck size={12} /> Save for later
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Coupon & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
            {/* Coupon Box */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-emerald-600 shrink-0" />
                  <span>
                    Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatCurrency(summary.couponDiscount)})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  placeholder="Coupon code (e.g. WELCOME10)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-aura-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition"
                >
                  Apply
                </button>
              </form>
            )}
            {couponFeedback && (
              <p
                className={`text-[11px] font-medium ${
                  couponFeedback.success ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {couponFeedback.text}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
              <div className="flex justify-between">
                <span>Subtotal ({summary.itemCount} items)</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(summary.subtotal)}
                </span>
              </div>
              {summary.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">-{formatCurrency(summary.couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {summary.shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    formatCurrency(summary.shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Estimated GST Included (18%)</span>
                <span>{formatCurrency(summary.tax)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Payable</span>
                <span className="text-aura-600 dark:text-aura-400">{formatCurrency(summary.total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3 bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="w-full py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition"
              >
                View Full Cart & Saved Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
