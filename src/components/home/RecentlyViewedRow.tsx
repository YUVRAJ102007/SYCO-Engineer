import React from 'react';
import { Link } from 'react-router-dom';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const RecentlyViewedRow: React.FC = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // If no items viewed yet, show recommended trending items
  const displayItems = recentlyViewed.length > 0
    ? recentlyViewed.slice(0, 4)
    : PRODUCTS.filter((p) => p.isTrending).slice(0, 4);

  const isBrowsingHistory = recentlyViewed.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-aura-600 dark:text-aura-400 flex items-center gap-1.5">
            <History size={15} />
            <span>{isBrowsingHistory ? 'Your Browsing Activity' : 'Recommended For You'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isBrowsingHistory ? 'Recently Viewed Products' : 'Inspired by Trending Searches'}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {isBrowsingHistory && (
            <button
              onClick={clearRecentlyViewed}
              className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
            >
              <Trash2 size={13} />
              <span>Clear History</span>
            </button>
          )}

          <Link
            to="/products"
            className="text-xs sm:text-sm font-bold text-aura-600 dark:text-aura-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
