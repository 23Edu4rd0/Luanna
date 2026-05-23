import { FormEvent, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useWeddingConfig } from './shared/hooks';
import inicio2024Image from './story/assets/inicio-2024.png';
import crescendoImage from './story/assets/crescendo.jpeg';
import noivadoImage from './story/assets/noivado.jpeg';

type Category = 'Cozinha' | 'Quarto' | 'Banheiro';

// Shape returned directly from /api/gifts (Supabase)
interface Gift {
  id: number;
  category: Category;
  name: string;
  imageUrl: string;
  reserved: boolean;
  reservedBy?: string;
}

type CategoryMeta = {
  label: string;
  subtitle?: string;
};

const CATEGORY_ORDER: Category[] = ['Cozinha', 'Quarto', 'Banheiro'];

const CATEGORY_META: Record<Category, CategoryMeta> = {
  Cozinha: { label: 'Cozinha' },
  Quarto: { label: 'Quarto' },
  Banheiro: { label: 'Banheiro' },
};

const ADMIN_PASSWORD = 'admin123';
const DEFAULT_STORY =
  'Entre encontros inesperados e sonhos compartilhados, construímos uma história de amor, parceria e fé, tendo Jeová como alicerce da nossa união. Hoje iniciamos uma nova fase ao lado das pessoas que amamos e do nosso novo lar, com gratidão no coração.';
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: '2024',
    title: 'Quando tudo começou',
    description:
      'Nos conhecemos e com o tempo percebemos que compartilhávamos o mesmo objetivo: servir a Jeová e dar sempre o nosso melhor a Ele. Então decidimos seguir essa caminhada juntos, unidos e apoiando um ao outro.',
    imageUrl: inicio2024Image,
  },
  {
    id: 2,
    date: '2025',
    title: 'O pedido',
    description:
      'Depois de meses nos conhecendo melhor, aprendendo um com o outro e fortalecendo nossa união, decidimos dar o próximo passo em direção ao nosso casamento.',
    imageUrl: crescendoImage,
  },
  {
    id: 3,
    date: '2026',
    title: 'Nosso casamento',
    description:
      'Estamos ansiosos para iniciarmos esse novo capítulo de nossas vidas, e queremos que cada um de vocês continuem a fazer parte da nossa história.',
    imageUrl: noivadoImage,
  },
];
const CEREMONY_DETAILS = [
  { label: 'Data', value: '20/06' },
  { label: 'Horário', value: '16h' },
  { label: 'Endereço', value: 'Rua do Capitão, 490, Del Rey' },
];

const RICKROLL_NAME = 'joao pedro rabelo';
const RICKROLL_URL = 'https://music.youtube.com/watch?v=dQw4w9WgXcQ';

const FALLBACK_IMAGE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23d6ccb6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23292929' font-family='Inter, sans-serif' font-size='28'%3EImagem do produto%3C/text%3E%3C/svg%3E";

const isRickrollName = (name: string) => name.trim().toLowerCase() === RICKROLL_NAME;
const isAdminPath = () =>
  window.location.pathname === '/admin' ||
  window.location.hash === '#/admin' ||
  window.location.hash === '#!/admin';

// visit tracking removed; admin UI focuses only on reservations

