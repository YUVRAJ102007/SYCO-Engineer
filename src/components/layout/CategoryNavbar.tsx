import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Sparkles,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  X,
  Laptop,
  Shirt,
  Home,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Apple,
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useComparison } from '../../context/ComparisonContext';

const ICON_COMPONENTS: Record<string, React.ReactNode> = {
  Laptop: <Laptop size={18} className="text-cyan-500" />,
  Shirt: <Shirt size={18} className="text-pink-500" />,
  Home: <Home size={18} className="text-amber-500" />,
  Sparkles: <Sparkles size={18} className="text-purple-500" />,
  BookOpen: <BookOpen size={18} className="text-emerald-500" />,
  Dumbbell: <Dumbbell size={18} className="text-rose-500" />,
  Gamepad2: <Gamepad2 size={18} className="text-blue-500" />,
  Apple: <Apple size={18} className="text-red-500" />,
};

export const CategoryNavbar: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const { compareItems } = useComparison();

  return (
    <>
      <nav className="bg-slate-850 text-slate-200 border-b border-slate-800 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          {/* Left: All categories toggle & Category links */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* All Departments Toggle Button */}
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-750 text-white font-semibold hover:bg-slate-800 transition shrink-0"
            >
              <Menu size={16} />
              <span>All Departments</span>
            </button>

            {/* Direct Category Links */}
            {CATEGORIES.slice(0, 6).map((cat) => {
              const isActive = location.search.includes(`category=${encodeURIComponent(cat.id)}`);
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${encodeURIComponent(cat.id)}`}
                  className={`px-2.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Right Highlights: Deals, Best Sellers, Assistant, Compare */}
          <div className="flex items-center gap-1.5 shrink-0 ml-4">
            <Link
              to="/deals"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 font-semibold transition"
            >
              <Zap size={14} className="fill-amber-400" />
              <span>Today's Deals</span>
            </Link>

            <Link
              to="/products?sort=popularity"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">Best Sellers</span>
            </Link>

            <Link
              to="/compare"
              className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <SlidersHorizontal size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">Compare</span>
              {compareItems.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-cyan-500 text-slate-950 font-black text-[10px] rounded-full">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/assistant"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 text-white font-bold transition shadow-sm"
            >
              <Sparkles size={13} className="text-cyan-300" />
              <span>Smart Assistant</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Slide-out Mega Menu Drawer */}
      {isMegaMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMegaMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-slide-right">
            {/* Drawer Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Menu size={20} className="text-aura-400" />
                <h3 className="font-bold text-base">Shop by Department</h3>
              </div>
              <button
                onClick={() => setIsMegaMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                All Product Categories
              </div>

              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="rounded-xl overflow-hidden">
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.id)}`}
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group text-slate-800 dark:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-xs transition">
                        {ICON_COMPONENTS[cat.iconName] || <Laptop size={18} />}
                      </div>
                      <div>
                        <span className="font-semibold text-sm group-hover:text-aura-600 dark:group-hover:text-aura-400 transition">
                          {cat.name}
                        </span>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{cat.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 px-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Special Programs
                </span>
                <Link
                  to="/deals"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-amber-500 font-semibold hover:underline"
                >
                  <Zap size={16} /> Deals of the Day (Up to 50% Off)
                </Link>
                <Link
                  to="/assistant"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-aura-600 dark:text-aura-400 font-semibold hover:underline"
                >
                  <Sparkles size={16} /> AI Smart Shopping Concierge
                </Link>
                <Link
                  to="/compare"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                >
                  <SlidersHorizontal size={16} /> Side-by-Side Spec Comparison
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
