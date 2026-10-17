import React, { useState } from 'react';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, X, Check, Navigation } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const { location, updatePincode, isModalOpen, setIsModalOpen } = useLocation();
  const { currentUser } = useAuth();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = updatePincode(pinInput);
    if (res.success) {
      setIsModalOpen(false);
      setPinInput('');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleSelectSaved = (pincode: string) => {
    updatePincode(pincode);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-aura-50 dark:bg-aura-950 text-aura-600 rounded-lg">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Choose Delivery Location</h3>
              <p className="text-xs text-slate-500">Delivery speeds & availability may vary by location</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Current Selection */}
          <div className="p-3 bg-aura-50/70 dark:bg-aura-950/40 border border-aura-200 dark:border-aura-900 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-aura-600 dark:text-aura-400 tracking-wider">Current Location</span>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">
                {location.city}, {location.state} - {location.pincode}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <Check size={12} /> Active
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Enter an Indian Delivery PIN Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 560038 or 400001"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aura-500 font-mono tracking-wider"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-aura-600 hover:bg-aura-700 text-white font-semibold text-sm rounded-xl transition shadow-sm hover:shadow"
              >
                Apply
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>}
          </form>

          {/* Saved Addresses List */}
          {currentUser.savedAddresses.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Or Select from Saved Addresses
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentUser.savedAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => handleSelectSaved(addr.pincode)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-aura-400 dark:hover:border-aura-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition flex items-start justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white text-sm">{addr.name}</span>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {addr.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {addr.addressLine1}, {addr.city} - {addr.pincode}
                      </p>
                    </div>
                    <Navigation size={16} className="text-slate-400 group-hover:text-aura-600 shrink-0 mt-1 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
