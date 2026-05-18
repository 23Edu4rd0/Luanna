import { useCountdown } from '../shared/hooks';

interface CountdownSectionProps {
  weddingDate: string;
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-6 md:p-8 mb-2 min-w-20 md:min-w-24">
        <p className="text-3xl md:text-5xl font-serif font-medium text-brand-gold">
          {String(value).padStart(2, '0')}
        </p>
      </div>
      <p className="text-sm md:text-base text-brand-text/70 tracking-widest uppercase font-medium">
        {label}
      </p>
    </div>
  );
}

export function CountdownSection({ weddingDate }: CountdownSectionProps) {
  const countdown = useCountdown(weddingDate);

  if (countdown.isOver) {
    return (
      <section className="py-20 md:py-32 px-4 bg-brand-beige/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
            ✨ Nosso Grande Dia ✨
          </h2>
          <p className="text-xl text-brand-text/70">
            A celebração chegou!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-brand-offwhite to-brand-beige/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-lg text-brand-text/70 tracking-wide mb-2 uppercase font-medium">
            Faltam
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-medium">
            Para o Grande Dia
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          <CountdownUnit label="Dias" value={countdown.days} />
          <CountdownUnit label="Horas" value={countdown.hours} />
          <CountdownUnit label="Minutos" value={countdown.minutes} />
          <CountdownUnit label="Segundos" value={countdown.seconds} />
        </div>

        <div className="text-center mt-12 md:mt-16">
          <p className="text-brand-text/60 text-sm md:text-base tracking-wide">
            {/* ✏️ EDITAR: Data do casamento */}
            25 de outubro de 2026
          </p>
        </div>
      </div>
    </section>
  );
}
