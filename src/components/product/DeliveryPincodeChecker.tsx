import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { getEstimatedDeliveryDate } from '../../utils/formatters';

interface DeliveryPincodeCheckerProps {
  primeEligible?: boolean;
}

export const DeliveryPincodeChecker: React.FC<DeliveryPincodeCheckerProps> = ({
  primeEligible = true,
}) => {
  const { location, updatePincode } = useLocation();
  const [inputCode, setInputCode] = useState(location.pincode);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = updatePincode(inputCode);
    setFeedback(result);
  };

  const deliveryEst = getEstimatedDeliveryDate(primeEligible ? 1 : 3);

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Truck size={15} className="text-aura-600" />
          <span>Delivery Options & Pincode Checker</span>
        </span>
        {primeEligible && (
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
            Express Eligible
          </span>
        )}
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            maxLength={6}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit PIN code"
            className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aura-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition shadow-xs"
        >
          Check
        </button>
      </form>

      {feedback && (
        <div
          className={`flex items-start gap-1.5 text-xs font-medium ${
            feedback.success ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Delivery Highlights */}
      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
        <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
          <span>Delivery to:</span>
          <strong className="text-slate-900 dark:text-white">
            {location.city} ({location.pincode})
          </strong>
        </div>
        <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
          <span>Estimated arrival:</span>
          <strong className="text-emerald-600 dark:text-emerald-400">
            {deliveryEst} (by 2:00 PM)
          </strong>
        </div>
        <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
          <span>Shipping fee:</span>
          <strong className="text-slate-900 dark:text-white">
            FREE on orders over ₹999
          </strong>
        </div>
      </div>
    </div>
  );
};
