import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { useNotification } from './NotificationContext';

interface ComparisonContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isCompareDrawerOpen: boolean;
  setIsCompareDrawerOpen: (open: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>(() => {
    return loadFromStorage<Product[]>('aura_compare_items', []);
  });
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const { success, warning, info } = useNotification();

  useEffect(() => {
    saveToStorage('aura_compare_items', compareItems);
  }, [compareItems]);

  const isInCompare = (productId: string) => {
    return compareItems.some((p) => p.id === productId);
  };

  const addToCompare = (product: Product): boolean => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      return false;
    }

    if (compareItems.length >= 4) {
      warning('Comparison Limit Reached', 'You can compare up to 4 products at once.');
      return false;
    }

    // Check if category is compatible (warn if comparing vastly different categories)
    if (compareItems.length > 0 && compareItems[0].category !== product.category) {
      info(
        'Different Categories',
        `Comparing ${product.category} with ${compareItems[0].category}. Common specs will be aligned.`
      );
    }

    setCompareItems((prev) => [...prev, product]);
    success('Added to Comparison', `${product.title.slice(0, 30)}... added.`);
    setIsCompareDrawerOpen(true);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId));
    info('Removed from Comparison');
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareDrawerOpen(false);
  };

  return (
    <ComparisonContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export function useComparison(): ComparisonContextType {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
