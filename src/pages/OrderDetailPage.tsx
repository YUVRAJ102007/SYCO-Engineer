import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Download, ShieldCheck, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OrderTimelineTracker } from '../components/orders/OrderTimelineTracker';
import { formatCurrency } from '../utils/formatters';
import { useNotification } from '../context/NotificationContext';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useAuth();
  const { success } = useNotification();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">
          We couldn't locate order reference #{id}.
        </p>
        <Link
          to="/orders"
          className="mt-5 inline-block px-5 py-2.5 bg-aura-600 text-white font-bold text-xs rounded-xl"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    success('Invoice Generated', `Simulated PDF tax invoice for order #${order.id} downloaded.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ChevronLeft size={16} />
          <span>Back to All Orders</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Download Tax Invoice (PDF)</span>
          </button>
        </div>
      </div>

      {/* 6-Stage Visual Timeline Tracker (with interactive simulator!) */}
      <OrderTimelineTracker order={order} />

      {/* 2-Column Details: Shipping Address & Order Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Ordered Items Breakdown (8 cols) */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Package Contents ({order.items.length} items)
          </h3>

          <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-aura-600">
                      {item.product.brand}
                    </span>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-aura-600 block line-clamp-1"
                    >
                      {item.product.title}
                    </Link>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      Quantity: {item.quantity} {item.selectedVariant && `• ${item.selectedVariant}`}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Delivery Address & Payment Summary (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin size={15} className="text-aura-600" />
              <span>Shipping Address</span>
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <strong className="block text-slate-900 dark:text-white font-bold">
                {order.shippingAddress.name}
              </strong>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-slate-500 pt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment & Receipt */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CreditCard size={15} className="text-emerald-500" />
              <span>Payment Details</span>
            </h4>
            <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Method</span>
                <span className="uppercase font-bold text-slate-800 dark:text-slate-200">
                  {order.paymentDetails.method}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Txn ID</span>
                <span className="font-mono text-[11px] text-slate-500">
                  {order.paymentDetails.transactionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status</span>
                <span className="text-emerald-600 font-bold uppercase text-[11px]">
                  {order.paymentDetails.status}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-black text-sm text-slate-900 dark:text-white">
                <span>Total Paid</span>
                <span className="text-aura-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
