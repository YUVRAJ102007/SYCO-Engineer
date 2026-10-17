# AURA | Next-Generation E-Commerce Marketplace
> **A Competition-Grade, Amazon-Inspired Commercial Marketplace Architecture**  
> Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

![Aura Marketplace Brand](public/favicon.svg)

---

## 🌟 Executive Summary

**AURA** is a full-featured commercial e-commerce marketplace crafted for competitive web development excellence. Rather than presenting a generic static template or basic clone, AURA provides an original brand identity, a complete customer shopping journey, realistic product datasets across 8 major departments, and five signature customer-centric innovations.

---

## 🚀 Key Signature Innovations

### 1. Smart Shopping Assistant (AI Concierge v1.0)
* **Natural Requirement Parsing**: Understands queries such as:  
  `"I need a laptop under ₹60,000 for programming, machine learning, and gaming."`
* **Multi-Factor Extraction**: Automatically extracts category constraints (`laptop`), budget bounds (`₹60,000`), feature keywords (`programming`, `machine learning`, `gaming`), and brand affinities.
* **Transparent Spec Rationale**: Provides structured reasoning bullets explaining why each recommendation was selected (e.g. NVIDIA RTX 4050 6GB GDDR6 Tensor Cores for ML compilation, 16GB DDR5 RAM, ₹58,990 price point).
* **Direct Interactive Cards**: Add to cart, view specs, or compare side-by-side directly inside the assistant modal.
* **Modular Architecture**: Rule-based catalogue evaluation engine cleanly separated in `src/utils/nlpMatcher.ts`—ready for drop-in LLM API integration.

### 2. Side-by-Side Product Comparison Matrix
* Compare up to 4 products concurrently.
* **Dynamic Spec Matrix**: Automatically groups and compares technical specifications (Processor, RAM, Storage, Graphics, Display, Battery, Warranty).
* **Highlight Differences**: Toggle to immediately spotlight divergent attributes across products.
* **Automated Spec Verdict**: Algorithmically identifies the **"Best Value Pick"** (rating-to-price ratio) and highest performance models with one-click cart addition.

### 3. Smart Deal Finder & Budget Matrix
* Dedicated discovery portal at `/deals`.
* **Configurable Budget Discovery**: Quick presets for *Under ₹1,000*, *Under ₹5,000*, *Under ₹10,000*, *Under ₹25,000*, and *Under ₹60,000*.
* **Real-time Savings Calculator**: Shows collective catalogue savings in real time.
* **Live Flash Deals Countdown**: High-intensity flash sales featuring ticking second-by-second countdown clocks.

### 4. Interactive Order Tracking Dashboard & Timeline Simulator
* Full 6-stage delivery progression:  
  `Order Placed` ➔ `Order Confirmed` ➔ `Packed in Hub` ➔ `Dispatched in Transit` ➔ `Out for Delivery` ➔ `Delivered Successfully`.
* **Simulation Controller**: Includes an interactive **"Simulate Next Delivery Stage"** button designed for live competition demonstrations and judge evaluation.
* Complete order audit logs with timestamps, delivery address details, and simulated PDF invoice downloads.

### 5. Multi-Step Checkout & Coupon Engine
* Stepped workflow: Customer Information ➔ Delivery Address ➔ Shipping Speed (Prime Express vs Standard) ➔ Payment Simulator (UPI QR, Card, NetBanking, COD).
* Coupon system supporting valid codes:
  * `WELCOME10` — 10% instant discount (orders > ₹999)
  * `AURA500` — Flat ₹500 off (orders > ₹2,499)
  * `FESTIVE20` — 20% discount (orders > ₹4,999)
  * `STUDENT5` — 5% extra discount for students and developers

---

## 🏬 Product Departments Covered

1. **Electronics**: AI laptops, ultrabooks, 45dB hybrid ANC headphones, 120Hz OLED smartphones, AMOLED smartwatches, 4K creator monitors, mechanical keyboards.
2. **Fashion & Apparel**: Tailored Italian wool blazers, carbon-plate running shoes, 240 GSM Supima cotton tees, waxed leather travel duffles.
3. **Home & Kitchen**: 15-Bar Ulka pump espresso machines, Scandinavian smart floor lamps, medical-grade H14 True HEPA air purifiers.
4. **Beauty & Personal Care**: 15% Vitamin C + Hyaluronic Acid radiance serums, Australian Sandalwood extrait de parfum.
5. **Books & Literature**: Software engineering masterworks (*Designing Data-Intensive Applications*), personal productivity (*Atomic Habits*).
6. **Sports & Fitness**: Magnetic studio spin bikes, eco-friendly TPE dual-texture yoga mats.
7. **Toys & Games**: Programmable STEM robotics kits (Python/Scratch), deep-space strategy board games.
8. **Grocery & Gourmet**: Single-origin Arabica artisan roast coffee, Kashmiri Mamra almonds & walnuts.

---

## 🛠️ Technical Stack & Architecture

* **Framework**: React 18 with TypeScript
* **Build Tool**: Vite 5 (Sub-second HMR & 3-second production bundles)
* **Styling**: Tailwind CSS with custom slate palette, dark mode classes, and keyframe animations
* **Routing**: React Router v6 (`/`, `/products`, `/product/:id`, `/deals`, `/compare`, `/cart`, `/checkout`, `/order-confirmation/:id`, `/orders`, `/orders/:id`, `/wishlist`, `/account`, `/assistant`)
* **State Management**: React Context architecture with safe `localStorage` persistence:
  * `CartContext`: Live items counter, price calculations, GST tax, coupons, saved-for-later.
  * `WishlistContext`: Wishlist toggles and move-to-cart operations.
  * `ComparisonContext`: Concurrent comparison tray and dynamic matrix generator.
  * `LocationContext`: Real-time Indian PIN code validator with city lookup.
  * `RecentlyViewedContext`: Automatic browsing history tracker.
  * `NotificationContext`: Non-blocking floating toast notification stack.
  * `AuthContext`: Multi-persona demo switcher and simulated order progression.
* **Icons**: Lucide React

---

## 🧑‍💻 Evaluation Personas

To test personalized interactions quickly during judging, click the **"Demo Persona"** button in the top navigation bar or the Account page to toggle between:

1. **Alex Morgan**: Senior Software Engineer (Interested in high-spec ML hardware, ANC headphones, programming books).
2. **Priya Sharma**: Architect & Interior Designer (Interested in espresso machines, minimalist lighting, organic gourmet).

---

## ⚡ Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License & Attribution

Designed and developed for the Web Development Competition Challenge. Sourced product imagery curated from Unsplash. All mock data and simulated payment gateways are isolated to frontend state.
