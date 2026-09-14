import { site } from '../data/site.js';

const group = (hidden) => `
        <ul class="marquee__group"${hidden ? ' aria-hidden="true"' : ''}>
          ${site.marquee
            .map((item) => `<li class="marquee__item">${item}</li>`)
            .join('')}
        </ul>`;

/**
 * Faixa dourada de benefícios.
 * Duplicamos o grupo (o segundo é aria-hidden) para o loop ficar contínuo.
 */
export const marquee = () => `
  <div class="marquee" role="region" aria-label="Diferenciais da loja">
    <div class="marquee__track">
      ${group(false)}
      ${group(true)}
    </div>
  </div>`;
