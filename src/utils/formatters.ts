export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function calculateSavings(original: number, current: number): { amount: number; percentage: number } {
  const amount = Math.max(0, original - current);
  const percentage = original > 0 ? Math.round((amount / original) * 100) : 0;
  return { amount, percentage };
}

export function getEstimatedDeliveryDate(daysToAdd: number = 2): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
