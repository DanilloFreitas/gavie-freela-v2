/**
 * Guia de medidas — um único <dialog> compartilhado, aberto pelo botão
 * "Guia de medidas" de qualquer card de produto.
 */
export function initSizeGuide() {
  const dialog = document.getElementById('size-guide');
  const openers = document.querySelectorAll('[data-size-guide-open]');
  if (!dialog || !openers.length) return;

  const closeBtn = dialog.querySelector('[data-size-guide-close]');
  const panel = dialog.querySelector('.size-guide__panel');

  openers.forEach((btn) => {
    btn.addEventListener('click', () => dialog.showModal());
  });

  closeBtn?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (!panel.contains(event.target)) dialog.close();
  });
}
