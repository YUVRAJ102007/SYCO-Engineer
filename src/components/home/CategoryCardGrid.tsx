import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { formatCurrency } from '../../utils/formatters';

export const CategoryCardGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-aura-600 dark:text-aura-400">
            Curated Catalogues
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Shop by Department
          </h2>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-aura-600 dark:text-aura-400 hover:underline flex items-center gap-1 group"
        >
          <span>View All Products</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${encodeURIComponent(cat.id)}`}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-4/3 shadow-xs hover:shadow-xl transition-all duration-300"
          >
            {/* Background Image with zoom */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-60"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Starting from {formatCurrency(cat.startingPrice)}
              </span>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight mt-0.5 group-hover:text-aura-300 transition">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-1 mt-1 opacity-90 hidden sm:block">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
