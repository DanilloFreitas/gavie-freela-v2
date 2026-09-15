/** Retoma a animação da faixa se o navegador a pausar em segundo plano. */
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
