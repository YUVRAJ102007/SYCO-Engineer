import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowRight, Trash2 } from 'lucide-react';
import { useComparison } from '../../context/ComparisonContext';
import { formatCurrency } from '../../utils/formatters';

export const FloatingCompareBar: React.FC = () => {
  const navigate = useNavigate();
  const { compareItems, removeFromCompare, clearCompare, isCompareDrawerOpen } = useComparison();

  if (compareItems.length === 0 || !isCompareDrawerOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 text-white shadow-2xl p-3 sm:p-4 animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
            <SlidersHorizontal size={18} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold">
              Comparing Products ({compareItems.length}/4)
            </h4>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Side-by-side technical specs, benchmarks, and pricing
            </p>
          </div>
        </div>

        {/* Center: Selected Product Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-xl py-1">
          {compareItems.map((prod) => (
            <div
              key={prod.id}
              className="relative group flex items-center gap-2 p-1.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0"
            >
              <img
                src={prod.thumbnail}
                alt={prod.title}
                className="w-9 h-9 object-cover rounded-lg bg-slate-900"
              />
              <div className="max-w-[120px] hidden sm:block">
                <p className="text-[11px] font-semibold text-white truncate">{prod.title}</p>
                <p className="text-[10px] text-cyan-400 font-bold">{formatCurrency(prod.price)}</p>
              </div>
              <button
                onClick={() => removeFromCompare(prod.id)}
                className="p-1 text-slate-400 hover:text-rose-400 rounded-full hover:bg-slate-700 transition"
                aria-label="Remove from compare"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Empty placeholders */}
          {Array.from({ length: 4 - compareItems.length }).map((_, idx) => (
            <div
              key={idx}
              className="hidden md:flex items-center justify-center w-24 h-12 rounded-xl border border-dashed border-slate-700 text-[10px] text-slate-500 font-medium"
            >
              + Add Item
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition flex items-center gap-1"
          >
            <Trash2 size={13} />
            <span>Clear</span>
          </button>

          <button
            onClick={() => navigate('/compare')}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-aura-600 hover:from-cyan-400 hover:to-aura-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <span>Compare Now</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
