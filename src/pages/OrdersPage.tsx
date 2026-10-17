import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Truck, ArrowRight, RotateCcw, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useAuth();
  const { addToCart } = useCart();

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addToCart(item.product, item.quantity, item.selectedVariant);
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Your Orders & Returns
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track packages, review past purchases, and manage returns
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Package size={52} className="text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-800 dark:text-white">
            No orders placed yet
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Browse our product catalog to discover trending electronics, fashion, and home goods.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-block px-6 py-2.5 bg-aura-600 text-white font-bold text-xs rounded-xl"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Order Placed
                    </span>
                    <strong className="text-slate-800 dark:text-slate-200">{ord.date}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Total Amount
                    </span>
                    <strong className="text-slate-900 dark:text-white font-black">
                      {formatCurrency(ord.total)}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Ship To
                    </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {ord.shippingAddress.name}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500 font-bold">
                    Order #{ord.id}
                  </span>
                  <Link
                    to={`/orders/${ord.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-aura-600 dark:text-aura-400 font-bold border border-slate-200 dark:border-slate-700 hover:border-aura-400 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Order Items & Status */}
              <div className="p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        ord.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400'
                      }`}
                    >
                      <Truck size={13} />
                      <span>{ord.status.replace(/_/g, ' ')}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Estimated: <strong>{ord.estimatedDeliveryDate}</strong>
                    </span>
                  </div>

                  <div className="space-y-3">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-4">
                        <img
                          src={it.product.thumbnail}
                          alt={it.product.title}
                          className="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/product/${it.product.id}`}
                            className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-aura-600 line-clamp-1"
                          >
                            {it.product.title}
                          </Link>
                          <span className="text-xs text-slate-400 block mt-0.5">
                            Qty: {it.quantity} • {formatCurrency(it.product.price)} each
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 w-full lg:w-48">
                  <Link
                    to={`/orders/${ord.id}`}
                    className="w-full py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-xs transition text-center flex items-center justify-center gap-2"
                  >
                    <Truck size={14} />
                    <span>Track Package</span>
                  </Link>

                  <button
                    onClick={() => handleReorder(ord)}
                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} />
                    <span>Buy Again</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
