import React from 'react';
import { useNotification, ToastType } from '../../context/NotificationContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const BORDERS: Record<ToastType, string> = {
  success: 'border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
  error: 'border-l-4 border-l-rose-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
  warning: 'border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
  info: 'border-l-4 border-l-blue-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800',
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg shadow-xl border ${BORDERS[toast.type]} transition-all duration-300 animate-slide-in`}
        >
          {ICONS[toast.type]}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                {toast.message}
              </p>
            )}
            {toast.actionLabel && toast.onAction && (
              <button
                onClick={() => {
                  toast.onAction?.();
                  removeToast(toast.id);
                }}
                className="mt-2 text-xs font-semibold text-aura-600 hover:text-aura-700 dark:text-aura-400 underline"
              >
                {toast.actionLabel}
              </button>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Dismiss toast"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
