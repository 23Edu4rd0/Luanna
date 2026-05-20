import { Gift } from '../shared/types';

export type GiftCategory = 'Cozinha' | 'Quarto' | 'Banheiro';

type GiftTemplate = {
  category: GiftCategory;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const GIFT_TEMPLATES: GiftTemplate[] = [
  { category: 'Cozinha', name: 'Jogo de panela', description: 'Base versátil para o dia a dia.', price: 320, imageUrl: '/images/products/jogo_panelas.png' },
  { category: 'Cozinha', name: 'Kit de facas', description: 'Corte e preparo com praticidade.', price: 140, imageUrl: '/images/products/kit_facas.jpg' },
  { category: 'Cozinha', name: 'Panela de pressão 4,5 L', description: 'Para receitas rápidas e completas.', price: 220, imageUrl: '/images/products/panela_pressao.jpg' },
  { category: 'Cozinha', name: 'Misteira', description: 'Lanches quentinhos em minutos.', price: 180, imageUrl: '/images/products/misteira.jpg' },
  { category: 'Cozinha', name: 'Jogo de copos', description: 'Para servir água e sucos com estilo.', price: 90, imageUrl: '/images/products/jogo_copos.jpg' },
  { category: 'Cozinha', name: 'Jogo de xícaras', description: 'Para café da manhã e visitas.', price: 120, imageUrl: '/images/products/jogo_xicaras.jpg' },
  { category: 'Cozinha', name: 'Jarra de suco (vidro)', description: 'Ideal para servir bebidas à mesa.', price: 70, imageUrl: '/images/products/jarra_suco.jpg' },
  { category: 'Cozinha', name: 'Garrafa de água (vidro)', description: 'Para manter a mesa elegante.', price: 85, imageUrl: '/images/products/garrafa_agua.jpg' },
  { category: 'Cozinha', name: 'Filtro', description: 'Essencial para a rotina da cozinha.', price: 160, imageUrl: '/images/products/filtro.jpg' },
  { category: 'Cozinha', name: 'Jogo porta-temperos', description: 'Temperos organizados e à mão.', price: 95, imageUrl: '/images/products/porta_tempeiros.jpg' },
  { category: 'Cozinha', name: 'Conjunto de potes para mantimentos', description: 'Organização com visual limpo.', price: 150, imageUrl: '/images/products/potes_para_mantimentos.jpg' },
  { category: 'Cozinha', name: 'Pipoqueira', description: 'Perfeita para noites de filme.', price: 130, imageUrl: '/images/products/pipoqueira.jpg' },
  { category: 'Cozinha', name: 'Saca-Rolha', description: 'Abridor prático para ocasiões especiais.', price: 45, imageUrl: '/images/products/sacarolha.jpg' },
  { category: 'Cozinha', name: 'Descascador de cenoura e ralador', description: 'Dois em um para o preparo.', price: 60, imageUrl: '/images/products/ralador.jpg' },
  { category: 'Cozinha', name: 'Kit colheres cozinha', description: 'Utensílios básicos do dia a dia.', price: 110, imageUrl: '/images/products/kit_colheres_cozinha.jpg' },
  { category: 'Cozinha', name: 'Queijeira', description: 'Para servir com charme.', price: 75, imageUrl: '/images/products/queijeira.png' },
  { category: 'Cozinha', name: 'Porta-detergente + porta-esponja', description: 'Bancada organizada.', price: 65, imageUrl: '/images/products/porta_detergente.jpg' },
  { category: 'Cozinha', name: 'Tábua de cortar carne', description: 'Superfície firme e resistente.', price: 95, imageUrl: '/images/products/tabua_cortar_carne.jpg' },
  { category: 'Cozinha', name: 'Escorredor de louça (inox)', description: 'Durabilidade e acabamento elegante.', price: 190, imageUrl: '/images/products/escorredor_louca.jpg' },
  { category: 'Cozinha', name: 'Forma de bolo', description: 'Para receitas caseiras.', price: 80, imageUrl: '/images/products/forma_bolo.jpg' },
  { category: 'Cozinha', name: 'Tabuleiro M', description: 'Versátil para forno e mesa.', price: 95, imageUrl: '/images/products/tabuleiro.jpg' },
  { category: 'Cozinha', name: 'Tabuleiro G', description: 'Ideal para porções maiores.', price: 120, imageUrl: '/images/products/tabuleiro.jpg' },
  { category: 'Cozinha', name: 'Jogo de pano de prato', description: 'Essencial para a rotina.', price: 70, imageUrl: '/images/gift-2.svg' },
  { category: 'Cozinha', name: 'Liquidificador', description: 'Para sucos, massas e vitaminas.', price: 260, imageUrl: '/images/gift-2.svg' },
  { category: 'Cozinha', name: 'Tapete para cozinha', description: 'Mais conforto no preparo.', price: 110, imageUrl: '/images/products/tapete.jpg' },
  { category: 'Cozinha', name: 'Escorredor de macarrão', description: 'Prático para massas e legumes.', price: 85, imageUrl: '/images/products/escorredor.jpg' },
  { category: 'Quarto', name: 'Jogo de lençol cama queen', description: 'Conforto para a cama principal.', price: 180, imageUrl: '/images/gift-5.svg' },
  { category: 'Quarto', name: 'Jogo de lençol cama queen', description: 'Conjunto extra para o enxoval.', price: 180, imageUrl: '/images/gift-5.svg' },
  { category: 'Quarto', name: 'Jogo de cama queen', description: 'Camadas extras para noites aconchegantes.', price: 240, imageUrl: '/images/gift-5.svg' },
  { category: 'Quarto', name: 'Cobertor casal', description: 'Acolhimento para os dias frios.', price: 160, imageUrl: '/images/gift-5.svg' },
  { category: 'Quarto', name: 'Ferro de passar', description: 'Para roupas sempre alinhadas.', price: 170, imageUrl: '/images/gift-5.svg' },
  { category: 'Banheiro', name: 'Jogo de toalha de banho', description: 'Toalhas macias para o dia a dia.', price: 140, imageUrl: '/images/gift-6.svg' },
  { category: 'Banheiro', name: 'Jogo de toalha de banho', description: 'Conjunto extra para o enxoval.', price: 140, imageUrl: '/images/gift-6.svg' },
  { category: 'Banheiro', name: 'Toalhas de rosto (2 unidades)', description: 'Itens práticos para a rotina.', price: 75, imageUrl: '/images/gift-6.svg' },
  { category: 'Banheiro', name: 'Lixeira inox', description: 'Acabamento discreto e resistente.', price: 120, imageUrl: '/images/gift-6.svg' },
  { category: 'Banheiro', name: 'Tapete para banheiro', description: 'Mais conforto ao sair do banho.', price: 90, imageUrl: '/images/gift-6.svg' },
  { category: 'Banheiro', name: 'Kit banheiro', description: 'Conjunto para deixar tudo coordenado.', price: 130, imageUrl: '/images/gift-6.svg' },
];

export const GIFT_CATEGORY_ORDER: GiftCategory[] = ['Cozinha', 'Quarto', 'Banheiro'];

export const GIFT_CATEGORY_NOTES: Record<GiftCategory, string> = {
  Cozinha: 'Cores sugeridas: preto, cinza e amadeirado.',
  Quarto: 'Linhas neutras e aconchegantes.',
  Banheiro: 'Peças práticas com acabamento clean.',
};

export function buildDefaultGifts(): Omit<Gift, 'id'>[] {
  return GIFT_TEMPLATES.map((gift) => ({
    ...gift,
    reserved: false,
  }));
}

export function buildAmazonSearchUrl(query: string): string {
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}`;
}

export function buildMercadoLivreSearchUrl(query: string): string {
  return `https://lista.mercadolivre.com.br/${encodeURIComponent(query.toLowerCase())}`;
}
