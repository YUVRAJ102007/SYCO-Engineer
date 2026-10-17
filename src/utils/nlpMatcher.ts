import { Product } from '../types/product';
import { ExtractedQueryIntent } from '../types/assistant';

export function parseUserQuery(query: string): ExtractedQueryIntent {
  const normalized = query.toLowerCase();

  // 1. Extract Budget
  let maxBudget: number | undefined = undefined;
  let minBudget: number | undefined = undefined;

  // Match patterns like "under 60,000", "under 60k", "below ₹60000", "< 60000", "budget 60000"
  const underMatch = normalized.match(/(?:under|below|less than|within|max|budget of?|<|up to|around)\s*(?:rs\.?|inr|₹)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(k|lakh|lac)?/i);
  if (underMatch) {
    let numStr = underMatch[1].replace(/,/g, '');
    let val = parseFloat(numStr);
    const unit = underMatch[2]?.toLowerCase();
    if (unit === 'k') val *= 1000;
    if (unit === 'lakh' || unit === 'lac') val *= 100000;
    maxBudget = val;
  }

  // Match patterns like "between 20000 and 50000"
  const betweenMatch = normalized.match(/(?:between|from)\s*(?:rs\.?|inr|₹)?\s*(\d+(?:,\d+)?)\s*(k)?\s*(?:and|to|-)\s*(?:rs\.?|inr|₹)?\s*(\d+(?:,\d+)?)\s*(k)?/i);
  if (betweenMatch) {
    let minVal = parseFloat(betweenMatch[1].replace(/,/g, ''));
    if (betweenMatch[2]?.toLowerCase() === 'k') minVal *= 1000;
    let maxVal = parseFloat(betweenMatch[3].replace(/,/g, ''));
    if (betweenMatch[4]?.toLowerCase() === 'k') maxVal *= 1000;
    minBudget = minVal;
    maxBudget = maxVal;
  }

  // 2. Identify Category
  let category: string | undefined = undefined;
  if (/laptop|notebook|ultrabook|macbook|thinkpad/i.test(normalized)) category = 'laptop';
  else if (/phone|smartphone|mobile|android|iphone/i.test(normalized)) category = 'smartphone';
  else if (/headphone|earphone|earbuds|audio|anc|sound/i.test(normalized)) category = 'audio';
  else if (/watch|smartwatch|fitness tracker|band/i.test(normalized)) category = 'watch';
  else if (/shoe|sneaker|footwear|running/i.test(normalized)) category = 'footwear';
  else if (/coffee|espresso|brew/i.test(normalized)) category = 'coffee';
  else if (/book|reading|literature/i.test(normalized)) category = 'books';
  else if (/lamp|light|decor|lighting/i.test(normalized)) category = 'lighting';
  else if (/purifier|air purifier|hepa/i.test(normalized)) category = 'air purifier';
  else if (/robot|stem|toy|game|board game/i.test(normalized)) category = 'toys';
  else if (/blazer|suit|shirt|tshirt|clothing|apparel/i.test(normalized)) category = 'clothing';
  else if (/yoga|mat|exercise|cycling|gym/i.test(normalized)) category = 'fitness';
  else if (/serum|skincare|perfume|beauty/i.test(normalized)) category = 'beauty';

  // 3. Extract Features and Keyword Tags
  const featureKeywords = [
    'programming', 'coding', 'developer', 'python', 'java', 'web dev',
    'machine learning', 'deep learning', 'ml', 'ai', 'data science',
    'gaming', 'game', 'rtx', 'gpu', 'graphics',
    'battery', 'long battery', 'portable', 'lightweight', 'compact',
    'oled', 'display', 'screen', '4k', '144hz', 'refresh rate',
    'camera', '50mp', 'ois', 'photo',
    'noise cancelling', 'anc', 'wireless', 'bluetooth',
    'leather', 'cotton', 'merino', 'formal',
    'espresso', 'crema', 'barista',
    'gps', 'amoled', 'waterproof'
  ];

  const foundFeatures: string[] = [];
  featureKeywords.forEach(kw => {
    if (normalized.includes(kw)) {
      foundFeatures.push(kw);
    }
  });

  // Extract Brand Mentions
  const brandKeywords = ['nexus', 'zenvora', 'aura', 'soundpulse', 'zenith', 'lumina', 'veloce', 'aerofit', 'omnibrew', 'dermaglow'];
  const foundBrands: string[] = [];
  brandKeywords.forEach(b => {
    if (normalized.includes(b)) foundBrands.push(b);
  });

  return {
    rawQuery: query,
    category,
    maxBudget,
    minBudget,
    features: foundFeatures,
    brands: foundBrands,
    keywords: normalized.split(/\s+/).filter(w => w.length > 2)
  };
}

