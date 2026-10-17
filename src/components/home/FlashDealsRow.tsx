import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const FlashDealsRow: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.filter((p) => p.isDealOfTheDay);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Header with Countdown Clock */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white border border-rose-900/40 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
            <Zap size={13} className="fill-rose-400 text-rose-400" />
            <span>Limited-Time Flash Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Today's Lightning Deals
          </h2>
          <p className="text-xs text-slate-300">
            Exclusive discounts up to 50% off. Stock is reserved on first-come basis.
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
            <Clock size={16} className="text-amber-400" />
            <span>Ends in:</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono font-black text-sm">
            <div className="bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-inner">
              {String(timeLeft.hours).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-normal text-slate-400 -mt-0.5 text-center">HRS</span>
            </div>
            <span className="text-slate-500 font-bold">:</span>
            <div className="bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-inner">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-normal text-slate-400 -mt-0.5 text-center">MIN</span>
            </div>
            <span className="text-slate-500 font-bold">:</span>
            <div className="bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-inner text-amber-400">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-normal text-slate-400 -mt-0.5 text-center">SEC</span>
            </div>
          </div>

          <Link
            to="/deals"
            className="hidden md:flex ml-4 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition items-center gap-1"
          >
            <span>See All Deals</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Grid of Deal Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dealProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
