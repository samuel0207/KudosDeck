import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-orange-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-slate-200/80 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md">
      {icons[toast.type] || icons.info}
      <div className="text-sm font-medium text-slate-800 flex-1">
        {toast.message}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 rounded-md"
        title="Fechar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
