/** Sombra sutil no header assim que a página rola. */
export function initStickyHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const update = () => {
    header.dataset.scrolled = String(window.scrollY > 8);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}
