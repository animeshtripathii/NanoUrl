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
    <div className="fixed bottom-lg right-lg bg-[#1E1E1E] border border-border-subtle rounded-lg p-md flex items-center space-x-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 min-w-[280px]">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border ${
          isSuccess
            ? 'bg-[#FF6B2C]/10 border-[#FF6B2C] text-[#FF6B2C]'
            : 'bg-[#ffb4ab]/10 border-[#ffb4ab] text-[#ffb4ab]'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          {isSuccess ? 'check' : 'close'}
        </span>
      </div>
      <div className="flex-1">
        <p className="font-body-sm text-body-sm text-on-surface font-medium">{message}</p>
        {description && (
          <p className="font-code-sm text-code-sm text-on-surface-variant">{description}</p>
        )}
      </div>
      <button onClick={onClose} className="text-on-surface-variant hover:text-white flex items-center">
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
