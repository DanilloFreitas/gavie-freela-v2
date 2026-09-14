import { site } from '../data/site.js';
import { picture } from './image.js';

export const hero = () => `
  <section class="hero" id="topo" aria-labelledby="hero-title">
    <div class="hero__media">
      ${picture({
        name: site.hero.image,
        alt: site.hero.alt,
        sizes: '100vw',
        className: 'hero__img',
        loading: 'eager',
        fetchpriority: 'high',
      })}
      <div class="hero__overlay" aria-hidden="true"></div>
    </div>

    <div class="hero__content">
      <img class="hero__mark" src="assets/brand/lotus.png" alt="" width="70" height="66" aria-hidden="true">
      <h1 class="hero__title" id="hero-title">${site.hero.title}</h1>
      <p class="hero__subtitle">${site.hero.subtitle}</p>
      <p class="hero__highlight">${site.hero.highlight}</p>
    </div>
  </section>`;
