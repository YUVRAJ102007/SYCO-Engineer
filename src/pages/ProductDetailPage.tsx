import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Heart,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductSpecsTable } from '../components/product/ProductSpecsTable';
import { DeliveryPincodeChecker } from '../components/product/DeliveryPincodeChecker';
import { FrequentlyBoughtTogether } from '../components/product/FrequentlyBoughtTogether';
import { CustomerReviewsSection } from '../components/product/CustomerReviewsSection';
import { ProductCard } from '../components/product/ProductCard';
import { StarRating } from '../components/common/StarRating';
import { PriceTag } from '../components/common/PriceTag';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { formatCurrency } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useComparison();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants?.[0]?.name
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // Track into recently viewed when opened
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product not found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested product may have been discontinued or moved.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block px-6 py-2.5 bg-aura-600 text-white rounded-xl font-bold text-xs"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Calculate variant modified price
  const variantObj = product.variants?.find((v) => v.name === selectedVariant);
  const activePrice = product.price + (variantObj?.priceModifier || 0);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-aura-600 transition">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-aura-600 transition"
        >
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-500">{product.subcategory}</span>
        <ChevronRight size={12} />
        <span className="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1 max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-6 xl:col-span-5">
          <ProductGallery product={product} />
        </div>

        {/* Center: Essential Details & Selection (4 cols) */}
        <div className="lg:col-span-6 xl:col-span-4 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-aura-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-medium">{product.subcategory}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Ratings & Reviews */}
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
                100% Verified Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <PriceTag
              price={activePrice}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              size="xl"
              showSavings
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Inclusive of all taxes. Free Express shipping available for Prime.
            </p>
          </div>

          {/* Variants Selector (if any) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Configuration / Variant:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant === v.name;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.name)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                        isSelected
                          ? 'border-aura-600 bg-aura-50 dark:bg-aura-950 text-aura-600 dark:text-aura-400 ring-2 ring-aura-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {v.label}
                      {v.priceModifier && ` (+${formatCurrency(v.priceModifier)})`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Product Features Bullets */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              About This Item:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {product.features.slice(0, 5).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-aura-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Buy Box / Fulfillment Card (3 cols) */}
        <div className="lg:col-span-12 xl:col-span-3 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(activePrice * quantity)}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                In Stock ({product.stockCount} units)
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none"
              >
                {Array.from({ length: Math.min(product.stockCount, 10) }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => addToCart(product, quantity, selectedVariant)}
                className="w-full py-3.5 bg-aura-600 hover:bg-aura-700 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={17} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Zap size={17} className="fill-slate-950" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Secondary actions: Wishlist & Compare */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => toggleWishlist(product)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  isFavorited
                    ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Heart size={14} className={isFavorited ? 'fill-rose-600' : ''} />
                <span>{isFavorited ? 'Saved' : 'Wishlist'}</span>
              </button>

              <button
                onClick={() => addToCompare(product)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  isCompared
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <SlidersHorizontal size={14} />
                <span>{isCompared ? 'Comparing' : 'Compare'}</span>
              </button>
            </div>

            {/* Delivery Pincode Checker Component */}
            <DeliveryPincodeChecker primeEligible={product.primeDelivery} />

            {/* Fulfillment notice */}
            <div className="text-[11px] text-slate-400 space-y-1">
              <p>Ships from: <strong>Zenvora Fulfillment Center</strong></p>
              <p>Sold by: <strong>Official {product.brand} Direct</strong></p>
              <p>7-Day Replacement Guarantee Included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <FrequentlyBoughtTogether mainProduct={product} />

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="mt-12">
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-6 text-sm font-bold border-b-2 transition ${
              activeTab === 'specs'
                ? 'border-aura-600 text-aura-600 dark:text-aura-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-6 text-sm font-bold border-b-2 transition ${
              activeTab === 'reviews'
                ? 'border-aura-600 text-aura-600 dark:text-aura-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <ProductSpecsTable specifications={product.specifications} brand={product.brand} />
        ) : (
          <CustomerReviewsSection product={product} />
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="my-16">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
            Customers Who Viewed This Also Bought
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
