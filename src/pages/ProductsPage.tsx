import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Search,
  Star,
  Truck,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilterState } from '../types/product';
import { formatCurrency } from '../utils/formatters';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial filter state from URL params
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = (searchParams.get('sort') as any) || 'featured';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 160000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState(false);
  const [sortBy, setSortBy] = useState<ProductFilterState['sortBy']>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync URL query params with state
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Unique brands across dataset
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    PRODUCTS.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrands([]);
    setPriceRange([0, 160000]);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setFastDeliveryOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // 3. Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // 4. Price
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      // 5. Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // 6. Discount
      if (minDiscount > 0 && p.discountPercentage < minDiscount) {
        return false;
      }

      // 7. Stock
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // 8. Fast delivery
      if (fastDeliveryOnly && !p.primeDelivery) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'discount-desc':
          return b.discountPercentage - a.discountPercentage;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'featured':
        default:
          return (b.isBestSeller ? 2 : 0) + b.rating - ((a.isBestSeller ? 2 : 0) + a.rating);
      }
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    priceRange,
    minRating,
    minDiscount,
    inStockOnly,
    fastDeliveryOnly,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Filter Sidebar Content (used in desktop sidebar & mobile drawer)
  const FilterContent = (
    <div className="space-y-6 text-xs sm:text-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
          Refine Results
        </h3>
        <button
          onClick={handleClearAllFilters}
          className="text-xs text-aura-600 dark:text-aura-400 hover:underline flex items-center gap-1 font-semibold"
        >
          <RotateCcw size={12} />
          <span>Clear All</span>
        </button>
      </div>

      {/* Category selector */}
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
          Department
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
              selectedCategory === 'All'
                ? 'bg-aura-50 dark:bg-aura-950 font-bold text-aura-600 dark:text-aura-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Departments ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-aura-50 dark:bg-aura-950 font-bold text-aura-600 dark:text-aura-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-slate-400 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Price Range
          </h4>
          <span className="text-xs font-bold text-aura-600 dark:text-aura-400">
            {formatCurrency(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={160000}
          step={1000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-aura-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹0</span>
          <span>Max ₹1,60,000+</span>
        </div>
      </div>

      {/* Brands */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
          Brand
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {allBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-aura-600"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-slate-300 text-aura-600 focus:ring-aura-500"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => setMinRating(minRating === stars ? 0 : stars)}
              className={`w-full flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs transition ${
                minRating === stars
                  ? 'bg-aura-50 dark:bg-aura-950 font-bold text-aura-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                  />
                ))}
              </div>
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Discount Minimum */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
          Discount
        </h4>
        <div className="space-y-1">
          {[50, 40, 30, 20].map((disc) => (
            <button
              key={disc}
              onClick={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
              className={`w-full text-left px-2.5 py-1 rounded-lg text-xs transition ${
                minDiscount === disc
                  ? 'bg-aura-50 dark:bg-aura-950 font-bold text-aura-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {disc}% Off or more
            </button>
          ))}
        </div>
      </div>

      {/* Toggles: Prime & Stock */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={fastDeliveryOnly}
            onChange={(e) => setFastDeliveryOnly(e.target.checked)}
            className="rounded border-slate-300 text-aura-600 focus:ring-aura-500"
          />
          <span className="flex items-center gap-1 font-semibold text-cyan-600 dark:text-cyan-400">
            <Truck size={14} /> Prime Express Delivery
          </span>
        </label>

        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-slate-300 text-aura-600 focus:ring-aura-500"
          />
          <span>Include Out of Stock</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {displayedProducts.length} of {filteredProducts.length} results
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Right Sort & View Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
          >
            <Filter size={15} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-aura-500"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Customer Rating</option>
              <option value="discount-desc">Biggest Discount</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-0.5 bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-aura-600 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-aura-600 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 h-fit sticky top-24 shadow-xs">
          {FilterContent}
        </aside>

        {/* Product Grid / List Container */}
        <main className="lg:col-span-9">
          {displayedProducts.length === 0 ? (
            /* Zero results state */
            <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <Search size={48} className="text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <h3 className="text-lg font-black text-slate-800 dark:text-white">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                We couldn't find any products matching your current combination of filters. Try broadening your criteria or reset the filters.
              </p>
              <button
                onClick={handleClearAllFilters}
                className="mt-5 px-5 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                    : 'space-y-4'
                }
              >
                {displayedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} viewMode={viewMode} />
                ))}
              </div>

              {/* Load More Button */}
              {displayedProducts.length < filteredProducts.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-xl shadow-xs hover:border-aura-500 transition"
                  >
                    Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl p-6 overflow-y-auto z-10 animate-slide-right">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            {FilterContent}
          </div>
        </div>
      )}
    </div>
  );
};
