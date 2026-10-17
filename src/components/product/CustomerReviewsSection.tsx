import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, PlusCircle, X, Sparkles } from 'lucide-react';
import { Product, CustomerReview } from '../../types/product';
import { SAMPLE_REVIEWS } from '../../data/products';
import { StarRating } from '../common/StarRating';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface CustomerReviewsSectionProps {
  product: Product;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ product }) => {
  const { currentUser } = useAuth();
  const { success } = useNotification();

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    return SAMPLE_REVIEWS[product.id] || [
      {
        id: 'rev-default-1',
        author: 'Arun V.',
        rating: 5,
        title: 'Outstanding quality and premium packaging',
        comment: 'Exceeded my expectations! Build quality is remarkably sturdy and performs exactly as specified.',
        date: '5 days ago',
        verifiedPurchase: true,
        helpfulCount: 16,
      },
      {
        id: 'rev-default-2',
        author: 'Kavita Menon',
        rating: 4,
        title: 'Great product, prompt delivery',
        comment: 'Received within 24 hours via Express Delivery. Packaging was immaculate.',
        date: '2 weeks ago',
        verifiedPurchase: true,
        helpfulCount: 9,
      },
    ];
  });

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const handleHelpfulClick = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    success('Thank You', 'Marked review as helpful.');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatarUrl,
      rating: newRating,
      title: newTitle.trim(),
      comment: newComment.trim(),
      date: 'Just now',
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setIsWriteModalOpen(false);
    setNewTitle('');
    setNewComment('');
    setNewRating(5);
    success('Review Submitted', 'Your review is now live on this product.');
  };

  // Distribution calculations
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
    return { stars, count, percentage };
  });

  const displayedReviews = filterRating
    ? reviews.filter((r) => Math.round(r.rating) === filterRating)
    : reviews;

  return (
    <section className="my-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Overall Rating & Histogram */}
        <div className="w-full md:w-80 shrink-0 space-y-5">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Customer Reviews
            </h3>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {product.rating.toFixed(1)}
              </span>
              <div>
                <StarRating rating={product.rating} showCount={false} size="md" />
                <span className="text-xs text-slate-500 mt-0.5 block">
                  {reviews.length} total customer ratings
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="space-y-2 pt-2">
            {distribution.map(({ stars, percentage, count }) => (
              <button
                key={stars}
                onClick={() => setFilterRating(filterRating === stars ? null : stars)}
                className={`w-full flex items-center gap-2 text-xs group text-left ${
                  filterRating === stars ? 'font-bold text-aura-600' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="w-12 shrink-0">{stars} star</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400">{percentage}%</span>
              </button>
            ))}
            {filterRating && (
              <button
                onClick={() => setFilterRating(null)}
                className="text-xs text-aura-600 dark:text-aura-400 underline font-semibold mt-1"
              >
                Clear rating filter
              </button>
            )}
          </div>

          {/* Write a review button */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Review this product
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Share your thoughts and feedback with the community
            </p>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs rounded-xl text-slate-800 dark:text-slate-200 transition flex items-center justify-center gap-2"
            >
              <PlusCircle size={16} />
              <span>Write a Customer Review</span>
            </button>
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {displayedReviews.length} {displayedReviews.length === 1 ? 'Review' : 'Reviews'} Displayed
            </span>
            <span className="text-[11px] text-slate-400">
              Label: Verified prototype demonstration data
            </span>
          </div>

          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {rev.author}
                    </span>
                    {rev.verifiedPurchase && (
                      <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                        <CheckCircle size={10} /> Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                    />
                  ))}
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {rev.title}
                </h5>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {rev.comment}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium"
                >
                  <ThumbsUp size={12} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a review modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Create Review
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="p-6 space-y-4">
              {/* Star Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Overall Rating
                </label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        size={28}
                        className={star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's the most important thing to know?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aura-500"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Written Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What did you like or dislike? How does it perform?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aura-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
