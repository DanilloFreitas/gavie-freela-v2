import { products } from '../data/products.js';
import { productCard } from './product-card.js';

export const collection = () => `
  <section class="collection" id="colecao" aria-labelledby="colecao-title">
    <div class="container">
      <h2 class="section-title" id="colecao-title" data-reveal>Escolhidas para você</h2>

      <div class="product-grid">
        ${products.map(productCard).join('\n')}
      </div>
    </div>
  </section>`;
