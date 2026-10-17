import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PriceTag } from '../components/common/PriceTag';
import { StarRating } from '../components/common/StarRating';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((prod) => {
      addToCart(prod, 1);
    });
    clearWishlist();
    navigate('/cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Heart size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-2">
          Save your favorite laptops, fashion items, and home decor to track price drops and deals.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <span>Explore Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              My Saved Wishlist
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              {wishlist.length} Items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Items saved for future orders with automatic deal alerts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearWishlist}
            className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-rose-500 transition"
          >
            Clear Wishlist
          </button>

          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
          >
            <ShoppingCart size={15} />
            <span>Move All to Cart</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((prod) => (
          <div
            key={prod.id}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 mb-3">
                <Link to={`/product/${prod.id}`}>
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(prod.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 shadow transition"
                  title="Remove from wishlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <span className="text-[10px] font-bold text-aura-600 uppercase">
                {prod.brand}
              </span>
              <Link
                to={`/product/${prod.id}`}
                className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-aura-600 block line-clamp-2 mt-0.5"
              >
                {prod.title}
              </Link>

              <div className="mt-2">
                <StarRating rating={prod.rating} reviewCount={prod.reviewCount} size="sm" />
              </div>

              <div className="mt-3">
                <PriceTag
                  price={prod.price}
                  originalPrice={prod.originalPrice}
                  discountPercentage={prod.discountPercentage}
                  size="md"
                />
              </div>

              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <Check size={12} /> In Stock ({prod.stockCount} available)
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleMoveToCart(prod)}
                className="w-full py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={14} />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
