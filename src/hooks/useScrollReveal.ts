import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  selector?: string;
  y?: number;
  blur?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T | null>(null);
  const {
    selector = '.gsap-reveal',
    y = 50,
    blur = 14,
    stagger = 0.12,
    duration = 1.4,
    start = 'top 88%',
    once = true,
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y,
          opacity: 0,
          filter: `blur(${blur}px)`,
          willChange: 'transform, filter, opacity',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
          onComplete: () => {
            targets.forEach((t) => {
              t.style.willChange = 'auto';
            });
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, y, blur, stagger, duration, start, once, ease]);

  return ref;
}