import React from 'react';
import { ProductSpecification } from '../../types/product';
import { ShieldCheck, Award } from 'lucide-react';

interface ProductSpecsTableProps {
  specifications: ProductSpecification[];
  brand: string;
}

export const ProductSpecsTable: React.FC<ProductSpecsTableProps> = ({ specifications, brand }) => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
            Technical Specifications & Details
          </h4>
          <span className="text-xs text-aura-600 dark:text-aura-400 font-semibold">
            Brand: {brand}
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-3 p-4 transition ${
                spec.highlight
                  ? 'bg-aura-50/40 dark:bg-aura-950/20'
                  : index % 2 === 0
                  ? 'bg-slate-50/30 dark:bg-slate-900/30'
                  : ''
              }`}
            >
              <span className="font-semibold text-slate-500 dark:text-slate-400 sm:col-span-1">
                {spec.name}
              </span>
              <span className="font-medium text-slate-900 dark:text-white sm:col-span-2 mt-1 sm:mt-0">
                {spec.value}
                {spec.highlight && (
                  <span className="ml-2 text-[10px] font-black uppercase text-aura-600 bg-aura-100 dark:bg-aura-900 px-1.5 py-0.5 rounded">
                    Key Spec
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Assurance banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center gap-3">
          <ShieldCheck size={28} className="text-emerald-500 shrink-0" />
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs">
              100% Genuine Guaranteed
            </h5>
            <p className="text-[11px] text-slate-500">
              Sourced directly from authorized manufacturers and verified distributors.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center gap-3">
          <Award size={28} className="text-aura-500 shrink-0" />
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs">
              Manufacturer Warranty Covered
            </h5>
            <p className="text-[11px] text-slate-500">
              Official warranty with hassle-free claim assistance via Aura Concierge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
