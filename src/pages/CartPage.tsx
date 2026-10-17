import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  BookmarkCheck,
  ShieldCheck,
  RotateCcw,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AVAILABLE_COUPONS } from '../data/coupons';
import { formatCurrency } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    savedForLater,
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
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(
    null
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) setCouponCodeInput('');
  };

  const percentToFree = Math.min(
    100,
    Math.round((summary.subtotal / summary.freeShippingThreshold) * 100)
  );

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-aura-50 dark:bg-aura-950 text-aura-600 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-2">
          Discover lightning deals, bestselling electronics, and trending fashion to fill your cart.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-6">
        Shopping Cart ({summary.itemCount} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List + Saved For Later (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Alert banner */}
          <div className="p-4 rounded-2xl bg-aura-50/70 dark:bg-aura-950/40 border border-aura-200 dark:border-aura-900/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-2 text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Truck size={16} className="text-aura-600" />
                {summary.amountNeededForFreeShipping > 0 ? (
                  <>
                    Add <strong className="text-aura-600 dark:text-aura-400">{formatCurrency(summary.amountNeededForFreeShipping)}</strong> more of eligible items to get <strong>FREE Express Delivery</strong>!
                  </>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Congratulations! Your order qualifies for FREE Express Delivery.
                  </span>
                )}
              </span>
              <span className="text-slate-500">{percentToFree}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  percentToFree >= 100
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-aura-500 to-indigo-500'
                }`}
                style={{ width: `${percentToFree}%` }}
              />
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
            {cartItems.map((item) => (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-aura-600">
                          {item.product.brand}
                        </span>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-aura-600 block line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        {item.selectedVariant && (
                          <span className="text-xs text-slate-400 mt-0.5 block">
                            Option: {item.selectedVariant}
                          </span>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-slate-400">
                            {formatCurrency(item.product.price)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 bg-slate-50 dark:bg-slate-800">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-slate-900 dark:text-white px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => saveForLater(item.id)}
                        className="text-slate-500 hover:text-aura-600 flex items-center gap-1 font-semibold"
                      >
                        <BookmarkCheck size={14} />
                        <span>Save for Later</span>
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 flex items-center gap-1 font-semibold"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Saved for Later ({savedForLater.length} items)
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {savedForLater.map((saved) => (
                  <div key={saved.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={saved.product.thumbnail}
                        alt={saved.product.title}
                        className="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-slate-800"
                      />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                          {saved.product.title}
                        </h4>
                        <span className="text-xs font-bold text-aura-600">
                          {formatCurrency(saved.product.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToCart(saved.id)}
                        className="px-3.5 py-1.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl transition"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(saved.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Order Summary
            </h3>

            {/* Calculations list */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal ({summary.itemCount} items)</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(summary.subtotal)}
                </span>
              </div>

              {summary.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Product Discounts</span>
                  <span className="font-semibold">-{formatCurrency(summary.discountTotal)}</span>
                </div>
              )}

              {summary.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold">-{formatCurrency(summary.couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {summary.shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                  ) : (
                    formatCurrency(summary.shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>GST Tax (18% included)</span>
                <span>{formatCurrency(summary.tax)}</span>
              </div>

              <div className="flex justify-between text-lg font-black text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount</span>
                <span className="text-aura-600 dark:text-aura-400">
                  {formatCurrency(summary.total)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Coupons section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Have a Coupon Code?
              </span>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-600" />
                    <span>
                      <strong>{appliedCoupon.code}</strong> applied (-{formatCurrency(summary.couponDiscount)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
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
                    placeholder="Enter WELCOME10"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-aura-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponMessage && (
                <p
                  className={`text-xs font-medium ${
                    couponMessage.success ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}

              {/* Sample Coupons Chips */}
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 block mb-1">Click to apply:</span>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_COUPONS.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => applyCoupon(c.code)}
                      className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-aura-50 dark:hover:bg-aura-950 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Safe Checkout Guarantee */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              <span>256-Bit SSL Encrypted & Verified Safe Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
