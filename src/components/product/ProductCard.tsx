import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, SlidersHorizontal, Zap, Check, Truck } from 'lucide-react';
import { Product } from '../../types/product';
import { StarRating } from '../common/StarRating';
import { PriceTag } from '../common/PriceTag';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
import { getEstimatedDeliveryDate } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useComparison();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const deliveryEst = getEstimatedDeliveryDate(product.primeDelivery ? 1 : 3);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-aura-400 dark:hover:border-aura-600 shadow-xs hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5">
        {/* Image Section */}
        <div className="relative w-full sm:w-56 h-52 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
          <Link to={`/product/${product.id}`} className="w-full h-full">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
            {product.isDealOfTheDay && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded shadow">
                <Zap size={10} className="fill-white" /> Deal of the Day
              </span>
            )}
            {product.isBestSeller && (
              <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow">
                #1 Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md backdrop-blur-sm transition-transform hover:scale-110 ${
              isFavorited
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-500 hover:text-rose-500'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={16} className={isFavorited ? 'fill-rose-600' : ''} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-aura-600 dark:text-aura-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500">{product.subcategory}</span>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="font-bold text-slate-900 dark:text-white text-base hover:text-aura-600 dark:hover:text-aura-400 transition line-clamp-2"
            >
              {product.title}
            </Link>

            <div className="mt-2 flex items-center gap-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              {product.primeDelivery && (
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                  <Truck size={12} /> Prime Express
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Pricing & CTAs */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              size="lg"
              showSavings
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => addToCompare(product)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  isCompared
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-300'
                }`}
                title="Add to compare"
              >
                <SlidersHorizontal size={15} />
                <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
              </button>

              <button
                onClick={() => addToCart(product, 1)}
                className="px-4 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition flex items-center gap-2"
              >
                <ShoppingCart size={15} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Default)
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-aura-400 dark:hover:border-aura-600 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 dark:bg-slate-800/60 overflow-hidden flex items-center justify-center p-2">
        <Link to={`/product/${product.id}`} className="w-full h-full block">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isDealOfTheDay && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded shadow">
              <Zap size={10} className="fill-white" /> Deal of Day
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow">
              Best Seller
            </span>
          )}
          {product.discountPercentage > 25 && !product.isDealOfTheDay && (
            <span className="inline-flex items-center text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded shadow">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-sm transition-transform hover:scale-110 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-500 hover:text-rose-500'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={16} className={isFavorited ? 'fill-rose-600' : ''} />
        </button>

        {/* Compare quick button on hover */}
        <button
          onClick={() => addToCompare(product)}
          className={`absolute bottom-3 right-3 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 ${
            isCompared
              ? 'bg-cyan-500 text-white'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-cyan-500 opacity-90 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
          title={isCompared ? 'In Comparison' : 'Compare Specifications'}
        >
          {isCompared ? <Check size={14} /> : <SlidersHorizontal size={14} />}
        </button>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
            <span className="text-aura-600 dark:text-aura-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <span>{product.category}</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-bold text-slate-900 dark:text-white text-sm hover:text-aura-600 dark:hover:text-aura-400 transition line-clamp-2 leading-snug"
          >
            {product.title}
          </Link>

          {/* Ratings */}
          <div className="mt-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
        </div>

        {/* Bottom Details & Price */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              size="md"
            />
          </div>

          {/* Delivery Note */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            <Truck size={12} className={product.primeDelivery ? 'text-cyan-500' : 'text-slate-400'} />
            <span>
              {product.primeDelivery ? 'Express Delivery' : 'Standard Delivery'} by <strong className="text-slate-700 dark:text-slate-300">{deliveryEst}</strong>
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 bg-aura-600 hover:bg-aura-700 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
