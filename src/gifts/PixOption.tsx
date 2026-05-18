import { Gift } from '../shared/types';

interface PixOptionProps {
  gift: Gift;
  onClose: () => void;
}

export function PixOption({ gift, onClose }: PixOptionProps) {
  const handleCopyKey = () => {
    navigator.clipboard.writeText(gift.pixKey);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-brand-text/60 mb-2 uppercase tracking-wide font-medium">
          PIX Key
        </p>
        <div className="flex items-center gap-2 bg-brand-beige/50 p-3 rounded-lg">
          <code className="flex-1 text-sm font-mono break-all text-brand-text">
            {gift.pixKey}
          </code>
          <button
            onClick={handleCopyKey}
            className="px-3 py-2 bg-brand-gold text-brand-dark rounded text-sm font-medium hover:bg-brand-gold/90 transition-colors flex-shrink-0"
          >
            Copy
          </button>
        </div>
      </div>

      {gift.pixQrCode && (
        <div className="text-center">
          <p className="text-sm text-brand-text/60 mb-4 uppercase tracking-wide font-medium">
            QR Code
          </p>
          <img
            src={gift.pixQrCode}
            alt="PIX QR Code"
            className="w-48 h-48 mx-auto border border-brand-beige/50 rounded-lg p-2 bg-white"
          />
        </div>
      )}

      <div>
        <p className="text-sm text-brand-text/60 mb-2 uppercase tracking-wide font-medium">
          Suggested Amount
        </p>
        <div className="text-center">
          <p className="text-3xl font-serif font-medium text-brand-gold">
            R$ {gift.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      <p className="text-sm text-brand-text/70 bg-brand-beige/30 p-3 rounded-lg text-center">
        Thank you for your generosity! Your support means the world to us.
      </p>

      <button
        onClick={onClose}
        className="w-full py-3 bg-brand-beige text-brand-dark rounded-lg font-medium hover:bg-brand-beige/80 transition-colors"
      >
        Close
      </button>
    </div>
  );
}
