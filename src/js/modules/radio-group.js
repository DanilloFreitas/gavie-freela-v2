/**
 * Comportamento de radiogroup para grupos de botões (cores e tamanhos).
 * Segue o padrão WAI-ARIA: apenas o item selecionado fica no tab order
 * e as setas movem a seleção.
 */
export function initRadioGroup(group, onChange) {
  if (!group) return;

  const options = [...group.querySelectorAll('[role="radio"]')];
  if (!options.length) return;

  const select = (option, focus = true) => {
    options.forEach((item) => {
      const active = item === option;
      item.setAttribute('aria-checked', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    if (focus) option.focus();
    onChange?.(option);
  };

  group.addEventListener('click', (event) => {
    const option = event.target.closest('[role="radio"]');
    if (option && options.includes(option)) select(option, false);
  });

  group.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', ' ', 'Enter'];
    if (!keys.includes(event.key)) return;

    const current = options.findIndex(
      (item) => item.getAttribute('aria-checked') === 'true'
    );
    event.preventDefault();

    if (event.key === ' ' || event.key === 'Enter') {
      select(event.target.closest('[role="radio"]') ?? options[current]);
      return;
    }

    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const next = (current + step + options.length) % options.length;
    select(options[next]);
  });

  return {
    get value() {
      return options.find((item) => item.getAttribute('aria-checked') === 'true');
    },
  };
}
