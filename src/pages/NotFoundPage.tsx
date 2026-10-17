import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="w-20 h-20 rounded-3xl bg-aura-50 dark:bg-aura-950 text-aura-600 flex items-center justify-center mx-auto mb-4">
        <Compass size={40} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
        Looking for Something?
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
        We're sorry. The Web address you entered is not a functioning page on our site.
      </p>
      <div className="pt-4 flex justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition"
        >
          Go to Aura's Home Page
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
        >
          Browse Catalogue
        </Link>
      </div>
    </div>
  );
};
