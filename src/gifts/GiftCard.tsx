import { useState } from 'react';
import { Gift } from '../shared/types';
import { Card, Button, Modal } from '../shared/components';
import { ShoppingCart } from 'lucide-react';

interface GiftCardProps {
  gift: Gift;
  onReserve: (guestName: string, guestEmail?: string) => Promise<boolean>;
  isReserving?: boolean;
}

export function GiftCard({ gift, onReserve, isReserving = false }: GiftCardProps) {
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [reserveLoading, setReserveLoading] = useState(false);
  const [reserveError, setReserveError] = useState('');

  const handleReserveClick = async () => {
    if (!guestName.trim()) {
      setReserveError('Por favor, digite seu nome');
      return;
    }

    setReserveLoading(true);
    setReserveError('');

    const success = await onReserve(guestName, guestEmail || undefined);
    
    if (success) {
      setShowReserveModal(false);
      setGuestName('');
      setGuestEmail('');
    } else {
      setReserveError('Falha ao reservar presente. Tente novamente.');
    }
    
    setReserveLoading(false);
  };

  const isReserved = gift.reserved;

  return (
    <>
      <Card
        className={`group flex flex-col h-full overflow-hidden border transition-all duration-300 ${
          isReserved
            ? 'border-brand-beige/70 bg-brand-beige/30 opacity-80'
            : 'border-brand-beige/50 bg-white/95 hover:-translate-y-1 hover:shadow-xl'
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-brand-beige/40">
          <img
            src={gift.imageUrl}
            alt={gift.name}
            className={`h-48 w-full object-cover transition-transform duration-500 ${
              isReserved ? 'grayscale' : 'group-hover:scale-[1.04]'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect fill='%23f3efe6' width='400' height='240'/%3E%3C/svg%3E`;
            }}
          />
          {isReserved && (
            <>
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-brand-mocha/70 shadow-card">
                Reservado
              </div>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              setShowReserveModal(true);
              setReserveError('');
            }}
            disabled={isReserved || isReserving}
            aria-label={isReserved ? 'Presente reservado' : 'Confirmar presente'}
            className={`absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-card transition ${
              isReserved
                ? 'border-white/70 bg-white/70 text-brand-mocha/70'
                : 'border-white/80 bg-white/95 text-brand-gold hover:bg-white'
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        <div className="flex-1 p-4">
          <h3 className="text-lg md:text-xl font-serif font-medium leading-tight text-brand-dark">
            {gift.name}
          </h3>
        </div>
      </Card>

      <Modal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
        title={`Confirmar presente: ${gift.name}`}
        size="sm"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReserveClick();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-brand-text mb-2">
              Seu Nome *
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setReserveError('');
              }}
              placeholder="Digite seu nome"
              className="w-full px-4 py-2 border border-brand-beige/50 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-colors"
              disabled={reserveLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-text mb-2">
              Email (opcional)
            </label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border border-brand-beige/50 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-colors"
              disabled={reserveLoading}
            />
          </div>

          {reserveError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {reserveError}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowReserveModal(false)}
              disabled={reserveLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={reserveLoading}
              disabled={reserveLoading}
              className="flex-1"
            >
              Confirmar presente
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
