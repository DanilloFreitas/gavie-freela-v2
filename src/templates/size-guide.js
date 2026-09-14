import { sizeGuide } from '../data/size-guide.js';

const row = (r) => `
              <tr>
                <th scope="row">${r.size}</th>
                <td>${r.numbering}</td>
                <td>${r.busto}</td>
                <td>${r.cintura}</td>
                <td>${r.quadril}</td>
              </tr>`;

/**
 * Modal único, compartilhado por todos os cards de produto — abre via
 * <button data-size-guide-open> e mostra a tabela de medidas padrão.
 */
export const sizeGuideDialog = () => `
  <dialog id="size-guide" class="size-guide" aria-labelledby="size-guide-title">
    <div class="size-guide__panel">
      <button type="button" class="size-guide__close" data-size-guide-close aria-label="Fechar guia de medidas">
        &times;
      </button>

      <h2 class="size-guide__title" id="size-guide-title">Guia de medidas</h2>
      <p class="size-guide__subtitle">Medidas do corpo em centímetros (${sizeGuide.unit}).</p>

      <div class="size-guide__table-wrap">
        <table class="size-guide__table">
          <thead>
            <tr>
              <th scope="col">Tam.</th>
              <th scope="col">Numeração</th>
              <th scope="col">Busto</th>
              <th scope="col">Cintura</th>
              <th scope="col">Quadril</th>
            </tr>
          </thead>
          <tbody>
            ${sizeGuide.rows.map(row).join('')}
          </tbody>
        </table>
      </div>

      <p class="size-guide__note">${sizeGuide.note}</p>
    </div>
  </dialog>`;
