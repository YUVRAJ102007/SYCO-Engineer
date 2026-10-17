import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Truck,
  Building,
  ArrowRight,
  Plus,
  MapPin,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { Address, Order, PaymentDetails } from '../types/order';
import { formatCurrency, getEstimatedDeliveryDate } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, summary, clearCart, appliedCoupon } = useCart();
  const { currentUser, addOrder } = useAuth();
  const { location } = useLocation();

  // Current wizard step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Customer Contact
  const [customerName, setCustomerName] = useState(currentUser.name);
  const [customerEmail, setCustomerEmail] = useState(currentUser.email);
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone);

  // Step 2: Shipping Address
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    currentUser.savedAddresses[0]?.id || 'new'
  );
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: currentUser.name,
    phone: currentUser.phone,
    addressLine1: '',
    addressLine2: '',
    city: location.city,
    state: location.state,
    pincode: location.pincode,
    type: 'home',
  });

  // Step 3: Delivery Speed
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('express');

  // Step 4: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 mt-2">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 px-6 py-2.5 bg-aura-600 text-white font-bold text-xs rounded-xl"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  // Active address resolution
  const activeAddress: Address =
    currentUser.savedAddresses.find((a) => a.id === selectedAddressId) || {
      ...newAddress,
      id: 'addr-custom',
    };

  const handlePlaceOrder = () => {
    setErrorMsg('');
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
      const estArrival = getEstimatedDeliveryDate(deliverySpeed === 'express' ? 1 : 3);

      const paymentDetails: PaymentDetails = {
        method: paymentMethod,
        transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        status: 'paid',
        upiId: paymentMethod === 'upi' ? upiId : undefined,
        lastFourDigits: paymentMethod === 'card' ? '4242' : undefined,
      };

      const newOrderRecord: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: activeAddress,
        items: [...cartItems],
        subtotal: summary.subtotal,
        discountTotal: summary.discountTotal,
        couponDiscount: summary.couponDiscount,
        appliedCoupon: appliedCoupon,
        tax: summary.tax,
        shippingFee: deliverySpeed === 'express' ? summary.shippingFee : 0,
        total: summary.total + (deliverySpeed === 'express' && summary.shippingFee === 0 ? 0 : 0),
        status: 'confirmed',
        estimatedDeliveryDate: estArrival,
        paymentDetails,
        trackingHistory: [
          {
            status: 'placed',
            title: 'Order Placed & Received',
            description: 'Order confirmed and verified via Aura Checkout Gateway',
            time: 'Just now',
          },
          {
            status: 'confirmed',
            title: 'Payment Confirmed',
            description: `Authorized via ${paymentMethod.toUpperCase()} (${paymentDetails.transactionId})`,
            time: 'Just now',
          },
        ],
      };

      addOrder(newOrderRecord);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Checkout Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Secure Multi-Step Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Competition Prototype Gateway • 256-bit Simulated SSL
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-full">
          <Lock size={14} />
          <span>Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multi-Step Accordion / Wizard (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Customer Contact */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-aura-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Customer Information
                </h3>
              </div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-aura-600 hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 1 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aura-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aura-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (for Order Updates & Invoices)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aura-500"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Continue to Delivery Address
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                {customerName} • {customerEmail} • {customerPhone}
              </p>
            )}
          </div>

          {/* Step 2: Delivery Address */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-aura-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Delivery Address
                </h3>
              </div>
              {currentStep > 2 && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-aura-600 hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 2 ? (
              <div className="space-y-4 pt-2">
                {/* Saved addresses selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUser.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        selectedAddressId === addr.id
                          ? 'border-aura-600 bg-aura-50/50 dark:bg-aura-950/30 ring-2 ring-aura-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {addr.name}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {addr.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {addr.addressLine1}, {addr.city} {addr.pincode}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Continue to Delivery Method
                  </button>
                </div>
              </div>
            ) : (
              currentStep > 2 && (
                <p className="text-xs text-slate-500">
                  {activeAddress.name}, {activeAddress.addressLine1}, {activeAddress.city} {activeAddress.pincode}
                </p>
              )
            )}
          </div>

          {/* Step 3: Delivery Speed */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-aura-600 text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Delivery Method & Speed
                </h3>
              </div>
              {currentStep > 3 && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-bold text-aura-600 hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 3 ? (
              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setDeliverySpeed('express')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                    deliverySpeed === 'express'
                      ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 ring-2 ring-cyan-500/20'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-cyan-500" />
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        Prime Express Next-Day Delivery
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Guaranteed arrival by {getEstimatedDeliveryDate(1)}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-600">
                    {summary.shippingFee === 0 ? 'FREE' : formatCurrency(99)}
                  </span>
                </label>

                <label
                  onClick={() => setDeliverySpeed('standard')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                    deliverySpeed === 'standard'
                      ? 'border-aura-600 bg-aura-50/50 dark:bg-aura-950/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-slate-400" />
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        Standard Ground Delivery
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Estimated arrival in 3-5 business days ({getEstimatedDeliveryDate(3)})
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">FREE</span>
                </label>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            ) : (
              currentStep > 3 && (
                <p className="text-xs text-slate-500 capitalize">
                  {deliverySpeed === 'express' ? 'Prime Express Delivery' : 'Standard Delivery'}
                </p>
              )
            )}
          </div>

          {/* Step 4: Payment Simulation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-aura-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Payment Method (Competition Simulator)
              </h3>
            </div>

            {currentStep === 4 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: <QrCode size={18} /> },
                    { id: 'card', label: 'Cards', icon: <CreditCard size={18} /> },
                    { id: 'netbanking', label: 'NetBanking', icon: <Building size={18} /> },
                    { id: 'cod', label: 'Cash on Del.', icon: <Truck size={18} /> },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition ${
                        paymentMethod === m.id
                          ? 'border-aura-600 bg-aura-50 dark:bg-aura-950 text-aura-600 dark:text-aura-400 ring-2 ring-aura-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* UPI Simulator */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Pay via UPI ID or scan dynamic QR:
                    </span>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okaxis"
                      className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    <p className="text-[11px] text-slate-400">
                      Supports Google Pay, PhonePe, Paytm, and BHIM UPI.
                    </p>
                  </div>
                )}

                {/* Card Simulator */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Test Debit / Credit Card:
                    </span>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        defaultValue="12/28"
                        placeholder="MM/YY"
                        className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center font-mono"
                      />
                      <input
                        type="password"
                        defaultValue="•••"
                        placeholder="CVV"
                        className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center font-mono"
                      />
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <AlertCircle size={14} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Place Order CTA */}
                <div className="pt-2">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Authorizing Transaction...</span>
                      </span>
                    ) : (
                      <>
                        <span>Place Your Order ({formatCurrency(summary.total)})</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Items in Your Order ({cartItems.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {item.product.title}
                    </h5>
                    <span className="text-[11px] text-slate-400">
                      Qty: {item.quantity} • {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price list */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(summary.subtotal)}
                </span>
              </div>

              {summary.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">-{formatCurrency(summary.couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Order Total</span>
                <span className="text-aura-600 dark:text-aura-400">{formatCurrency(summary.total)}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 leading-tight">
              By placing your order, you agree to Aura Marketplace's Conditions of Use and Privacy Notice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
