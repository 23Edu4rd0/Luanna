import { FormEvent, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useWeddingConfig } from './shared/hooks';
import inicioImage from './story/assets/inicio.jpeg';
import crescendoImage from './story/assets/crescendo.jpeg';
import noivadoImage from './story/assets/noivado.jpeg';
import casamentoImage from './story/assets/WhatsApp Image 2026-05-12 at 22.39.42.jpeg';

type Category = 'Cozinha' | 'Quarto' | 'Banheiro';

interface Product {
  id: string;
  category: Category;
  name: string;
  referenceUrl: string;
  imageUrl: string;
  reserved: boolean;
  reservedBy: string;
}

const CATEGORY_ORDER: Category[] = ['Cozinha', 'Quarto', 'Banheiro'];

const CATEGORY_META: Record<Category, { icon: string; label: string }> = {
  Cozinha: { icon: '🍳', label: 'Cozinha' },
  Quarto: { icon: '🛏️', label: 'Quarto' },
  Banheiro: { icon: '🚿', label: 'Banheiro' },
};

const STORAGE_KEY = 'housewarming-gift-reservations-v1';
const DEFAULT_STORY =
  'Entre encontros inesperados, conversas que atravessaram madrugadas e sonhos compartilhados, construímos uma história feita de carinho, parceria e fé. Agora celebramos nosso casamento com as pessoas que mais amamos e iniciamos nosso novo lar com gratidão.';
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: '2018',
    title: 'Quando tudo começou',
    description: 'Nos conhecemos e descobrimos, logo nos primeiros dias, uma conexão leve e verdadeira.',
    imageUrl: inicioImage,
  },
  {
    id: 2,
    date: '2020',
    title: 'Crescemos juntos',
    description: 'Entre planos e desafios, aprendemos que amor também é cuidado diário e presença.',
    imageUrl: crescendoImage,
  },
  {
    id: 3,
    date: '2025',
    title: 'O pedido',
    description: 'Com o coração cheio, decidimos dar o próximo passo e dizer sim para sempre.',
    imageUrl: noivadoImage,
  },
  {
    id: 4,
    date: '2026',
    title: 'Nosso casamento',
    description: 'Celebramos essa nova etapa com quem fez parte da nossa caminhada até aqui.',
    imageUrl: casamentoImage,
  },
];
const PIX_QR_CODE_URL = '/pix-qr-placeholder.svg';
const CEREMONY_DETAILS = [
  { label: 'Data', value: '20/06' },
  { label: 'Horário', value: '16h' },
  { label: 'Endereço', value: 'Rua do Capitão, 490, Del Rey' },
];

const FALLBACK_IMAGE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23d6ccb6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23292929' font-family='Inter, sans-serif' font-size='28'%3EImagem do produto%3C/text%3E%3C/svg%3E";
const PRODUCT_IMAGE_BASE_PATH = '/images/products';

