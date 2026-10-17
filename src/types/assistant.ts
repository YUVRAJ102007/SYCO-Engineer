import { Product } from './product';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  recommendations?: {
    product: Product;
    matchScore: number;
    matchReasons: string[];
  }[];
  suggestedFollowUps?: string[];
}

export interface ExtractedQueryIntent {
  rawQuery: string;
  category?: string;
  maxBudget?: number;
  minBudget?: number;
  features: string[];
  brands: string[];
  keywords: string[];
}
