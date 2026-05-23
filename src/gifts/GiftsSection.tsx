import { useState } from 'react';
import { Gift } from '../shared/types';
import { SectionTitle } from '../shared/components';
import { GiftCard } from './GiftCard';
import { useGifts } from '../shared/hooks';
import { GIFT_CATEGORY_ORDER } from './gift-catalog';

export function GiftsSection() {
  const { gifts, loading, error, reserveGift } = useGifts();
  const [reservingId, setReservingId] = useState<number | null>(null);

  const handleReserve = async (giftId: number, guestName: string, guestEmail?: string) => {
    setReservingId(giftId);
    const success = await reserveGift(giftId, guestName, guestEmail);
    setReservingId(null);
    return success;
  };

  if (loading) {
    return (
      <section className="py-20 md:py-28 px-4 bg-brand-beige/20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Lista de Opções" subtitle="Carregando..." />
        </div>
      </section>
    );
  }

  const orderedGifts = [
    ...GIFT_CATEGORY_ORDER.flatMap((category) => {
      const categoryGifts = gifts.filter((gift) => gift.category === category);
      return [
        ...categoryGifts.filter((gift) => !gift.reserved),
        ...categoryGifts.filter((gift) => gift.reserved),
      ];
    }),
    ...gifts
      .filter((gift) => !GIFT_CATEGORY_ORDER.some((category) => category === gift.category))
      .sort((a, b) => Number(a.reserved) - Number(b.reserved)),
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-brand-offwhite via-brand-beige/10 to-brand-offwhite">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Lista de Opções"
          subtitle="Escolha o item que mais combina com vocês"
        />

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {orderedGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onReserve={(name, email) =>
                handleReserve(gift.id, name, email)
              }
              isReserving={reservingId === gift.id}
            />
          ))}
        </div>

        {gifts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-text/60 text-lg">
              Nenhum presente disponível. Volte em breve!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
