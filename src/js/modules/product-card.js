import { initRadioGroup } from './radio-group.js';
import { WHATSAPP_NUMBER } from '../config.js';

const buildLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/**
 * Liga cores + tamanhos ao CTA de WhatsApp de cada card.
 * A mensagem é remontada a cada seleção.
 */
/**
 * iOS Safari só aplica :active a elementos com um listener de toque
 * associado (ao elemento ou a um ancestral, ex. document.body).
 * Isso habilita o zoom por toque nas fotos dos produtos.
 */
const enableTouchActiveState = () => {
  document.body.addEventListener('touchstart', () => {}, { passive: true });
};

const COLOR_IMAGE_BASE = 'assets/img/colors';

/**
 * Troca a foto do card para a peça na cor escolhida.
 * Guarda a foto padrão (jpg + webp) na 1ª troca para poder voltar a ela
 * quando a cor selecionada não tiver uma foto própria ainda.
 */
const setCardImage = (card, slug) => {
  const media = card.querySelector('.product-card__media');
  const img = media?.querySelector('.product-card__img');
  const source = media?.querySelector('source[type="image/webp"]');
  if (!media || !img) return;

  if (media.dataset.defaultSrc === undefined) {
    media.dataset.defaultSrc = img.src;
    media.dataset.defaultSrcset = source?.srcset ?? '';
  }

  if (slug) {
    img.src = `${COLOR_IMAGE_BASE}/${slug}.jpg`;
    if (source) source.srcset = `${COLOR_IMAGE_BASE}/${slug}.webp`;
  } else {
    img.src = media.dataset.defaultSrc;
    if (source) source.srcset = media.dataset.defaultSrcset;
  }
};

export function initProductCards() {
  enableTouchActiveState();

  document.querySelectorAll('[data-product]').forEach((card) => {
    const cta = card.querySelector('[data-whatsapp-product]');
    if (!cta) return;

    const name = card.dataset.name;
    const price = card.dataset.price;

    const state = { color: null, size: null };

    const sync = () => {
      const parts = [
        `Oi! Vim pelo site da Gavie e quero a *${name}*`,
        state.color ? `Cor: ${state.color}` : null,
        state.size ? `Tamanho: ${state.size}` : null,
        price ? `Valor: ${price}` : null,
      ].filter(Boolean);

      cta.href = buildLink(parts.join('\n'));
    };

    const swatches = initRadioGroup(
      card.querySelector('[data-swatches]'),
      (option) => {
        state.color = option.dataset.color;
        setCardImage(card, option.dataset.colorImage);
        sync();
      }
    );

    const sizes = initRadioGroup(card.querySelector('[data-sizes]'), (option) => {
      state.size = option.dataset.size;
      sync();
    });

    state.color = swatches?.value?.dataset.color ?? null;
    state.size = sizes?.value?.dataset.size ?? null;
    sync();
  });
}
