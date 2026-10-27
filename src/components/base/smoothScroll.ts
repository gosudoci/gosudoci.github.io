import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;

/**
 * 부드러운 관성 스크롤 시작 (움직임 줄이기 설정이면 켜지 않음).
 * 상세 창(모달)이 열려 있는 동안은 멈추고, 창 안은 원래대로 스크롤됩니다.
 */
export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  lenis = new Lenis({
    lerp: 0.1,
    prevent: (node) => !!node.closest?.('.modal-backdrop, [role="dialog"]'),
  });

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  // body 에 modal-open 이 붙으면 멈춤
  const syncModal = () => {
    if (document.body.classList.contains('modal-open')) lenis?.stop();
    else lenis?.start();
  };
  const observer = new MutationObserver(syncModal);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  return () => {
    observer.disconnect();
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

/** 메뉴·버튼에서 섹션으로 부드럽게 이동 ('#experience' 또는 0 = 맨 위) */
export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
}
