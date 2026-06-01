import { Gift } from '../shared/types';

export type GiftCategory = 'Cozinha' | 'Quarto' | 'Banheiro';

type GiftTemplate = {
  category: GiftCategory;
  name: string;
  imageUrl: string;
};

const GIFT_TEMPLATES: GiftTemplate[] = [
  {
    category: "Cozinha",
    name: "Jogo de panela",
    imageUrl: "/images/products/jogo_panelas.png",
  },
  {
    category: "Cozinha",
    name: "Kit de facas",
    imageUrl: "/images/products/kit_facas.jpg",
  },
  {
    category: "Cozinha",
    name: "Panela de pressão 4,5 L",
    imageUrl: "/images/products/panela_pressao.jpg",
  },
  {
    category: "Cozinha",
    name: "Misteira",
    imageUrl: "/images/products/misteira.jpg",
  },
  {
    category: "Cozinha",
    name: "Potes de Plastico",
    imageUrl: "/images/products/potes_plastico.jpeg",
  },
  {
    category: "Cozinha",
    name: "Jogo de copos",
    imageUrl: "/images/products/jogo_copos.jpg",
  },
  {
    category: "Cozinha",
    name: "Jogo de xícaras",
    imageUrl: "/images/products/jogo_xicaras.jpg",
  },
  {
    category: "Cozinha",
    name: "Jarra de suco (vidro)",
    imageUrl: "/images/products/jarra_suco.jpg",
  },
  {
    category: "Cozinha",
    name: "Garrafa de água (vidro)",
    imageUrl: "/images/products/garrafa_agua.jpg",
  },
  {
    category: "Cozinha",
    name: "Filtro",
    imageUrl: "/images/products/filtro.jpg",
  },
  {
    category: "Cozinha",
    name: "Jogo porta-temperos",
    imageUrl: "/images/products/porta_tempeiros.jpg",
  },
  {
    category: "Cozinha",
    name: "Conjunto de potes para mantimentos",
    imageUrl: "/images/products/porta_mantimentos.jpeg",
  },
  {
    category: "Cozinha",
    name: "Pipoqueira",
    imageUrl: "/images/products/pipoqueira.jpg",
  },
  {
    category: "Cozinha",
    name: "Saca-Rolha",
    imageUrl: "/images/products/sacarolha.jpg",
  },
  {
    category: "Cozinha",
    name: "Fruteira",
    imageUrl: "/images/products/fruteira.jpeg",
  },
  {
    category: "Cozinha",
    name: "Descascador de cenoura e ralador",
    imageUrl: "/images/products/ralador.jpg",
  },
  {
    category: "Cozinha",
    name: "Kit-Peneiras",
    imageUrl: "/images/products/peneiras.jpeg",
  },
  {
    category: "Cozinha",
    name: "Jogo de Sobremesa",
    imageUrl: "/images/products/sobremesa.jpeg",
  },
  {
    category: "Cozinha",
    name: "Colher de Sorvete",
    imageUrl: "/images/products/sorvete.jpeg",
  },
  {
    category: "Cozinha",
    name: "Kit colheres cozinha",
    imageUrl: "/images/products/kit_colheres_cozinha.jpg",
  },
  {
    category: "Cozinha",
    name: "Queijeira",
    imageUrl: "/images/products/queijeira.png",
  },
  {
    category: "Cozinha",
    name: "Porta-detergente + porta-esponja",
    imageUrl: "/images/products/porta_detergente.jpg",
  },
  {
    category: "Cozinha",
    name: "Tábua de cortar carne",
    imageUrl: "/images/products/tabua_cortar_carne.jpg",
  },
  {
    category: "Cozinha",
    name: "Amolador de Facas",
    imageUrl: "/images/products/amola_faca.jpeg",
  },
  {
    category: "Cozinha",
    name: "Cuscuzeira",
    imageUrl: "/images/products/cucuz.jpeg",
  },
  {
    category: "Cozinha",
    name: "Escorredor de louça (inox)",
    imageUrl: "/images/products/escorredor_louca.jpg",
  },
  {
    category: "Cozinha",
    name: "Forma de bolo",
    imageUrl: "/images/products/forma_bolo.jpg",
  },
  {
    category: "Cozinha",
    name: "Tabuleiro M",
    imageUrl: "/images/products/tabuleiro.jpg",
  },
  {
    category: "Cozinha",
    name: "Tabuleiro G",
    imageUrl: "/images/products/tabuleiro.jpg",
  },
  {
    category: "Cozinha",
    name: "Jogo de pano de prato",
    imageUrl: "/images/products/pano.jpg",
  },
  {
    category: "Cozinha",
    name: "Liquidificador",
    imageUrl: "/images/products/liquidificador.jpg",
  },
  {
    category: "Cozinha",
    name: "Tapete para cozinha",
    imageUrl: "/images/products/tapete.jpg",
  },
  {
    category: "Cozinha",
    name: "Escorredor de macarrão",
    imageUrl: "/images/products/escorredor.jpg",
  },

  // ----------------QUARTO--------------------------------------
  {
    category: "Quarto",
    name: "Kit 2 travesseiros",
    imageUrl: "/images/products/travesseiros.jpeg",
  },
  {
    category: "Quarto",
    name: "Jogo de lençol cama queen",
    imageUrl: "/images/products/quarto-01.jpg",
  },
  {
    category: "Quarto",
    name: "Jogo de lençol cama queen",
    imageUrl: "/images/products/quarto-02.jpg",
  },
  {
    category: "Quarto",
    name: "Jogo de cama queen",
    imageUrl: "/images/products/quarto-03.jpg",
  },
  {
    category: "Quarto",
    name: "Cobertor casal",
    imageUrl: "/images/products/quarto-04.jpg",
  },
  {
    category: "Quarto",
    name: "Ferro de passar",
    imageUrl: "/images/products/quarto-05.jpg",
  },

  {
    category: "Banheiro",
    name: "Jogo de toalha de banho",
    imageUrl: "/images/products/banheiro-01.jpg",
  },

  // ----------------BANHEIRO--------------------------------------
  {
    category: "Banheiro",
    name: "Jogo de toalha de banho",
    imageUrl: "/images/products/banheiro-02.jpg",
  },
  {
    category: "Banheiro",
    name: "Toalhas de rosto (2 unidades)",
    imageUrl: "/images/products/banheiro-03.jpg",
  },
  {
    category: "Banheiro",
    name: "Lixeira inox",
    imageUrl: "/images/products/banheiro-04.jpg",
  },
  {
    category: "Banheiro",
    name: "Tapete para banheiro",
    imageUrl: "/images/products/banheiro-05.jpg",
  },
  {
    category: "Banheiro",
    name: "Kit banheiro",
    imageUrl: "/images/products/banheiro-06.jpg",
  },
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

