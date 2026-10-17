import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  ShoppingCart,
  Check,
  Sparkles,
  ArrowRight,
  Plus,
  HelpCircle,
  Award,
} from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { StarRating } from '../components/common/StarRating';
import { formatCurrency } from '../utils/formatters';

export const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { compareItems, removeFromCompare, clearCompare, addToCompare } = useComparison();
  const { addToCart } = useCart();

  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // If no items, show suggestions to add
  if (compareItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <SlidersHorizontal size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          No Products Selected for Comparison
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
          Click the "Compare" button on any product card or details page to compare up to 4 items side-by-side.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/products?category=Electronics"
            className="px-5 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Compare Electronics
          </Link>
          <Link
            to="/products"
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  // Collect all unique specification names across the compared items
  const allSpecNames = Array.from(
    new Set(
      compareItems.flatMap((p) => p.specifications.map((s) => s.name))
    )
  );

  // Recommendation logic: find the best value (highest rating / price ratio)
  const bestValueProduct = [...compareItems].sort(
    (a, b) => b.rating / (b.price / 1000) - a.rating / (a.price / 1000)
  )[0];

  // Top spec product (highest rating or highest price flagship)
  const topSpecProduct = [...compareItems].sort((a, b) => b.price - a.price)[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Product Comparison Matrix
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
              {compareItems.length} Products
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analyze architectural specs, hardware benchmarks, and pricing side-by-side.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="rounded text-aura-600"
            />
            <span>Highlight Differences</span>
          </label>

          <button
            onClick={clearCompare}
            className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-rose-500 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      {compareItems.length > 1 && (
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-aura-900 to-indigo-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl font-bold shrink-0">
              <Award size={22} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                Automated Spec Verdict
              </span>
              <h4 className="font-bold text-sm sm:text-base">
                Best Value Pick: {bestValueProduct.title.slice(0, 48)}...
              </h4>
              <p className="text-xs text-slate-200">
                Offers superior rating ({bestValueProduct.rating}★) and feature density for {formatCurrency(bestValueProduct.price)}.
              </p>
            </div>
          </div>

          <button
            onClick={() => addToCart(bestValueProduct, 1)}
            className="px-4 py-2 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow shrink-0 flex items-center gap-1.5"
          >
            <ShoppingCart size={14} />
            <span>Add Best Value to Cart</span>
          </button>
        </div>
      )}

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left border-collapse">
          {/* Header Row: Product Cards */}
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 sm:p-6 w-48 sm:w-60 bg-slate-50 dark:bg-slate-850 text-xs font-bold uppercase tracking-wider text-slate-400 align-top">
                Products
              </th>
              {compareItems.map((prod) => (
                <th
                  key={prod.id}
                  className="p-4 sm:p-6 min-w-[220px] max-w-[280px] align-top relative border-l border-slate-100 dark:border-slate-800"
                >
                  <button
                    onClick={() => removeFromCompare(prod.id)}
                    className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    title="Remove from comparison"
                  >
                    <X size={16} />
                  </button>

                  <div className="aspect-square w-32 h-32 mx-auto rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 p-2">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-aura-600 uppercase block mt-3">
                    {prod.brand}
                  </span>
                  <Link
                    to={`/product/${prod.id}`}
                    className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-aura-600 line-clamp-2 mt-0.5"
                  >
                    {prod.title}
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      {formatCurrency(prod.price)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {prod.discountPercentage}% OFF
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="mt-3 w-full py-2 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body Rows */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
            {/* Customer Rating */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-500 bg-slate-50/60 dark:bg-slate-850/60">
                Customer Rating
              </td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 sm:p-5 border-l border-slate-100 dark:border-slate-800">
                  <StarRating rating={prod.rating} reviewCount={prod.reviewCount} />
                </td>
              ))}
            </tr>

            {/* Availability */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-500 bg-slate-50/60 dark:bg-slate-850/60">
                Stock & Availability
              </td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 sm:p-5 border-l border-slate-100 dark:border-slate-800">
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      prod.inStock ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    <Check size={14} />
                    {prod.inStock ? `In Stock (${prod.stockCount} units)` : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Delivery */}
            <tr>
              <td className="p-4 sm:p-5 font-semibold text-slate-500 bg-slate-50/60 dark:bg-slate-850/60">
                Delivery Speed
              </td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 sm:p-5 border-l border-slate-100 dark:border-slate-800">
                  {prod.primeDelivery ? (
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      Prime Next-Day Delivery
                    </span>
                  ) : (
                    <span className="text-slate-500">Standard (2-3 Days)</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Dynamic Specs Rows */}
            {allSpecNames.map((specName) => {
              const values = compareItems.map((p) => {
                const s = p.specifications.find((item) => item.name === specName);
                return s ? s.value : '—';
              });

              const isDifferent = new Set(values).size > 1;

              return (
                <tr
                  key={specName}
                  className={
                    highlightDifferences && isDifferent
                      ? 'bg-amber-50/40 dark:bg-amber-950/20'
                      : ''
                  }
                >
                  <td className="p-4 sm:p-5 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-850/60">
                    {specName}
                    {highlightDifferences && isDifferent && (
                      <span className="ml-2 text-[9px] font-black uppercase text-amber-600 bg-amber-100 dark:bg-amber-900 px-1 py-0.2 rounded">
                        Differs
                      </span>
                    )}
                  </td>
                  {values.map((val, idx) => (
                    <td
                      key={idx}
                      className="p-4 sm:p-5 border-l border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-medium"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
