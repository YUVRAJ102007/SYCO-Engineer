import React, { useState } from 'react';
import { HeroBannerSlider } from '../components/home/HeroBannerSlider';
import { CategoryCardGrid } from '../components/home/CategoryCardGrid';
import { FlashDealsRow } from '../components/home/FlashDealsRow';
import { BestSellersTabbed } from '../components/home/BestSellersTabbed';
import { BudgetPillsSection } from '../components/home/BudgetPillsSection';
import { AIAssistantTeaser } from '../components/home/AIAssistantTeaser';
import { RecentlyViewedRow } from '../components/home/RecentlyViewedRow';
import { SmartShoppingAssistantModal } from '../components/assistant/SmartShoppingAssistantModal';

export const HomePage: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Showcase Slider */}
      <HeroBannerSlider />

      {/* Visual Department Cards */}
      <CategoryCardGrid />

      {/* Today's Flash Deals with live countdown */}
      <FlashDealsRow />

      {/* Best Sellers Tabbed Carousel */}
      <BestSellersTabbed />

      {/* AI Assistant Teaser Banner */}
      <AIAssistantTeaser onOpenAssistant={() => setIsAssistantOpen(true)} />

      {/* Shop by Budget Discovery */}
      <BudgetPillsSection />

      {/* Dynamic Browsing Activity / Trending */}
      <RecentlyViewedRow />

      {/* Assistant Modal */}
      <SmartShoppingAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};
