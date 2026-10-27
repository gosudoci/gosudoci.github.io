import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * '덮이는 섹션' 효과.
 * 이 섹션은 화면 아래에 닿으면 제자리에 멈추고(sticky),
 * 다음 섹션(nextId)이 위로 올라와 덮을수록 --cover 값(0~1)이 커집니다.
 * 섹션에는 className="sticky" 와 --cover 로 어두워지는 막을 함께 넣어 주세요.
 */
export function useCurtain(ref: RefObject<HTMLElement | null>, nextId: string) {
  useEffect(() => {
    const el = ref.current;
    const next = document.getElementById(nextId);
    if (!el || !next) return;

    const fitTop = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    const dim = () => {
      // 이 섹션 아래끝과 다음 섹션 위끝이 겹친 만큼 (처음엔 0)
      const overlap = el.getBoundingClientRect().bottom - next.getBoundingClientRect().top;
      const covered = overlap / Math.min(el.offsetHeight, window.innerHeight);
      el.style.setProperty('--cover', String(Math.min(Math.max(covered, 0), 1)));
    };

    fitTop();
    dim();
    const resize = new ResizeObserver(fitTop);
    resize.observe(el);
    window.addEventListener('scroll', dim, { passive: true });
    window.addEventListener('resize', fitTop);
    return () => {
      resize.disconnect();
      window.removeEventListener('scroll', dim);
      window.removeEventListener('resize', fitTop);
    };
  }, [ref, nextId]);
}
