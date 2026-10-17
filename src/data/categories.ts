import { ProductCategory } from '../types/product';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  subcategories: string[];
  image: string;
  iconName: string;
  startingPrice: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Laptops, Smart TVs, Audio, Gaming & Smart Devices',
    subcategories: ['Laptops', 'Audio & Headphones', 'Smartphones', 'Smartwatches', 'Cameras', 'Monitors & Displays', 'Accessories'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    iconName: 'Laptop',
    startingPrice: 1499,
  },
  {
    id: 'Fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    description: 'Trendsetting Menswear, Womenswear, Footwear & Bags',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Footwear', 'Watches & Accessories', 'Bags & Backpacks'],
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    iconName: 'Shirt',
    startingPrice: 499,
  },
  {
    id: 'Home & Kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Smart Kitchenware, Furniture, Decor & Home Automation',
    subcategories: ['Coffee Makers', 'Cookware & Utensils', 'Furniture', 'Lighting & Lamps', 'Home Decor', 'Air Purifiers'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    iconName: 'Home',
    startingPrice: 699,
  },
  {
    id: 'Beauty & Personal Care',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Dermatological Skincare, Fragrances, Hair & Grooming',
    subcategories: ['Skincare Serums', 'Perfumes & Fragrances', 'Hair Care', 'Men\'s Grooming', 'Oral Care'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkles',
    startingPrice: 349,
  },
  {
    id: 'Books',
    name: 'Books & Literature',
    slug: 'books',
    description: 'Programming, Tech, Fiction, Business & Biographies',
    subcategories: ['Technology & Coding', 'Business & Finance', 'Science Fiction', 'Self Improvement', 'Biographies'],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    iconName: 'BookOpen',
    startingPrice: 299,
  },
  {
    id: 'Sports & Fitness',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Gym Gear, Smart Trackers, Yoga Mats & Outdoor Sports',
    subcategories: ['Running & Training Shoes', 'Gym Accessories', 'Yoga Mats', 'Cardio Equipment', 'Activewear'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    iconName: 'Dumbbell',
    startingPrice: 599,
  },
  {
    id: 'Toys & Games',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Educational STEM Kits, Board Games & Collectibles',
    subcategories: ['Robotics & STEM', 'Board Games', 'Action Figures', 'Puzzles', 'Outdoor Toys'],
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    iconName: 'Gamepad2',
    startingPrice: 449,
  },
  {
    id: 'Grocery & Daily Essentials',
    name: 'Grocery & Gourmet',
    slug: 'grocery',
    description: 'Artisanal Coffee, Organic Superfoods & Pantry Staples',
    subcategories: ['Artisan Coffee & Tea', 'Nuts & Superfoods', 'Organic Staples', 'Beverages', 'Snacks'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Apple',
    startingPrice: 199,
  },
];
