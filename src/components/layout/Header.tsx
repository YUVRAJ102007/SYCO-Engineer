import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Sparkles,
  X,
  Package,
  LogOut,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { LocationModal } from '../common/LocationModal';
import { PersonaSwitcherModal } from '../common/PersonaSwitcherModal';
import { formatCurrency } from '../../utils/formatters';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { summary, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { location, setIsModalOpen } = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    navigate(`/products?${params.toString()}`);
  };

  // Live matching suggestions
  const suggestedProducts = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) => {
        const matchesQuery =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesQuery && matchesCat;
      }).slice(0, 4)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
        {/* Top utility bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-slate-950 text-xs text-slate-300 border-b border-slate-800/80">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles size={13} />
              <span>Next-Gen Commerce: Experience AI Shopping & Instant Comparisons</span>
            </span>
            <span className="text-slate-500">|</span>
            <span>Free Express Delivery on orders over ₹999</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsPersonaModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-aura-300 font-medium transition text-[11px] border border-slate-700"
            >
              <span>Demo Persona:</span>
              <strong className="text-white">{currentUser.name}</strong>
              <span className="text-slate-400 text-[10px]">(Click to Switch)</span>
            </button>
            <span className="text-slate-500">|</span>
            <Link to="/assistant" className="hover:text-white transition flex items-center gap-1 text-aura-300">
              <Sparkles size={12} /> AI Assistant
            </Link>
            <span className="text-slate-500">|</span>
            <span>IN / INR (₹)</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 md:gap-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-aura-500 to-cyan-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L3 21h18L12 2z" strokeLinejoin="round" />
                <path d="M12 9l-4 8h8l-4-8z" fill="currentColor" fillOpacity="0.4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-wider text-white flex items-center font-sans">
                ZENVORA
                <span className="ml-1 text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-widest">
                  PRO
                </span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider -mt-1 font-medium">MARKETPLACE</span>
            </div>
          </Link>

          {/* Location Selector */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition text-left shrink-0 border border-transparent hover:border-slate-700"
            title="Change Delivery Location"
          >
            <MapPin size={20} className="text-aura-400 shrink-0 mt-0.5" />
            <div className="leading-tight">
              <span className="text-[11px] text-slate-400 block">Deliver to {currentUser.name.split(' ')[0]}</span>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                {location.city} {location.pincode}
                <ChevronDown size={12} className="text-slate-400" />
              </span>
            </div>
          </button>

          {/* Search Bar with Category Picker & Autocomplete */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="flex w-full rounded-xl overflow-hidden shadow-inner bg-slate-800/90 border border-slate-700 focus-within:border-aura-500 focus-within:ring-2 focus-within:ring-aura-500/30 transition">
              {/* Category Dropdown */}
              <div className="relative hidden sm:block bg-slate-800 border-r border-slate-700 shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-full px-3 py-2 text-xs font-semibold bg-transparent text-slate-300 hover:text-white cursor-pointer focus:outline-none appearance-none pr-7"
                >
                  <option value="All" className="bg-slate-900 text-white">All Departments</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Input */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search laptops, noise cancelling headphones, Supima cotton..."
                  className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 mr-1 text-slate-400 hover:text-white rounded-full transition"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="px-5 bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 text-white transition flex items-center justify-center"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Live Autocomplete suggestions dropdown */}
            {isSearchFocused && suggestedProducts.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Suggested Products</span>
                  <span className="text-aura-400">Press Enter for all results</span>
                </div>
                <div className="divide-y divide-slate-800/60">
                  {suggestedProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-slate-800 transition group"
                    >
                      <img src={p.thumbnail} alt={p.title} className="w-10 h-10 object-cover rounded-lg bg-slate-800" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-aura-400 truncate">
                          {p.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-white">{formatCurrency(p.price)}</span>
                          <span className="text-[10px] text-slate-400">{p.brand}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{p.category}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Account & Profile Menu */}
            <div ref={accountMenuRef} className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition text-left border border-transparent hover:border-slate-700"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-aura-500/40"
                />
                <div className="hidden xl:block leading-tight">
                  <span className="text-[11px] text-slate-400 block">Hello, {currentUser.name.split(' ')[0]}</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    Account & Lists
                    <ChevronDown size={12} className="text-slate-400" />
                  </span>
                </div>
              </button>

              {/* Account Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-fade-in text-slate-200">
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-sm font-bold text-white">{currentUser.name}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setIsPersonaModalOpen(true);
                      }}
                      className="mt-2 text-xs text-aura-400 hover:text-aura-300 font-semibold flex items-center gap-1"
                    >
                      <Sparkles size={12} /> Switch Demo Persona
                    </button>
                  </div>

                  <div className="py-1 text-xs">
                    <Link
                      to="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 hover:text-white transition"
                    >
                      <User size={15} className="text-slate-400" /> Your Account & Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 hover:text-white transition"
                    >
                      <Package size={15} className="text-slate-400" /> Your Orders & Tracking
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 hover:text-white transition"
                    >
                      <Heart size={15} className="text-slate-400" /> Saved Wishlist ({wishlistCount})
                    </Link>
                    <Link
                      to="/compare"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 hover:text-white transition"
                    >
                      <SlidersHorizontal size={15} className="text-slate-400" /> Product Comparison
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-800">
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-slate-800 transition"
                      >
                        <LogOut size={15} /> Sign Out (Browse as Guest)
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          navigate('/account');
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-aura-400 hover:bg-slate-800 transition font-semibold"
                      >
                        <User size={15} /> Sign In
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Orders shortcut */}
            <Link
              to="/orders"
              className="hidden lg:flex flex-col px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition text-left border border-transparent hover:border-slate-700 leading-tight"
            >
              <span className="text-[11px] text-slate-400">Returns</span>
              <span className="text-xs font-bold text-white">& Orders</span>
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              aria-label="Wishlist"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-900">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Live Drawer Toggle */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2.5 px-3 py-1.5 bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 text-white rounded-xl shadow-md transition-transform hover:scale-105"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {summary.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {summary.itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-aura-200 uppercase font-semibold">Cart</span>
                <span className="text-xs font-extrabold text-white">{formatCurrency(summary.total)}</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LocationModal />
      <PersonaSwitcherModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
      />
    </>
  );
};
