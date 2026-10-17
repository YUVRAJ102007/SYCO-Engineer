import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

// Context Providers
import { NotificationProvider } from './context/NotificationContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { CartProvider } from './context/CartContext';

// Layout & Common Components
import { Header } from './components/layout/Header';
import { CategoryNavbar } from './components/layout/CategoryNavbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';
import { FloatingCompareBar } from './components/compare/FloatingCompareBar';
import { SmartShoppingAssistantModal } from './components/assistant/SmartShoppingAssistantModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DealsPage } from './pages/DealsPage';
import { ComparePage } from './pages/ComparePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AssistantPage } from './pages/AssistantPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppLayout: React.FC = () => {
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const location = useLocation();

  const isCheckoutOrConfirmation =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/order-confirmation');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 lg:pb-0">
      {/* Header and Category Navigation */}
      <Header />
      {!isCheckoutOrConfirmation && <CategoryNavbar />}

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isCheckoutOrConfirmation && <Footer />}

      {/* Global Interactive Overlays */}
      <ToastContainer />
      <CartDrawer />
      <FloatingCompareBar />
      <MobileBottomNav />

      {/* Global Floating AI Shopping Assistant Trigger */}
      {location.pathname !== '/assistant' && (
        <button
          onClick={() => setIsAssistantModalOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-aura-600 to-cyan-500 text-white font-extrabold text-xs sm:text-sm shadow-glow hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Open AI Shopping Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Sparkles size={16} className="text-cyan-200" />
          <span className="hidden sm:inline">Ask Zenvora Assistant</span>
        </button>
      )}

      {/* Floating Assistant Modal */}
      <SmartShoppingAssistantModal
        isOpen={isAssistantModalOpen}
        onClose={() => setIsAssistantModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <NotificationProvider>
        <LocationProvider>
          <AuthProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <RecentlyViewedProvider>
                  <CartProvider>
                    <AppLayout />
                  </CartProvider>
                </RecentlyViewedProvider>
              </ComparisonProvider>
            </WishlistProvider>
          </AuthProvider>
        </LocationProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