export function App() {
  const { config } = useWeddingConfig();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [guestName, setGuestName] = useState('');
  const [reserveError, setReserveError] = useState('');
  const [pixCopied, setPixCopied] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Não foi possível carregar os itens.');
        }

        const data = (await response.json()) as Product[];
        const storedReservations = localStorage.getItem(STORAGE_KEY);
        let reservationMap: Record<string, string> = {};

        if (storedReservations) {
          try {
            reservationMap = JSON.parse(storedReservations) as Record<string, string>;
          } catch {
            localStorage.removeItem(STORAGE_KEY);
          }
        }

        const merged = data.map((product) => {
          const storedName = reservationMap[product.id];
          if (!storedName) return product;

          return {
            ...product,
            reserved: true,
            reservedBy: storedName,
          };
        });

        setProducts(merged);
      } catch {
        setLoadError('Falha ao carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productsByCategory = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: [
        ...products.filter((product) => product.category === category && !product.reserved),
        ...products.filter((product) => product.category === category && product.reserved),
      ],
    }));
  }, [products]);

  const handleReserve = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const fullName = guestName.trim();
    if (!fullName) {
      setReserveError('Informe seu nome completo.');
      return;
    }

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            reserved: true,
            reservedBy: fullName,
          }
        : product
    );

    setProducts(updatedProducts);

    const nextReservations = updatedProducts.reduce<Record<string, string>>((acc, product) => {
      if (product.reserved && product.reservedBy) {
        acc[product.id] = product.reservedBy;
      }
      return acc;
    }, {});

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReservations));
    setSelectedProduct(null);
    setGuestName('');
    setReserveError('');
  };

  const weddingDateTime = config.weddingDate.includes('T')
    ? config.weddingDate
    : `${config.weddingDate}T18:00:00`;

  const weddingDate = new Date(weddingDateTime);
  const isCountdownInvalid = Number.isNaN(weddingDate.getTime());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const pixKey = config.pixKey || 'sua-chave-pix@dominio.com';

  useEffect(() => {
    if (isCountdownInvalid) return;

    const updateCountdown = () => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      if (distance <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [isCountdownInvalid, weddingDateTime]);

  const handleCopyPix = async () => {
    await navigator.clipboard.writeText(pixKey);
    setPixCopied(true);
    window.setTimeout(() => setPixCopied(false), 1600);
  };

  const getProductImageUrl = (product: Product) => {
    const customImage = product.imageUrl.trim();
    if (customImage) return customImage;
    return `${PRODUCT_IMAGE_BASE_PATH}/${product.id}.jpg`;
  };

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
  ];

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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            {countdownUnits.map((unit) => (
              <div
                key={unit.label}
                className="min-w-32 rounded-full border border-white/90 bg-gradient-to-b from-white/90 to-white/65 px-6 py-3 shadow-card backdrop-blur-sm"
              >
                <p className="text-2xl font-semibold">{String(unit.value).padStart(2, '0')}</p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-mocha">{unit.label}</p>
              </div>
            ))}
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

                  <article className="border-l border-brand-sand/50 pl-5 md:border-none md:pl-0">
                    <div className="mx-auto aspect-square w-full max-w-[270px] overflow-hidden rounded-full border border-white/90 bg-brand-cream/30 p-1.5 shadow-[0_12px_30px_rgba(34,29,24,0.12)] md:max-w-[310px]">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className={`h-full w-full rounded-full object-cover ${
                          event.id === 2 ? 'object-[center_22%]' : 'object-center'
                        }`}
                      />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.24em] text-brand-mocha">{event.date}</p>
                    <h3 className="mt-1 text-xl font-semibold">{event.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-mocha md:text-base">
                      {event.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-5 py-1">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            Informações da festinha de casa nova
          </h2>
          <p className="text-center text-sm leading-relaxed text-brand-mocha md:text-base">
            Vai ser um encontro íntimo e cheio de carinho. Aqui estão os dados para você chegar
            tranquilo(a).
          </p>

          <dl className="mx-auto max-w-3xl space-y-1">
            {CEREMONY_DETAILS.map((detail) => (
              <div key={detail.label} className="group py-4">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-[170px_1fr] md:items-center">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-brand-mocha/85">{detail.label}</dt>
                  <dd className="text-lg leading-snug text-brand-charcoal md:text-[1.2rem]">
                    {detail.value}
                  </dd>
                </div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-brand-sand/20 via-brand-sand/70 to-brand-sand/20 transition group-hover:via-brand-wood/70" />
              </div>
            ))}
          </dl>

          <p className="pt-2 text-center text-sm italic text-brand-mocha">
            Dica especial: chegue com antecedência para aproveitar cada instante com a gente.
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
          productsByCategory.map(({ category, items }) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl" aria-hidden>
                  {CATEGORY_META[category].icon}
                </span>
                <h2 className="flex-1 text-xl font-semibold md:text-2xl">
                  {CATEGORY_META[category].label}
                </h2>
                <span className="rounded-full bg-white/75 px-3 py-1 text-xs tracking-[0.2em] text-brand-mocha shadow-card">
                  {items.length} ITENS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => !item.reserved && setSelectedProduct(item)}
                    className={`overflow-hidden rounded-[32px] border p-4 shadow-card backdrop-blur-sm transition ${
                      item.reserved
                        ? 'cursor-default border-brand-beige/70 bg-slate-100/70'
                        : 'cursor-pointer border-white/80 bg-white/72 hover:-translate-y-1 hover:border-brand-sand/80 hover:shadow-[0_18px_32px_rgba(34,29,24,0.16)]'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={getProductImageUrl(item)}
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
            </section>
          ))}

        <section className="relative overflow-hidden rounded-[44px] bg-gradient-to-br from-white/92 to-brand-cream/70 p-6 shadow-card md:p-10">
          <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-brand-rose/20 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 bottom-6 h-40 w-40 rounded-full bg-brand-sand/35 blur-2xl" />
          <p className="relative text-sm font-medium tracking-[0.08em] text-brand-mocha">
            Prefere presentear com uma contribuição? Use o PIX abaixo 💛
          </p>

          <div className="relative mt-5 grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] md:items-center">
            <img
              src={PIX_QR_CODE_URL}
              alt="QR Code para contribuição via PIX"
              className="h-[220px] w-[220px] rounded-[28px] bg-white p-3 shadow-card"
            />

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-mocha">Chave PIX</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <code className="rounded-full bg-white px-4 py-3 text-sm text-brand-charcoal shadow-card">
                  {pixKey}
                </code>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="rounded-full bg-brand-charcoal px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-black"
                >
                  {pixCopied ? 'Chave copiada!' : 'Copiar chave PIX'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-10 text-center text-sm text-brand-mocha/85">
        <p>Com amor, {config.coupleNames}</p>
      </footer>

      {selectedProduct && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              setSelectedProduct(null);
              setReserveError('');
            }}
          />

          <div className="relative z-10 w-full max-w-lg rounded-[32px] bg-white/96 p-5 shadow-card md:p-6">
            <img
              src={getProductImageUrl(selectedProduct)}
              alt={selectedProduct.name}
              className="h-52 w-full rounded-[24px] object-cover"
              onError={handleImageFallback}
            />

            <h3 className="mt-4 text-xl font-semibold text-brand-charcoal">{selectedProduct.name}</h3>

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
