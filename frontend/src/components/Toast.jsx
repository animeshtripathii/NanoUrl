import React, { useEffect } from 'react';

export default function Toast({ show, message, description, type = 'success', onClose }) {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-lg right-lg backdrop-blur-xl bg-zinc-950/80 border border-white/20 rounded-xl p-md flex items-center space-x-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 min-w-[300px] transition-all animate-fade-in">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border ${
          isSuccess
            ? 'bg-white/10 border-white text-white'
            : 'bg-red-500/10 border-red-400 text-red-400'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          {isSuccess ? 'check' : 'close'}
        </span>
      </div>
      <div className="flex-1">
        <p className="font-body-sm text-body-sm text-white font-semibold">{message}</p>
        {description && (
          <p className="font-code-sm text-code-sm text-zinc-400 mt-0.5">{description}</p>
        )}
      </div>
      <button onClick={onClose} className="text-zinc-400 hover:text-white flex items-center transition-colors">
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
