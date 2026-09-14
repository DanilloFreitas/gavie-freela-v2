/**
 * A animação da faixa é 100% CSS (infinita), mas alguns navegadores
 * "derrubam" animações infinitas de longa duração quando a aba fica em
 * segundo plano por um tempo — ao voltar, a faixa trava numa posição ou
 * some. Ao readquirir foco/visibilidade, força a animação a continuar.
 */
export function initMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;

  const resume = () => {
    if (document.hidden) return;
    track.getAnimations().forEach((anim) => {
      if (anim.playState === 'paused' || anim.playState === 'idle') {
        anim.play();
      }
    });
  };

  document.addEventListener('visibilitychange', resume);
  window.addEventListener('pageshow', resume);
}
