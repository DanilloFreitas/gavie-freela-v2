import { site, whatsappLink } from '../data/site.js';
import { picture } from './image.js';

const letters = (text) =>
  text
    .split('')
    .map((char, i) => `<span style="--i:${i}">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

export const about = () => `
  <section class="about" id="sobre" aria-labelledby="sobre-title">
    <div class="container about__inner">
      <figure class="about__media" data-reveal>
        ${picture({
          name: site.about.image,
          alt: site.about.alt,
          sizes: '(min-width: 1024px) 575px, 90vw',
          className: 'about__img',
          focus: site.about.focus,
        })}
      </figure>

      <div class="about__copy" data-reveal>
        <img class="about__mark" src="assets/brand/lotus.png" alt="" width="108" height="103" aria-hidden="true">
        <h2 class="about__title" id="sobre-title">${site.about.title}</h2>
        <p class="about__text">${site.about.text}</p>
        <a class="btn btn--solid about__cta"
           href="${whatsappLink('Oi! Vim pelo site da Gavie e gostaria de saber mais sobre as peças.')}"
           target="_blank" rel="noopener">
          <span class="about__cta-row" aria-hidden="true">${letters(site.about.cta)}</span>
          <span class="about__cta-row about__cta-row--alt" aria-hidden="true">${letters(site.about.cta)}</span>
          <span class="sr-only">${site.about.cta}</span>
        </a>
      </div>
    </div>
  </section>`;
