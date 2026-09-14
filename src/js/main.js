import { initStickyHeader } from './modules/sticky-header.js';
import { initMobileNav } from './modules/mobile-nav.js';
import { initProductCards } from './modules/product-card.js';
import { initReveal } from './modules/reveal.js';
import { initSizeGuide } from './modules/size-guide.js';
import { initMarquee } from './modules/marquee.js';

const boot = () => {
  initStickyHeader();
  initMobileNav();
  initProductCards();
  initReveal();
  initSizeGuide();
  initMarquee();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
