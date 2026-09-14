/**
 * Catálogo. Cada produto vira um <article class="product-card"> no build.
 *
 * focus  → object-position vertical da foto (enquadramento definido no Figma)
 * colors → hex exatos das swatches do Figma
 *          color.image (opcional) → slug do arquivo real da peça nessa cor,
 *          em public/assets/img/colors/<slug>.{jpg,webp}. Ao clicar na cor,
 *          a foto do card troca para essa imagem; sem `image`, mantém a foto
 *          padrão do produto (ainda não fotografamos essa cor).
 */

export const SIZES = ['P', 'M', 'G', 'GG'];

export const products = [
  {
    id: 'regata-perolas',
    name: 'Regata de Pérolas',
    price: 89.9,
    badge: 'Mais vendida',
    image: 'regata-perolas',
    alt: 'Regata de pérolas Gavie vista de frente',
    focus: '63%',
    colors: [
      { name: 'Preto', hex: '#16140F' },
      { name: 'Areia', hex: '#DCC7A6', image: 'regata-perolas-areia' },
      { name: 'Off-white', hex: '#F7F4EE', image: 'regata-perolas-off-white' },
      { name: 'Rosa', hex: '#F3BFD0', image: 'regata-perolas-rosa' },
      { name: 'Rosé', hex: '#B98F83', image: 'regata-perolas-rose' },
    ],
    sizes: SIZES,
  },
  {
    id: 'blusa-canelada-gola-alta',
    name: 'Blusa Canelada Gola Alta',
    price: 79.9,
    badge: null,
    image: 'blusa-canelada-gola-alta',
    alt: 'Blusa canelada de gola alta Gavie vista de frente',
    focus: '28%',
    colors: [
      /* Off-white primeiro: é a cor da foto padrão do card (product.image),
         então o swatch selecionado ao carregar bate com a foto exibida. */
      { name: 'Off-white', hex: '#F7F4EE' },
      { name: 'Preto', hex: '#16140F', image: 'blusa-canelada-gola-alta-preto' },
      { name: 'Areia', hex: '#DCC7A6', image: 'blusa-canelada-gola-alta-areia' },
      { name: 'Rosa', hex: '#F3BFD0', image: 'blusa-canelada-gola-alta-rosa' },
      { name: 'Rosé', hex: '#B98F83' },
    ],
    sizes: SIZES,
  },
  {
    id: 'regata-com-strass',
    name: 'Regata com Strass',
    price: 84.9,
    badge: null,
    image: 'regata-com-strass',
    alt: 'Regata com strass Gavie vista de frente',
    focus: '50%',
    colors: [
      { name: 'Areia', hex: '#DCC7A6' },
      { name: 'Off-white', hex: '#F7F4EE', image: 'regata-com-strass-off-white' },
    ],
    sizes: SIZES,
  },
  {
    id: 'regata-canelada',
    name: 'Regata Canelada',
    price: 74.9,
    badge: 'Nova',
    image: 'regata-canelada',
    alt: 'Regata canelada Gavie vista de frente',
    focus: '15%',
    // Só existe foto real na cor verde — o swatch "Areia" foi removido até
    // termos uma foto dessa peça nessa cor (ver nota no topo do arquivo).
    colors: [{ name: 'Verde oliva claro', hex: '#C7C0A3' }],
    sizes: SIZES,
  },
];

export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
