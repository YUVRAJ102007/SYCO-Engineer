import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, Truck, RefreshCw, Headphones, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-16">
      {/* Back to top banner */}
      <button
        onClick={scrollToTop}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-center flex items-center justify-center gap-1.5 transition border-b border-slate-800"
      >
        <ArrowUp size={15} />
        <span>Back to top</span>
      </button>

      {/* Trust & Benefits Highlights */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-full bg-aura-500/10 text-aura-400 mb-2">
              <Truck size={22} />
            </div>
            <h5 className="font-bold text-slate-200 text-sm">Free Express Delivery</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">On all eligible orders above ₹999</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
              <ShieldCheck size={22} />
            </div>
            <h5 className="font-bold text-slate-200 text-sm">100% Authentic Guarantee</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct from verified brand partners</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-full bg-cyan-500/10 text-cyan-400 mb-2">
              <RefreshCw size={22} />
            </div>
            <h5 className="font-bold text-slate-200 text-sm">7-Day Easy Returns</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Hassle-free doorstep pickup & refund</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-400 mb-2">
              <Headphones size={22} />
            </div>
            <h5 className="font-bold text-slate-200 text-sm">24/7 Smart Assistance</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">AI concierge & customer support</p>
          </div>
        </div>
      </div>

      {/* Main 4-column footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Get to Know Us</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white transition">About Zenvora Marketplace</Link></li>
            <li><Link to="/careers" className="hover:text-white transition">Careers & Engineering</Link></li>
            <li><Link to="/press" className="hover:text-white transition">Press Releases</Link></li>
            <li><Link to="/science" className="hover:text-white transition">Zenvora AI & Science</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Connect With Us</h4>
          <ul className="space-y-2">
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Twitter / X (@ZenvoraMarket)</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram (@zenvoracommerce)</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Developer API & Docs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Make Money with Us</h4>
          <ul className="space-y-2">
            <li><Link to="/sell" className="hover:text-white transition">Sell on Zenvora</Link></li>
            <li><Link to="/brand-protection" className="hover:text-white transition">Brand Protection</Link></li>
            <li><Link to="/fulfillment" className="hover:text-white transition">Fulfillment by Zenvora (FBZ)</Link></li>
            <li><Link to="/affiliate" className="hover:text-white transition">Affiliate & Partner Program</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Let Us Help You</h4>
          <ul className="space-y-2">
            <li><Link to="/account" className="hover:text-white transition">Your Account & Settings</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Returns Centre & Tracking</Link></li>
            <li><Link to="/compare" className="hover:text-white transition">Product Comparison Matrix</Link></li>
            <li><Link to="/assistant" className="hover:text-white transition">Smart Shopping Assistant</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 bg-slate-950 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-aura-600 flex items-center justify-center text-white font-bold text-xs">
              Z
            </div>
            <span className="font-bold text-slate-300">ZENVORA MARKETPLACE</span>
            <span>© 2026 Zenvora Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Conditions of Use</span>
            <span>Privacy Notice</span>
            <span>Interest-Based Ads</span>
            <span className="text-aura-400 font-semibold">Web Development Competition Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
