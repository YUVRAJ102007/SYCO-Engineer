import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

const TABS = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books'];

export const BestSellersTabbed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = PRODUCTS.filter((p) => {
    const isTop = p.isBestSeller || p.rating >= 4.7;
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    return isTop && matchesTab;
  }).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <Award size={15} />
            <span>Community Verified</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Best Sellers & Top Rated
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Best Sellers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to={`/products?sort=popularity${activeTab !== 'All' ? `&category=${encodeURIComponent(activeTab)}` : ''}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-aura-600 dark:text-aura-400 hover:underline"
        >
          <span>Explore all top selling {activeTab === 'All' ? 'products' : activeTab}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
