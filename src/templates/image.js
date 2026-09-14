/**
 * Helper de imagem responsiva.
 * Gera <picture> com WebP + fallback JPEG e srcset por largura.
 * O arquivo da MAIOR largura não recebe sufixo (ex.: hero.webp),
 * as demais recebem `-<largura>` (ex.: hero-800.webp).
 */

/** Larguras reais exportadas para cada asset (maior primeiro). */
export const IMAGE_WIDTHS = {
  hero: [1400, 800],
  sobre: [940, 640],
  'regata-perolas': [1180, 640],
  'blusa-canelada-gola-alta': [1180, 640],
  'regata-canelada': [1080, 640],
  'regata-com-strass': [640],
};

const BASE = 'assets/img';

const fileFor = (name, width, widths, ext) =>
  `${BASE}/${name}${width === widths[0] ? '' : `-${width}`}.${ext}`;

/**
 * @param {object} options
 * @param {string} options.name      slug do asset (chave de IMAGE_WIDTHS)
 * @param {string} options.alt       texto alternativo
 * @param {string} [options.sizes]   atributo sizes
 * @param {string} [options.className] classes do <img>
 * @param {string} [options.focus]   object-position vertical (ex.: '63%')
 * @param {'lazy'|'eager'} [options.loading]
 * @param {string} [options.fetchpriority]
 */
export function picture({
  name,
  alt,
  sizes = '100vw',
  className = '',
  focus,
  loading = 'lazy',
  fetchpriority,
}) {
  const widths = IMAGE_WIDTHS[name];
  if (!widths) throw new Error(`Asset desconhecido: ${name}`);

  const srcset = [...widths]
    .sort((a, b) => a - b)
    .map((w) => `${fileFor(name, w, widths, 'webp')} ${w}w`)
    .join(', ');

  const style = focus ? ` style="object-position:50% ${focus}"` : '';
  const priority = fetchpriority ? ` fetchpriority="${fetchpriority}"` : '';
  const decoding = loading === 'eager' ? 'sync' : 'async';

  return `<picture>
            <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
            <img src="${BASE}/${name}.jpg" alt="${alt}" class="${className}"${style}
                 loading="${loading}" decoding="${decoding}"${priority}>
          </picture>`;
}
