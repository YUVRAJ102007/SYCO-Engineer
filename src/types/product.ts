export type ProductCategory =
  | 'Electronics'
  | 'Fashion'
  | 'Home & Kitchen'
  | 'Beauty & Personal Care'
  | 'Books'
  | 'Sports & Fitness'
  | 'Toys & Games'
  | 'Grocery & Daily Essentials';

export interface ProductSpecification {
  name: string;
  value: string;
  highlight?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Space Gray / 512GB"
  label: string;
  priceModifier?: number; // change relative to base price
  inStock: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number; // In INR
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isDealOfTheDay?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  primeDelivery: boolean; // Fast free delivery badge
  images: string[];
  thumbnail: string;
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  frequentlyBoughtTogetherIds?: string[];
  tags: string[];
  dealEndTime?: string; // ISO string for flash deals countdown
}

export interface ProductFilterState {
  searchQuery: string;
  category: string;
  subcategories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
  fastDeliveryOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'discount-desc' | 'newest';
}
