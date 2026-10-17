import React, { useState } from 'react';
import { Zap, Heart, Share2, Maximize2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { Product } from '../../types/product';
import { useNotification } from '../../context/NotificationContext';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.thumbnail);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useNotification();
  const isFavorited = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success('Link Copied', 'Product link copied to clipboard.');
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail column */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] shrink-0 no-scrollbar">
        {product.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition shrink-0 bg-slate-100 dark:bg-slate-800 ${
              selectedImage === img
                ? 'border-aura-600 ring-2 ring-aura-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
            }`}
          >
            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Viewer with Zoom */}
      <div className="flex-1 relative aspect-square sm:aspect-4/3 md:aspect-square bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center p-4">
        {/* Floating action buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-transform hover:scale-110 ${
              isFavorited
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-rose-500'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={18} className={isFavorited ? 'fill-rose-600' : ''} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full shadow-md backdrop-blur-md bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-aura-600 transition-transform hover:scale-110"
            title="Share product"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isDealOfTheDay && (
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-md shadow-md">
              <Zap size={12} className="fill-white" /> Deal of the Day
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center text-[11px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md shadow-md">
              #1 Best Seller
            </span>
          )}
        </div>

        {/* Main image with hover magnification */}
        <div
          className="w-full h-full relative cursor-crosshair overflow-hidden rounded-2xl flex items-center justify-center"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={selectedImage}
            alt={product.title}
            className={`max-w-full max-h-full object-contain transition-transform duration-150 ${
              isZoomed ? 'scale-150 pointer-events-none' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }
                : undefined
            }
          />
        </div>

        <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1 pointer-events-none">
          <Maximize2 size={10} /> Hover to zoom
        </span>
      </div>
    </div>
  );
};
