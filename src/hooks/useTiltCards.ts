import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Attaches a gentle mouse-driven 3D tilt with elastic snap-back to every
 * `.tilt-card` descendant inside the given container element.
 *
 * Returns a cleanup function that removes the listeners.
 */
export function attachTilt(container: HTMLElement, maxAngle = 5) {
  const cards = container.querySelectorAll<HTMLElement>('.tilt-card');
  if (!cards.length) return () => {};

  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    let rect: DOMRect | null = null;
    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;

    const apply = () => {
      raf = 0;
      gsap.to(card, {
        rotationY: pendingX * maxAngle * 2,
        rotationX: -pendingY * maxAngle * 2,
        y: -4,
        transformPerspective: 1100,
        transformOrigin: 'center',
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onEnter = () => {
      rect = card.getBoundingClientRect();
    };

    const onMove = (e: MouseEvent) => {
      if (!rect) rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      pendingX = px - 0.5;
      pendingY = py - 0.5;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      rect = null;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 1.3,
        ease: 'elastic.out(1, 0.55)',
        overwrite: 'auto',
      });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function useTiltCards<T extends HTMLElement = HTMLDivElement>(maxAngle = 5) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return attachTilt(el, maxAngle);
  }, [maxAngle]);
  return ref;
}