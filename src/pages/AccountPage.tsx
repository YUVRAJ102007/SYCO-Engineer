import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  MapPin,
  Package,
  Heart,
  SlidersHorizontal,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Shield,
  Bell,
  LogOut,
  Edit2,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Address } from '../types/order';
import { PersonaSwitcherModal } from '../components/common/PersonaSwitcherModal';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    isAuthenticated,
    logout,
    login,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'preferences'>('profile');
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);

  // New address form state
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrType, setAddrType] = useState<'home' | 'work' | 'other'>('home');

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrName || !addrPhone || !addrLine1 || !addrCity || !addrPincode) return;

    addAddress({
      name: addrName,
      phone: addrPhone,
      addressLine1: addrLine1,
      addressLine2: addrLine2,
      city: addrCity,
      state: addrState || 'India',
      pincode: addrPincode,
      type: addrType,
      isDefault: currentUser.savedAddresses.length === 0,
    });

    setIsAddAddressModalOpen(false);
    setAddrName('');
    setAddrPhone('');
    setAddrLine1('');
    setAddrLine2('');
    setAddrCity('');
    setAddrState('');
    setAddrPincode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Account Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-aura-500/20 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentUser.name}
              </h1>
              {currentUser.primeMember && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                  Prime Member
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">{currentUser.email}</p>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.phone}</p>
          </div>
        </div>

        {/* Quick Demo Switcher CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPersonaModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs rounded-xl hover:bg-indigo-100 transition flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles size={14} />
            <span>Switch Demo Persona</span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={login}
              className="px-5 py-2.5 bg-aura-600 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold">
        {[
          { id: 'profile', label: 'Dashboard & Shortcuts', icon: <User size={15} /> },
          { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={15} /> },
          { id: 'preferences', label: 'Preferences & Security', icon: <Shield size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-5 border-b-2 flex items-center gap-2 transition ${
              activeTab === tab.id
                ? 'border-aura-600 text-aura-600 dark:text-aura-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab: Dashboard & Shortcuts */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              to="/orders"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-aura-400 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Package size={24} />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Your Orders & Tracking
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Track shipments, view detailed history, and download tax invoices.
              </p>
            </Link>

            <Link
              to="/wishlist"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-aura-400 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <Heart size={24} />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Saved Wishlist
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                View saved gadgets, monitor prices, and move items to cart.
              </p>
            </Link>

            <Link
              to="/compare"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-aura-400 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <SlidersHorizontal size={24} />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Product Comparison
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Side-by-side spec comparison table with difference highlighting.
              </p>
            </Link>
          </div>
        </div>
      )}

      {/* Tab: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Address Book ({currentUser.savedAddresses.length})
            </h3>
            <button
              onClick={() => setIsAddAddressModalOpen(true)}
              className="px-4 py-2 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentUser.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {addr.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <p>{addr.addressLine1}</p>
                    {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                    <p>
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-slate-400 pt-1">Phone: {addr.phone}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                  {!addr.isDefault ? (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-aura-600 hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-slate-400">Default Delivery Address</span>
                  )}

                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Preferences & Security */}
      {activeTab === 'preferences' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl space-y-6">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Security & Communication Preferences
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-850">
              <div>
                <strong className="text-slate-900 dark:text-white block font-bold">
                  Order Status Notifications
                </strong>
                <span className="text-slate-500">
                  Receive SMS & WhatsApp dispatch updates on shipment status.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-aura-600" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-850">
              <div>
                <strong className="text-slate-900 dark:text-white block font-bold">
                  Lightning Deal Alerts
                </strong>
                <span className="text-slate-500">
                  Notify me when items in my wishlist get price cuts or coupons.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-aura-600" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-850">
              <div>
                <strong className="text-slate-900 dark:text-white block font-bold">
                  Two-Factor Authentication (Simulated)
                </strong>
                <span className="text-slate-500">
                  Require OTP verification when placing orders above ₹10,000.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-aura-600" />
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {isAddAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Add New Delivery Address
              </h3>
              <button
                onClick={() => setIsAddAddressModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={addrName}
                    onChange={(e) => setAddrName(e.target.value)}
                    placeholder="Recipient name"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={addrPhone}
                    onChange={(e) => setAddrPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Flat, House no., Building, Street</label>
                <input
                  type="text"
                  required
                  value={addrLine1}
                  onChange={(e) => setAddrLine1(e.target.value)}
                  placeholder="Street & area"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value)}
                    placeholder="6 digits"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAddressModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-500 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-aura-600 text-white font-bold rounded-xl shadow"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Persona Switcher Modal */}
      <PersonaSwitcherModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
      />
    </div>
  );
};
