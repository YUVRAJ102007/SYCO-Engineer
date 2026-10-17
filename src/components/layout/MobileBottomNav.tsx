import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Zap, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { summary, setIsCartDrawerOpen } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-400 py-2 px-4 shadow-xl">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
              isActive ? 'text-aura-400' : 'hover:text-slate-200'
            }`
          }
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
              isActive ? 'text-aura-400' : 'hover:text-slate-200'
            }`
          }
        >
          <Search size={18} />
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/deals"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
              isActive ? 'text-amber-400' : 'hover:text-amber-300'
            }`
          }
        >
          <Zap size={18} />
          <span>Deals</span>
        </NavLink>

        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-white transition"
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingCart size={18} />
            {summary.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-aura-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {summary.itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
              isActive ? 'text-aura-400' : 'hover:text-slate-200'
            }`
          }
        >
          <User size={18} />
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  );
};
