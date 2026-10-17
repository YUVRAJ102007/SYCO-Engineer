import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Download, Truck, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useAuth();

  const order = orders.find((o) => o.id === id) || orders[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Celebration Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-glow">
          <CheckCircle2 size={48} className="animate-scale-in" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full inline-block">
          Order Successfully Placed
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Thank You, {order ? order.customerName.split(' ')[0] : 'Customer'}!
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          We've received your order and our automated fulfillment team is preparing it for dispatch.
          A confirmation email has been dispatched.
        </p>

        {/* Order Reference Box */}
        {order && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2 mt-4 text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">Order Reference:</span>
              <strong className="font-mono text-aura-600 font-bold">{order.id}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Delivery:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                {order.estimatedDeliveryDate}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Total Paid:</span>
              <strong className="text-slate-900 dark:text-white font-black">
                {formatCurrency(order.total)}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Payment Method:</span>
              <span className="uppercase font-semibold text-slate-700 dark:text-slate-300">
                {order.paymentDetails.method} (Success)
              </span>
            </div>
          </div>
        )}

        {/* Action CTAs */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={`/orders/${order?.id || ''}`}
            className="px-6 py-3.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Truck size={16} />
            <span>Track Order & Delivery Timeline</span>
          </Link>

          <Link
            to="/products"
            className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
