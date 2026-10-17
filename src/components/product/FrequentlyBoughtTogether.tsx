import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product;
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  mainProduct,
}) => {
  const { addToCart } = useCart();

  // Find companion items
  const companionIds = mainProduct.frequentlyBoughtTogetherIds || [];
  const companions = PRODUCTS.filter((p) => companionIds.includes(p.id)).slice(0, 2);

  const bundleItems = [mainProduct, ...companions];
  const [selectedIds, setSelectedIds] = useState<string[]>(bundleItems.map((b) => b.id));

  if (companions.length === 0) return null;

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds((prev) => prev.filter((i) => i !== id));
      }
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const selectedProducts = bundleItems.filter((b) => selectedIds.includes(b.id));
  const bundleTotalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleOriginalPrice = selectedProducts.reduce((sum, p) => sum + p.originalPrice, 0);
  const bundleSavings = Math.max(0, bundleOriginalPrice - bundleTotalPrice);

  const handleAddBundleToCart = () => {
    selectedProducts.forEach((p) => {
      addToCart(p, 1);
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm my-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-amber-500" />
        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
          Frequently Bought Together
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Products showcase with Plus icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {bundleItems.map((prod, idx) => {
            const isChecked = selectedIds.includes(prod.id);
            return (
              <React.Fragment key={prod.id}>
                {idx > 0 && (
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold shrink-0">
                    <Plus size={16} />
                  </div>
                )}

                <div className="flex flex-col items-center max-w-[140px] text-center group">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={() => toggleSelect(prod.id)}
                      className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-md flex items-center justify-center transition ${
                        isChecked
                          ? 'bg-aura-600 text-white'
                          : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 text-transparent'
                      }`}
                      aria-label="Toggle bundle product"
                    >
                      <Check size={12} />
                    </button>
                  </div>

                  <Link
                    to={`/product/${prod.id}`}
                    className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-aura-600 line-clamp-1 mt-2"
                  >
                    {prod.title}
                  </Link>
                  <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                    {formatCurrency(prod.price)}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Pricing Summary & Action */}
        <div className="w-full lg:w-72 p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center lg:text-left flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">
              Total for {selectedProducts.length} items:
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {formatCurrency(bundleTotalPrice)}
            </div>
            {bundleSavings > 0 && (
              <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                You save {formatCurrency(bundleSavings)} on this bundle!
              </span>
            )}
          </div>

          <button
            onClick={handleAddBundleToCart}
            className="mt-4 w-full py-3 bg-aura-600 hover:bg-aura-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={15} />
            <span>Add all {selectedProducts.length} to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