export interface MatchResult {
  product: Product;
  matchScore: number;
  matchReasons: string[];
}

export function findMatchingProducts(
  query: string,
  allProducts: Product[],
  limit: number = 3
): { matches: MatchResult[]; intent: ExtractedQueryIntent } {
  const intent = parseUserQuery(query);
  const results: MatchResult[] = [];

  for (const product of allProducts) {
    let score = 0;
    const reasons: string[] = [];

    // Category match
    if (intent.category) {
      const pTitle = product.title.toLowerCase();
      const pSub = product.subcategory.toLowerCase();
      const pCat = product.category.toLowerCase();
      const pTags = product.tags.join(' ').toLowerCase();

      if (pSub === intent.category || (intent.category === 'laptop' && pSub === 'laptops')) {
        score += 50;
        reasons.push(`Category: Verified "${product.subcategory}"`);
      } else if (pTitle.includes(intent.category) || pTags.includes(intent.category)) {
        if (intent.category === 'laptop' && (pSub.includes('bag') || product.category === 'Fashion')) {
          score -= 40; // Penalize bags/backpacks when searching for computer hardware
        } else {
          score += 25;
          reasons.push(`Category: Relevant to "${intent.category}"`);
        }
      }
    }

    // Budget match
    if (intent.maxBudget !== undefined) {
      if (product.price <= intent.maxBudget) {
        score += 30;
        reasons.push(`Budget: ₹${product.price.toLocaleString('en-IN')} fits comfortably inside your ₹${intent.maxBudget.toLocaleString('en-IN')} budget`);
      } else if (product.price <= intent.maxBudget * 1.15) {
        // Slightly over budget
        score += 10;
        reasons.push(`Budget note: Slightly above budget (₹${product.price.toLocaleString('en-IN')}) with superior specs`);
      } else {
        score -= 50; // heavily penalize exceeding budget
      }
    }

    if (intent.minBudget !== undefined && product.price >= intent.minBudget) {
      score += 10;
    }

    // Feature keyword matches
    intent.features.forEach(feat => {
      const textToSearch = (product.title + ' ' + product.description + ' ' + product.features.join(' ') + ' ' + product.tags.join(' ')).toLowerCase();
      if (textToSearch.includes(feat)) {
        score += 15;
        // Find specific highlight if possible
        const matchingSpec = product.specifications.find(s => s.name.toLowerCase().includes(feat) || s.value.toLowerCase().includes(feat));
        if (matchingSpec) {
          reasons.push(`${matchingSpec.name}: ${matchingSpec.value} supports your ${feat} requirements`);
        } else {
          reasons.push(`Optimized for ${feat}`);
        }
      }
    });

    // Rating & Best Seller bonus
    if (product.rating >= 4.5) score += 5;
    if (product.isBestSeller) score += 5;

    // Direct brand match
    intent.brands.forEach(b => {
      if (product.brand.toLowerCase().includes(b)) {
        score += 20;
        reasons.push(`Brand: By official ${product.brand}`);
      }
    });

    // Fallback general keyword search if score is still 0
    if (score === 0) {
      intent.keywords.forEach(kw => {
        if (product.title.toLowerCase().includes(kw) || product.tags.includes(kw)) {
          score += 8;
        }
      });
    }

    if (score > 15) {
      results.push({
        product,
        matchScore: score,
        matchReasons: reasons.slice(0, 4) // top 4 distinct reasons
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.matchScore - a.matchScore);

  return {
    matches: results.slice(0, limit),
    intent
  };
}
