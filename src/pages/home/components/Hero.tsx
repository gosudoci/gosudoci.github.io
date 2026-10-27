import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToTarget } from '@/components/base/smoothScroll';
import GridLines from '@/components/base/GridLines';
import { useCurtain } from '@/components/base/useCurtain';

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);

  // 화면 아래에 닿으면 멈추고, 검은 Experience 가 덮어 올라올수록 어둡게
  useCurtain(containerRef, 'experience');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 움직임 줄이기 설정이면 애니메이션 없이 바로 보여줌
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 큰 제목은 아래에서 위로 '가려졌다 드러나는' 방식
      tl.fromTo('.hero-word', { yPercent: 110 }, { yPercent: 0, duration: 1 })
        .fromTo('.hero-headline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
        .fromTo('.hero-subcopy', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.5');
    }, el);

    return () => ctx.revert();
  }, []);

  const scrollToExperience = () => scrollToTarget('#experience');

  return (
    <section
      ref={containerRef}
      className="sticky z-0 w-full bg-white overflow-hidden"
      aria-label="Hero"
    >
      <GridLines />
      {/* 덮일 때 어두워지는 막 */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black"
        style={{ opacity: 'calc(var(--cover, 0) * 0.6)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl min-h-[72svh] md:min-h-[78svh] px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-24 flex flex-col items-center justify-between gap-16 text-center">
        {/* 큰 제목 */}
        <h1 className="font-montserrat font-semibold text-app-black leading-[0.9] tracking-[-0.05em] text-[19vw] md:text-[clamp(5rem,16.5vw,15rem)]">
          <span className="block overflow-hidden pb-[0.08em] px-[0.08em] -mx-[0.08em]">
            <span className="hero-word block">Portfolio</span>
          </span>
        </h1>

        {/* 아래 — 소개 문구와 버튼 (가운데 정렬) */}
        <div className="flex flex-col items-center gap-10">
          <div>
            <p className="hero-headline text-xl md:text-2xl lg:text-[28px] font-medium text-app-black leading-snug mb-4 md:mb-5">
              안녕하세요. 더 나은 결과물을 만드는<br />
              디자이너, 고수현입니다.
            </p>
            <p className="hero-subcopy text-base text-app-gray max-w-xl mx-auto leading-relaxed">
              상세페이지부터 광고소재, 숏폼까지.<br />
              기획부터 디자인까지 직접 설계해,<br />
              보는 순간 사고 싶어지는 흐름을 만듭니다.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToExperience}
            className="hero-cta group inline-flex items-center gap-2 px-8 py-3.5 bg-app-black text-white text-sm md:text-base font-medium rounded-full hover:bg-app-black/90 transition duration-300 active:scale-[0.97] cursor-pointer whitespace-nowrap"
          >
            작업물 보기
            <i className="ri-arrow-down-line transition-transform duration-300 group-hover:translate-y-0.5"></i>
          </button>
        </div>
      </div>
    </section>
  );
}