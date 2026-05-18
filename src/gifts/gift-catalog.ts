import { Gift } from '../shared/types';

export type GiftCategory = 'Cozinha' | 'Quarto' | 'Banheiro';

type GiftTemplate = {
  category: GiftCategory;
  name: string;
  description: string;
  price: number;
};

const GIFT_IMAGES = [
  '/images/gift-1.svg',
  '/images/gift-2.svg',
  '/images/gift-3.svg',
  '/images/gift-4.svg',
  '/images/gift-5.svg',
  '/images/gift-6.svg',
];

const GIFT_TEMPLATES: GiftTemplate[] = [
  { category: 'Cozinha', name: 'Jogo de panela', description: 'Base versátil para o dia a dia.', price: 320 },
  { category: 'Cozinha', name: 'Kit de facas', description: 'Corte e preparo com praticidade.', price: 140 },
  { category: 'Cozinha', name: 'Panela de pressão 4,5 L', description: 'Para receitas rápidas e completas.', price: 220 },
  { category: 'Cozinha', name: 'Misteira', description: 'Lanches quentinhos em minutos.', price: 180 },
  { category: 'Cozinha', name: 'Jogo de copos', description: 'Para servir água e sucos com estilo.', price: 90 },
  { category: 'Cozinha', name: 'Jogo de xícaras', description: 'Para café da manhã e visitas.', price: 120 },
  { category: 'Cozinha', name: 'Jarra de suco (vidro)', description: 'Ideal para servir bebidas à mesa.', price: 70 },
  { category: 'Cozinha', name: 'Garrafa de água (vidro)', description: 'Para manter a mesa elegante.', price: 85 },
  { category: 'Cozinha', name: 'Filtro', description: 'Essencial para a rotina da cozinha.', price: 160 },
  { category: 'Cozinha', name: 'Jogo porta-temperos', description: 'Temperos organizados e à mão.', price: 95 },
  { category: 'Cozinha', name: 'Conjunto de potes para mantimentos', description: 'Organização com visual limpo.', price: 150 },
  { category: 'Cozinha', name: 'Pipoqueira', description: 'Perfeita para noites de filme.', price: 130 },
  { category: 'Cozinha', name: 'Saca-Rolha', description: 'Abridor prático para ocasiões especiais.', price: 45 },
  { category: 'Cozinha', name: 'Descascador de cenoura e ralador', description: 'Dois em um para o preparo.', price: 60 },
  { category: 'Cozinha', name: 'Kit colheres cozinha', description: 'Utensílios básicos do dia a dia.', price: 110 },
  { category: 'Cozinha', name: 'Queijeira', description: 'Para servir com charme.', price: 75 },
  { category: 'Cozinha', name: 'Porta-detergente + porta-esponja', description: 'Bancada organizada.', price: 65 },
  { category: 'Cozinha', name: 'Tábua de cortar carne', description: 'Superfície firme e resistente.', price: 95 },
  { category: 'Cozinha', name: 'Escorredor de louça (inox)', description: 'Durabilidade e acabamento elegante.', price: 190 },
  { category: 'Cozinha', name: 'Forma de bolo', description: 'Para receitas caseiras.', price: 80 },
  { category: 'Cozinha', name: 'Tabuleiro M', description: 'Versátil para forno e mesa.', price: 95 },
  { category: 'Cozinha', name: 'Tabuleiro G', description: 'Ideal para porções maiores.', price: 120 },
  { category: 'Cozinha', name: 'Jogo de pano de prato', description: 'Essencial para a rotina.', price: 70 },
  { category: 'Cozinha', name: 'Liquidificador', description: 'Para sucos, massas e vitaminas.', price: 260 },
  { category: 'Cozinha', name: 'Tapete para cozinha', description: 'Mais conforto no preparo.', price: 110 },
  { category: 'Cozinha', name: 'Escorredor de macarrão', description: 'Prático para massas e legumes.', price: 85 },
  { category: 'Quarto', name: 'Jogo de lençol cama queen', description: 'Conforto para a cama principal.', price: 180 },
  { category: 'Quarto', name: 'Jogo de lençol cama queen', description: 'Conjunto extra para o enxoval.', price: 180 },
  { category: 'Quarto', name: 'Jogo de cama queen', description: 'Camadas extras para noites aconchegantes.', price: 240 },
  { category: 'Quarto', name: 'Cobertor casal', description: 'Acolhimento para os dias frios.', price: 160 },
  { category: 'Quarto', name: 'Ferro de passar', description: 'Para roupas sempre alinhadas.', price: 170 },
  { category: 'Banheiro', name: 'Jogo de toalha de banho', description: 'Toalhas macias para o dia a dia.', price: 140 },
  { category: 'Banheiro', name: 'Jogo de toalha de banho', description: 'Conjunto extra para o enxoval.', price: 140 },
  { category: 'Banheiro', name: 'Toalhas de rosto (2 unidades)', description: 'Itens práticos para a rotina.', price: 75 },
  { category: 'Banheiro', name: 'Lixeira inox', description: 'Acabamento discreto e resistente.', price: 120 },
  { category: 'Banheiro', name: 'Tapete para banheiro', description: 'Mais conforto ao sair do banho.', price: 90 },
  { category: 'Banheiro', name: 'Kit banheiro', description: 'Conjunto para deixar tudo coordenado.', price: 130 },
];

export const GIFT_CATEGORY_ORDER: GiftCategory[] = ['Cozinha', 'Quarto', 'Banheiro'];

export const GIFT_CATEGORY_NOTES: Record<GiftCategory, string> = {
  Cozinha: 'Cores sugeridas: preto, cinza e amadeirado.',
  Quarto: 'Linhas neutras e aconchegantes.',
  Banheiro: 'Peças práticas com acabamento clean.',
};

export function buildDefaultGifts(pixKey: string): Omit<Gift, 'id'>[] {
  return GIFT_TEMPLATES.map((gift, index) => ({
    ...gift,
    imageUrl: GIFT_IMAGES[index % GIFT_IMAGES.length],
    reserved: false,
    pixKey,
  }));
}

export function buildAmazonSearchUrl(query: string): string {
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}`;
}

export function buildMercadoLivreSearchUrl(query: string): string {
  return `https://lista.mercadolivre.com.br/${encodeURIComponent(query.toLowerCase())}`;
}
