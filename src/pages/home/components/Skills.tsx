import { useEffect, useRef } from 'react';
import GridLines from '@/components/base/GridLines';
import { useCurtain } from '@/components/base/useCurtain';

// ========================================
// Skills Section
// ========================================

const skills = [
  { name: 'Photoshop', icon: 'ri-image-edit-line' },
  { name: 'Figma', icon: 'ri-layout-5-line' },
  { name: 'cafe24', icon: 'ri-store-2-line' },
  { name: 'html', icon: 'ri-html5-line' },
  { name: 'css', icon: 'ri-css3-line' },
  { name: 'nano banana', icon: 'ri-sparkling-line' },
  { name: 'midjourney', icon: 'ri-robot-2-line' },
  { name: 'Premiere Pro', icon: 'ri-film-line' },
  { name: 'CapCut', icon: 'ri-video-line' },
  { name: 'Higgsfield', icon: 'ri-video-ai-line' },
  { name: 'ChatGPT', icon: 'ri-openai-line' },
  { name: 'Claude', icon: 'ri-claude-line' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 화면 아래에 닿으면 멈추고, Contact 가 덮어 올라올수록 어둡게
  useCurtain(sectionRef, 'contact');

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="sticky z-0 py-28 md:py-36 bg-app-light"
      aria-label="Skills"
    >
      {/* 덮일 때 어두워지는 막 */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black"
        style={{ opacity: 'calc(var(--cover, 0) * 0.6)' }}
        aria-hidden="true"
      />

      <GridLines />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-14 md:mb-20">
          <h2 className="reveal reveal-mask font-montserrat font-light text-app-black leading-[0.95] tracking-[-0.04em] text-[12vw] md:text-[clamp(3.5rem,8vw,7.5rem)]">
            <span className="mask"><span>Skills</span></span>
          </h2>
          <div className="reveal reveal-delay-1 mt-6 md:mt-8 max-w-xl">
            <p className="text-base text-app-gray max-w-lg leading-relaxed">
              디자인과 크리에이티브 작업에 활용하는 툴입니다.
            </p>
          </div>
        </div>

        {/* Skills grid — 2 columns on desktop */}
        <div className="reveal reveal-delay-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-badge reveal reveal-delay-${(index % 4) + 2} flex items-center gap-3 bg-white px-5 py-4 rounded-xl cursor-default`}
            >
              <i className={`${skill.icon} text-xl text-app-black`} aria-hidden="true"></i>
              <span className="text-sm md:text-base font-medium text-app-black">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}