export function App() {
  const { config } = useWeddingConfig();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [guestName, setGuestName] = useState('');
  const [reserveError, setReserveError] = useState('');
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<Category, boolean>>({
    Cozinha: false,
    Quarto: false,
    Banheiro: false,
  });

  const loadGifts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gifts', { cache: 'no-store' });
      if (!response.ok) throw new Error('Não foi possível carregar os presentes.');
      const data = (await response.json()) as Gift[];
      setGifts(data);
    } catch {
      setLoadError('Falha ao carregar os presentes do Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    loadGifts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  // visit counter removed — admin area focuses only on reservations

  const giftsByCategory = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: [
        ...gifts.filter((g) => g.category === category && !g.reserved),
        ...gifts.filter((g) => g.category === category && g.reserved),
      ],
    }));
  }, [gifts]);

  const adminReservations = useMemo(
    () =>
      gifts
        .filter((g) => g.reserved)
        .map((g) => ({
          id: g.id,
          giftName: g.name,
          reservedBy: g.reservedBy ?? '',
        })),
    [gifts]
  );

  const handleAdminLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminError('');
      return;
    }

    setAdminError('Senha inválida.');
  };

  const handleAdminCancel = (giftId: number) => {
    if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return;

    fetch(`/api/gifts/${giftId}/unreserve`, { method: 'POST' })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to cancel reservation');
        return response.json();
      })
      .then(() => {
        setGifts((current) =>
          current.map((g) =>
            g.id === giftId ? { ...g, reserved: false, reservedBy: undefined } : g
          )
        );
      })
      .catch(() => {
        alert('Não foi possível cancelar a reserva.');
      });
  };

  const handleReserve = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGift) return;

    const fullName = guestName.trim();
    if (!fullName) {
      setReserveError('Informe seu nome completo.');
      return;
    }

    if (isRickrollName(fullName)) {
      window.location.href = RICKROLL_URL;
      return;
    }

    fetch(`/api/gifts/${selectedGift.id}/reserve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestName: fullName }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to reserve gift');
        return response.json();
      })
      .then((updatedGift: Gift) => {
        setGifts((current) =>
          current.map((g) =>
            g.id === selectedGift.id
              ? { ...g, reserved: updatedGift.reserved, reservedBy: updatedGift.reservedBy ?? fullName }
              : g
          )
        );
        setSelectedGift(null);
        setGuestName('');
        setReserveError('');
      })
      .catch(() => {
        setReserveError('Não foi possível salvar a reserva. Tente novamente.');
      });
  };

  const weddingDateTime = config.weddingDate.includes('T')
    ? config.weddingDate
    : `${config.weddingDate}T18:00:00`;

  const weddingDate = new Date(weddingDateTime);
  const isCountdownInvalid = Number.isNaN(weddingDate.getTime());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (isCountdownInvalid) return;

    const updateCountdown = () => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      if (distance <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [isCountdownInvalid, weddingDateTime]);

  const getGiftImageUrl = (gift: Gift) => gift.imageUrl?.trim() || FALLBACK_IMAGE_URL;

  const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.src !== FALLBACK_IMAGE_URL) {
      event.currentTarget.src = FALLBACK_IMAGE_URL;
    }
  };

  const weddingDateLabel = isCountdownInvalid
    ? 'Data do casamento'
    : weddingDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const countdownUnits = [
    { label: 'Dias', value: countdown.days },
    { label: 'Horas', value: countdown.hours },
    { label: 'Minutos', value: countdown.minutes },
    { label: 'Segundos', value: countdown.seconds },
  ];

  if (isAdminPath()) {
    return (
      <div className="min-h-screen bg-brand-ivory px-4 py-10 text-brand-charcoal">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-card backdrop-blur-sm md:p-8">
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.42em] text-brand-mocha/65">Área restrita</p>
            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Painel administrativo</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-mocha md:text-base">
              Relatório simples de reservas. O acesso não aparece em botão no site.
            </p>
          </div>

          {!isAdminAuthenticated ? (
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <label className="block text-sm text-brand-mocha">
                Senha de acesso
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => {
                    setAdminPassword(event.target.value);
                    setAdminError('');
                  }}
                  className="mt-2 w-full rounded-full border border-brand-sand bg-brand-cream/30 px-4 py-3 text-sm text-brand-charcoal outline-none transition focus:border-brand-mocha"
                  placeholder="Digite a senha"
                />
              </label>

              {adminError && (
                <p className="rounded-xl border border-red-300/30 bg-red-900/30 px-3 py-2 text-sm text-red-100">
                  {adminError}
                </p>
              )}

              <button
                type="submit"
                className="rounded-full bg-brand-charcoal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-black"
              >
                Entrar
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <section className="grid gap-4 md:grid-cols-1">
                <article className="rounded-[24px] border border-brand-sand/40 bg-brand-cream/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-mocha/70">Reservas</p>
                  <p className="mt-2 text-3xl font-semibold">{adminReservations.length}</p>
                  <p className="mt-2 text-sm text-brand-mocha">Itens reservados até agora.</p>
                </article>
              </section>

              <section>
                <h2 className="text-xl font-semibold">Quem reservou o quê</h2>
                {adminReservations.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {adminReservations.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="rounded-[22px] border border-brand-sand/40 bg-white/80 px-4 py-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{reservation.giftName}</p>
                          <p className="text-sm text-brand-mocha">Reservado por {reservation.reservedBy}</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleAdminCancel(reservation.id)}
                            className="ml-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/70 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                          >
                            Cancelar reserva
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-brand-mocha">Ainda não há reservas registradas.</p>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-ivory text-brand-charcoal">
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-rose/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-sand/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-1/4 h-64 w-64 rounded-full bg-brand-wood/20 blur-3xl" />

      <header className="relative px-4 pb-2 pt-14 md:pb-5 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-mocha/80">
            Casamento & Chá de Casa Nova
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            {config.coupleNames}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-mocha md:text-base">
            Um espaço delicado para celebrar nosso amor, nossa história e o novo lar que estamos
            construindo juntos.
          </p>
          <p className="mt-4 text-sm text-brand-mocha md:text-base">
            {weddingDateLabel}
          </p>

          <div className="mx-auto mt-8 text-center text-brand-charcoal">
            <p className="text-[10px] uppercase tracking-[0.45em] text-brand-mocha/65">
              Contagem regressiva
            </p>
            <div className="mt-4 flex flex-nowrap items-end justify-center gap-x-3 overflow-x-auto pb-1 md:gap-x-8 md:overflow-visible md:pb-0">
              {countdownUnits.map((unit) => (
                <div key={unit.label} className="flex min-w-16 flex-col items-center md:min-w-20">
                  <span className="text-[1.6rem] font-medium leading-none tracking-tight text-brand-charcoal md:text-5xl">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-brand-mocha/70 md:text-[11px] md:tracking-[0.3em]">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-4 pb-20">
        <section className="relative py-1 text-center">
          <div className="mx-auto h-px w-28 bg-brand-sand/70" />
          <h2 className="mt-6 text-2xl font-semibold md:text-3xl">Nossa história</h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-brand-mocha md:text-xl">
            {DEFAULT_STORY}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm italic text-brand-mocha/80 md:text-base">
            Amor que acolhe, inspira e floresce em cada detalhe do nosso novo capítulo.
          </p>
          <div className="mx-auto mt-6 h-px w-28 bg-brand-sand/70" />
        </section>

        <section className="space-y-5">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">Linha do tempo</h2>
          <div className="relative mx-auto max-w-5xl py-2">
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-brand-sand/0 via-brand-sand to-brand-sand/0 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8">
              {TIMELINE_EVENTS.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-[54%]' : 'md:pl-[54%]'}`}
                >
                  <div
                    className={`absolute left-2 top-12 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-sand/55 bg-white/85 shadow-card md:left-1/2 md:-translate-x-1/2 ${
                      index % 2 === 0 ? 'md:-translate-x-[52%]' : 'md:-translate-x-[48%]'
                    }`}
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-sand/50 bg-white/95 text-[10px] font-semibold tracking-[0.08em] text-brand-mocha/75">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <article className="md:border-none md:pl-0">
                    <div className="mx-auto aspect-square w-full max-w-[290px] overflow-hidden rounded-full border border-white/90 bg-brand-cream/30 p-1.5 shadow-[0_12px_30px_rgba(34,29,24,0.12)] md:max-w-[310px]">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className={`h-full w-full rounded-full object-cover ${
                          event.id === 2 ? 'object-[center_22%]' : 'object-center'
                        }`}
                      />
                    </div>
                    <p className="mt-4 text-center text-xs uppercase tracking-[0.24em] text-brand-mocha md:text-left">
                      {event.date}
                    </p>
                    <h3 className="mt-1 text-center text-xl font-semibold md:text-left">{event.title}</h3>
                    <p className="mt-2 text-center text-sm leading-relaxed text-brand-mocha md:text-left md:text-base">
                      {event.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-5 py-1">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.42em] text-brand-mocha/65">
              Convite do local
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              Informações da festinha de casa nova
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-mocha md:text-base">
              Vai ser um encontro íntimo e cheio de carinho. Aqui estão os dados para você chegar
              tranquilo(a).
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-[28px] border border-white/60 bg-white/55 px-5 py-6 shadow-card backdrop-blur-sm md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:backdrop-blur-0">
            <dl className="space-y-1">
              {CEREMONY_DETAILS.map((detail) => (
                <div key={detail.label} className="group py-4">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-[170px_1fr] md:items-center">
                    <dt className="text-[11px] uppercase tracking-[0.24em] text-brand-mocha/85">
                      {detail.label}
                    </dt>
                    <dd className="text-lg leading-snug text-brand-charcoal md:text-[1.2rem]">
                      {detail.value}
                    </dd>
                  </div>
                  <div className="mt-3 h-px w-full bg-gradient-to-r from-brand-sand/20 via-brand-sand/70 to-brand-sand/20 transition group-hover:via-brand-wood/70" />
                </div>
              ))}
            </dl>
          </div>

          <p className="pt-2 text-center text-sm italic text-brand-mocha">
            Dica especial: chegue com antecedência para aproveitar cada instante com a gente.
          </p>
        </section>

        <section className="mx-auto max-w-4xl space-y-4 py-1 text-center">
          <p className="text-[10px] uppercase tracking-[0.42em] text-brand-mocha/65">
            Sugestões de presentes
          </p>
          <h2 className="text-2xl font-semibold md:text-3xl">Escolha com carinho o que quiser trazer</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-brand-mocha md:text-base">
            Aqui estão algumas ideias para participar desse novo lar com a gente.
          </p>
        </section>

        {loading && (
          <section className="rounded-[28px] bg-white/75 p-6 text-brand-mocha shadow-card backdrop-blur-sm">
            Carregando itens...
          </section>
        )}

        {!loading && loadError && (
          <section className="rounded-[28px] bg-red-50 p-6 text-red-800 shadow-card">
            {loadError}
          </section>
        )}

        {!loading &&
          !loadError &&
          giftsByCategory.map(({ category, items }) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold md:text-2xl">
                    {CATEGORY_META[category].label}
                  </h2>
                  {CATEGORY_META[category].subtitle && (
                    <p className="mt-1 text-xs text-brand-mocha/70 md:text-sm">
                      {CATEGORY_META[category].subtitle}
                    </p>
                  )}
                </div>
                <span className="rounded-full bg-white/75 px-3 py-1 text-xs tracking-[0.2em] text-brand-mocha shadow-card">
                  {items.length} ITENS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {(isMobileViewport && !expandedCategories[category] ? items.slice(0, 10) : items).map((item) => (
                  <article
                    key={item.id}
                    onClick={() => !item.reserved && setSelectedGift(item)}
                    className={`overflow-hidden rounded-[32px] border p-4 shadow-card backdrop-blur-sm transition ${
                      item.reserved
                        ? 'cursor-default border-brand-beige/70 bg-slate-100/70'
                        : 'cursor-pointer border-white/80 bg-white/72 hover:-translate-y-1 hover:border-brand-sand/80 hover:shadow-[0_18px_32px_rgba(34,29,24,0.16)]'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={getGiftImageUrl(item)}
                        alt={item.name}
                        className={`h-44 w-full rounded-[22px] object-cover ${
                          item.reserved ? 'grayscale opacity-80' : ''
                        }`}
                        onError={handleImageFallback}
                      />
                      {item.reserved && (
                        <div className="absolute inset-x-3 bottom-3 rounded-full bg-black/55 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white">
                          Reservado
                        </div>
                      )}
                    </div>

                    <h3 className="mt-4 text-lg font-medium">{item.name}</h3>
                  </article>
                ))}
              </div>

              {isMobileViewport && items.length > 10 && !expandedCategories[category] && (
                <div className="flex justify-center pt-2 md:hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCategories((current) => ({
                        ...current,
                        [category]: true,
                      }))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-brand-sand/55 px-4 py-2 text-xs uppercase tracking-[0.22em] text-brand-mocha transition hover:border-brand-wood/70 hover:text-brand-charcoal"
                  >
                    Ver mais
                  </button>
                </div>
              )}

              {isMobileViewport && items.length > 10 && expandedCategories[category] && (
                <div className="flex justify-center pt-2 md:hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCategories((current) => ({
                        ...current,
                        [category]: false,
                      }))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-brand-sand/55 px-4 py-2 text-xs uppercase tracking-[0.22em] text-brand-mocha transition hover:border-brand-wood/70 hover:text-brand-charcoal"
                  >
                    Ver menos
                  </button>
                </div>
              )}
            </section>
          ))}
      </main>

      <footer className="px-4 pb-10 text-center text-sm text-brand-mocha/85">
        <p>Com amor, {config.coupleNames}</p>
      </footer>

      {selectedGift && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              setSelectedGift(null);
              setReserveError('');
            }}
          />

          <div className="relative z-10 w-full max-w-lg rounded-[32px] bg-white/96 p-5 shadow-card md:p-6">
            <img
              src={getGiftImageUrl(selectedGift)}
              alt={selectedGift.name}
              className="h-52 w-full rounded-[24px] object-cover"
              onError={handleImageFallback}
            />

            <h3 className="mt-4 text-xl font-semibold text-brand-charcoal">{selectedGift.name}</h3>

            <form onSubmit={handleReserve} className="mt-5 space-y-3">
              <label className="block text-sm text-brand-mocha">
                Seu nome completo
                <input
                  type="text"
                  value={guestName}
                  onChange={(event) => {
                    setGuestName(event.target.value);
                    setReserveError('');
                  }}
                  className="mt-2 w-full rounded-full border border-brand-sand bg-brand-cream/30 px-4 py-3 text-sm text-brand-charcoal outline-none transition focus:border-brand-mocha"
                  placeholder="Digite seu nome completo"
                />
              </label>

              {reserveError && (
                <p className="rounded-xl border border-red-300/30 bg-red-900/30 px-3 py-2 text-sm text-red-100">
                  {reserveError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-brand-charcoal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-black"
              >
                Confirmar que vou presentear
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
