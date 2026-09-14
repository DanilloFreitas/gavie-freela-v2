import { formatPrice } from '../data/products.js';
import { picture } from './image.js';

const swatch = (color, index) => `
              <li>
                <button class="swatch" type="button"
                        role="radio" aria-checked="${index === 0}"
                        tabindex="${index === 0 ? 0 : -1}"
                        data-color="${color.name}"
                        ${color.image ? `data-color-image="${color.image}"` : ''}
                        style="--swatch:${color.hex}">
                  <span class="sr-only">${color.name}</span>
                </button>
              </li>`;

const size = (value, index) => `
              <li>
                <button class="size" type="button"
                        role="radio" aria-checked="${index === 0}"
                        tabindex="${index === 0 ? 0 : -1}"
                        data-size="${value}">${value}</button>
              </li>`;

export const productCard = (product) => `
      <article class="product-card" data-reveal data-product data-name="${product.name}" data-price="${formatPrice(product.price)}">
        <div class="product-card__media">
          ${picture({
            name: product.image,
            alt: product.alt,
            sizes: '(min-width: 1024px) 607px, (min-width: 640px) 45vw, 90vw',
            className: 'product-card__img',
            focus: product.focus,
          })}
          ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
        </div>

        <div class="product-card__info">
          <h3 class="product-card__name">${product.name}</h3>

          <ul class="swatches" role="radiogroup" aria-label="Cor — ${product.name}" data-swatches>
            ${product.colors.map(swatch).join('')}
          </ul>

          <p class="field-label" id="tam-${product.id}">Tamanho</p>
          <ul class="sizes" role="radiogroup" aria-labelledby="tam-${product.id}" data-sizes>
            ${product.sizes.map(size).join('')}
          </ul>

          <p class="product-card__price">${formatPrice(product.price)}</p>

          <a class="btn btn--outline product-card__cta"
             href="#" target="_blank" rel="noopener"
             data-whatsapp-product>Comprar via WhatsApp / Retirada</a>
        </div>
      </article>`;
