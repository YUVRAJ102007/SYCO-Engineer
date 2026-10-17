import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Zap, Clock, Sparkles, Filter, Percent, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { formatCurrency } from '../utils/formatters';

const BUDGET_PRESETS = [
  { label: 'All Budgets', maxPrice: Infinity },
  { label: 'Under ₹1,000', maxPrice: 1000 },
  { label: 'Under ₹5,000', maxPrice: 5000 },
  { label: 'Under ₹10,000', maxPrice: 10000 },
  { label: 'Under ₹25,000', maxPrice: 25000 },
  { label: 'Under ₹60,000', maxPrice: 60000 },
];

const DISCOUNT_TIERS = [
  { label: 'All Discounts', minDiscount: 0 },
  { label: '40% Off or more', minDiscount: 40 },
  { label: '30% Off or more', minDiscount: 30 },
  { label: '20% Off or more', minDiscount: 20 },
];

export const DealsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialBudgetParam = searchParams.get('budget');

  const [selectedBudget, setSelectedBudget] = useState<number>(
    initialBudgetParam ? Number(initialBudgetParam) : Infinity
  );
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dealSortBy, setDealSortBy] = useState<'discount' | 'savings' | 'price-asc'>('discount');

  // Filter deals
  const deals = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Must have discount
      if (p.discountPercentage <= 0) return false;
      // Budget check
      if (p.price > selectedBudget) return false;
      // Discount threshold
      if (p.discountPercentage < selectedDiscount) return false;
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      return true;
    }).sort((a, b) => {
      if (dealSortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      if (dealSortBy === 'savings')
        return b.originalPrice - b.price - (a.originalPrice - a.price);
      return a.price - b.price;
    });
  }, [selectedBudget, selectedDiscount, selectedCategory, dealSortBy]);

  // Total savings across matching deals
  const totalCombinedSavings = deals.reduce(
    (sum, d) => sum + Math.max(0, d.originalPrice - d.price),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-950 text-white shadow-xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            <Zap size={13} className="fill-amber-300 text-amber-300" />
            <span>Smart Deal Finder & Budget Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Today's Best Verified Marketplace Deals
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Live discounts with transparent calculations. No fabricated history—only genuine savings from verified brands.
          </p>
        </div>

        {/* Total Available Savings Card */}
        <div className="p-4 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/20 text-center shrink-0">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
            Combined Catalogue Savings
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white">
            {formatCurrency(totalCombinedSavings)}
          </span>
          <span className="text-[10px] text-slate-300 block mt-0.5">
            Across {deals.length} active deals
          </span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-8 space-y-4">
        {/* Budget Pills */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            1. Select Maximum Budget
          </span>
          <div className="flex flex-wrap gap-2">
            {BUDGET_PRESETS.map((b) => (
              <button
                key={b.label}
                onClick={() => setSelectedBudget(b.maxPrice)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedBudget === b.maxPrice
                    ? 'bg-aura-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category & Discount Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Category Dropdown */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Discount Tier */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Minimum Discount:
            </label>
            <select
              value={selectedDiscount}
              onChange={(e) => setSelectedDiscount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              {DISCOUNT_TIERS.map((tier) => (
                <option key={tier.minDiscount} value={tier.minDiscount}>
                  {tier.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Sort Deals:
            </label>
            <select
              value={dealSortBy}
              onChange={(e) => setDealSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="discount">Highest Percentage Discount</option>
              <option value="savings">Highest Rupee Savings</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      {deals.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Percent size={44} className="text-slate-300 dark:text-slate-700 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 dark:text-white text-base">
            No deals found in this budget & discount range
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your maximum budget or lowering the minimum discount threshold.
          </p>
          <button
            onClick={() => {
              setSelectedBudget(Infinity);
              setSelectedDiscount(0);
              setSelectedCategory('All');
            }}
            className="mt-4 px-5 py-2 bg-aura-600 text-white font-bold text-xs rounded-xl"
          >
            Reset Deal Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
