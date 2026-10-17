import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, X, Sparkles } from 'lucide-react';

interface PersonaSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonaSwitcherModal: React.FC<PersonaSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { availablePersonas, activePersonaId, switchPersona } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Interactive Persona Switcher</h3>
              <p className="text-xs text-slate-500">Experience the marketplace from different customer perspectives</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Personas List */}
        <div className="p-6 space-y-3">
          {availablePersonas.map((persona) => {
            const isActive = persona.id === activePersonaId;
            return (
              <div
                key={persona.id}
                onClick={() => {
                  switchPersona(persona.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'border-aura-500 bg-aura-50/50 dark:bg-aura-950/30 ring-1 ring-aura-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={persona.profile.avatarUrl}
                    alt={persona.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {persona.name}
                      </h4>
                      {isActive && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-aura-600 dark:text-aura-400 bg-aura-100 dark:bg-aura-900/60 px-2 py-0.5 rounded-full">
                          <UserCheck size={12} /> Active
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-aura-600 dark:text-aura-400 block">
                      {persona.role}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
