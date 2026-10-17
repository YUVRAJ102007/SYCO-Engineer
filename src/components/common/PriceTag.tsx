import React from 'react';
import { formatCurrency, calculateSavings } from '../../utils/formatters';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSavings?: boolean;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  discountPercentage,
  size = 'md',
  showSavings = false,
}) => {
  const savings = originalPrice && originalPrice > price ? calculateSavings(originalPrice, price) : null;
  const discount = discountPercentage || (savings ? savings.percentage : 0);

  const priceClasses = {
    sm: 'text-sm font-bold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-extrabold tracking-tight',
  }[size];

  const originalClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  }[size];

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`${priceClasses} text-slate-900 dark:text-white`}>
          {formatCurrency(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <>
            <span className={`${originalClasses} text-slate-400 line-through font-normal`}>
              {formatCurrency(originalPrice)}
            </span>
            {discount > 0 && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                {discount}% OFF
              </span>
            )}
          </>
        )}
      </div>

      {showSavings && savings && savings.amount > 0 && (
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
          You save {formatCurrency(savings.amount)} ({discount}%)
        </span>
      )}
    </div>
  );
};
