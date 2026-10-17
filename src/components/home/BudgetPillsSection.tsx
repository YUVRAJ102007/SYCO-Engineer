import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { formatCurrency } from '../../utils/formatters';

interface BudgetOption {
  label: string;
  maxPrice: number;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  { label: 'Under ₹1,000', maxPrice: 1000 },
  { label: 'Under ₹5,000', maxPrice: 5000 },
  { label: 'Under ₹10,000', maxPrice: 10000 },
  { label: 'Under ₹25,000', maxPrice: 25000 },
  { label: 'Under ₹60,000', maxPrice: 60000 },
];

export const BudgetPillsSection: React.FC = () => {
  const [selectedBudget, setSelectedBudget] = useState<number>(5000);

  const filteredProducts = PRODUCTS.filter((p) => p.price <= selectedBudget).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-aura-600 dark:text-aura-400 flex items-center gap-1.5">
            <Wallet size={15} />
            <span>Smart Budget Explorer</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Curated Finds Within Your Price Goal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pick your spending budget to discover verified best-value products instantly.
          </p>
        </div>

        {/* Budget Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {BUDGET_OPTIONS.map((opt) => {
            const isSelected = selectedBudget === opt.maxPrice;
            return (
              <button
                key={opt.maxPrice}
                onClick={() => setSelectedBudget(opt.maxPrice)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-xs ${
                  isSelected
                    ? 'bg-aura-600 text-white shadow-md ring-2 ring-aura-400'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-aura-400'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Footer link to Deals Page */}
      <div className="mt-6 text-center">
        <Link
          to={`/deals?budget=${selectedBudget}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-aura-600 dark:text-aura-400 hover:underline"
        >
          <span>See all products {BUDGET_OPTIONS.find((b) => b.maxPrice === selectedBudget)?.label} in Deal Finder</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
