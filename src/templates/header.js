import { site } from '../data/site.js';

export const header = () => `
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  <header class="site-header" data-header>
    <div class="site-header__inner">
      <a class="brand" href="#topo" aria-label="Gavie — início">
        <img class="brand__mark" src="assets/brand/lotus.png" alt="" width="38" height="36" aria-hidden="true">
        <span class="brand__name">${site.name}</span>
      </a>

      <nav class="site-nav" aria-label="Navegação principal">
        <ul class="site-nav__list">
          ${site.nav
            .map(
              (item) => `
          <li><a class="site-nav__link" href="${item.href}">${item.label}</a></li>`
            )
            .join('')}
        </ul>
      </nav>

      <button class="nav-toggle" type="button"
              aria-expanded="false" aria-controls="menu-mobile"
              data-nav-toggle>
        <span class="sr-only">Abrir menu</span>
        <span class="nav-toggle__bars" aria-hidden="true"></span>
      </button>
    </div>

    <div class="mobile-menu" id="menu-mobile" data-nav-panel hidden>
      <nav aria-label="Navegação mobile">
        <ul class="mobile-menu__list">
          ${site.nav
            .map(
              (item) => `
          <li><a class="mobile-menu__link" href="${item.href}" data-nav-close>${item.label}</a></li>`
            )
            .join('')}
        </ul>
      </nav>
    </div>
  </header>`;
