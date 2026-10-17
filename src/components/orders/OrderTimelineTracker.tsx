import React from 'react';
import { Check, Clock, Truck, Package, ShieldCheck, Home, ArrowRight, Play } from 'lucide-react';
import { Order, OrderStatus } from '../../types/order';
import { useAuth } from '../../context/AuthContext';

interface OrderTimelineTrackerProps {
  order: Order;
}

const STAGES: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'placed', label: 'Order Placed', icon: <Package size={16} /> },
  { status: 'confirmed', label: 'Confirmed', icon: <ShieldCheck size={16} /> },
  { status: 'processing', label: 'Processing & Packed', icon: <Clock size={16} /> },
  { status: 'shipped', label: 'Shipped', icon: <Truck size={16} /> },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: <Truck size={16} /> },
  { status: 'delivered', label: 'Delivered', icon: <Home size={16} /> },
];

const ORDER_INDEX_MAP: Record<OrderStatus, number> = {
  placed: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  out_for_delivery: 4,
  delivered: 5,
  cancelled: -1,
};

export const OrderTimelineTracker: React.FC<OrderTimelineTrackerProps> = ({ order }) => {
  const { advanceOrderStatus } = useAuth();
  const currentStageIndex = ORDER_INDEX_MAP[order.status] ?? 0;

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header with simulation action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Live Package Tracking Dashboard
          </span>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>Tracking #{order.id}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 uppercase">
              {order.status.replace(/_/g, ' ')}
            </span>
          </h3>
        </div>

        {/* Demo Simulation Button */}
        {order.status !== 'delivered' && (
          <button
            onClick={() => advanceOrderStatus(order.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold hover:bg-indigo-100 transition shadow-xs"
            title="Click to simulate advancing the courier progress"
          >
            <Play size={14} className="fill-indigo-600 dark:fill-indigo-400" />
            <span>Simulate Next Delivery Stage</span>
          </button>
        )}
      </div>

      {/* Visual Timeline Bar */}
      <div className="relative py-4">
        {/* Connection Line */}
        <div className="absolute top-8 left-4 right-4 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 hidden md:block">
          <div
            className="h-full bg-emerald-500 transition-all duration-700"
            style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div key={stage.status} className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  } ${isCurrent ? 'scale-110' : ''}`}
                >
                  {isCompleted ? <Check size={18} /> : stage.icon}
                </div>

                <span
                  className={`text-xs font-bold mt-2.5 ${
                    isCurrent
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                      : isCompleted
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-400'
                  }`}
                >
                  {stage.label}
                </span>

                {isCurrent && (
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full mt-1">
                    Current Stage
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tracking event logs */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Status Checkpoints
        </h4>
        <div className="space-y-2.5">
          {order.trackingHistory.slice().reverse().map((event, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-start justify-between text-xs"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {event.title}
                </span>
                <span className="text-slate-500 dark:text-slate-400 mt-0.5 block">
                  {event.description}
                </span>
              </div>
              <span className="text-slate-400 font-medium shrink-0 ml-4">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
