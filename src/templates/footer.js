import { site, whatsappLink } from '../data/site.js';

const resolve = (href) =>
  href === '{{whatsapp}}'
    ? whatsappLink('Oi! Vim pelo site da Gavie e preciso de ajuda.')
    : href;

const footerLink = (link) =>
  link.action === 'size-guide'
    ? `<button type="button" class="footer__link" data-size-guide-open>${link.label}</button>`
    : `<a class="footer__link" href="${resolve(link.href)}"${
        link.external ? ' target="_blank" rel="noopener"' : ''
      }>${link.label}</a>`;

const column = (col) => `
        <div class="footer__col">
          <h2 class="footer__heading">${col.title}</h2>
          <ul class="footer__list">
            ${col.links.map((link) => `<li>${footerLink(link)}</li>`).join('')}
          </ul>
        </div>`;

export const footer = () => `
  <footer class="site-footer" id="contato">
    <div class="container">
      <div class="footer__top">
        <div class="footer__col footer__col--brand">
          <p class="footer__brand">${site.name}</p>
          <p class="footer__tagline">${site.tagline}</p>
        </div>

        ${site.footer.columns.map(column).join('')}

        <div class="footer__col">
          <h2 class="footer__heading">Contato</h2>
          <address class="footer__address">
            ${site.address.street}<br>
            ${site.address.complement}<br>
            ${site.address.city} — ${site.address.state}, ${site.address.zip}
          </address>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">${site.footer.copyright}</p>
      </div>
    </div>
  </footer>`;
