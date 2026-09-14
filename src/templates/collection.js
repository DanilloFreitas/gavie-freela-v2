import { products } from '../data/products.js';
import { productCard } from './product-card.js';

const watermarkLine = Array(3).fill('Gavie').join('&nbsp;&nbsp;&nbsp;&nbsp;');
const watermark = Array(6)
  .fill(`<p>${watermarkLine}</p>`)
  .join('');

export const collection = () => `
  <section class="collection" id="colecao" aria-labelledby="colecao-title">
    <div class="container">
      <h2 class="section-title" id="colecao-title" data-reveal>Escolhidas para você</h2>

      <div class="product-grid">
        ${products.map(productCard).join('\n')}
      </div>
    </div>

    <div class="collection__watermark" aria-hidden="true">${watermark}</div>
  </section>`;
