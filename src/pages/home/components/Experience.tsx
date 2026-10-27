import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { experienceProjects, experienceStats } from '@/data/projects';
import type { ExperienceProject } from '@/data/projects';
import ProjectModal from '@/pages/home/components/experience/ProjectModal';
import Img from '@/components/base/Img';
import GridLines from '@/components/base/GridLines';

// ========================================
// Work Experience Section
// ========================================

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

interface StatCellProps {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}

function StatCell({ value, suffix, label, active }: StatCellProps) {
  const display = useCountUp(value, active);

  return (
    <div className="bg-[#333333] rounded-lg px-4 py-7 md:py-9 text-center">
      <p className="font-montserrat font-light text-3xl md:text-4xl lg:text-5xl text-white leading-none tabular-nums">
        {display}
        <span
          className={`ml-0.5 ${suffix === '+' ? 'align-top text-xl md:text-2xl lg:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}
        >
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-sm text-white/75">{label}</p>
    </div>
  );
}

export default function Experience() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsActive, setStatsActive] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ExperienceProject | null>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el || statsActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [statsActive]);

  const openProject = (project: ExperienceProject) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="experience" className="relative z-10 py-24 md:py-32 bg-app-black text-white" aria-label="Work Experience">
      <GridLines tone="dark" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="reveal reveal-mask font-montserrat font-light text-white leading-[0.95] tracking-[-0.04em] text-[12vw] md:text-[clamp(3.5rem,8vw,7.5rem)]">
            <span className="mask"><span>Work Experience</span></span>
          </h2>
          <div className="reveal reveal-delay-1 mt-6 md:mt-8 max-w-xl">
            <p className="text-sm md:text-base font-medium text-white mb-5">
              실무 프로젝트
            </p>
            <p className="text-base text-white/70 leading-relaxed">
              건강기능식품과 남성 전용 의료기기, 두 브랜드의 상세페이지·광고소재·숏폼 작업물
            </p>
          </div>
        </div>

        {/* Stat summary */}
        <div
          ref={statsRef}
          className="reveal reveal-delay-1 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-14 md:mb-20"
        >
          {experienceStats.map((stat) => (
            <StatCell
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              active={statsActive}
            />
          ))}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {experienceProjects.map((project, index) => (
            <article
              key={project.id}
              className={`reveal reveal-delay-${index + 1} group bg-white text-app-black p-2.5 md:p-3.5 cursor-pointer transition-colors duration-500 hover:bg-[#ededed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
              onClick={() => openProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(project);
                }
              }}
              aria-label={`${project.brand} 프로젝트 상세 보기`}
            >
              {/* 16:10 thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                {project.thumbnailStrip?.length ? (
                  /* 작업물이 옆으로 천천히 흐르는 띠 (마우스를 올리면 멈춤) */
                  <div className="marquee absolute inset-0 overflow-hidden">
                    <ul className="marquee-track flex h-full w-max">
                      {[...project.thumbnailStrip, ...project.thumbnailStrip].map((src, i, all) => (
                        <li key={`${src}-${i}`} className="h-full shrink-0 pr-[2px]" aria-hidden={i >= all.length / 2}>
                          <Img
                            src={src}
                            alt={i < all.length / 2 ? `${project.brand} 광고소재 ${i + 1}` : ''}
                            className="block h-full w-auto"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Img
                      src={project.thumbnail}
                      alt={`${project.brand} 프로젝트 썸네일`}
                      title={`${project.brand} - ${project.category} 프로젝트`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* 마우스를 올리면 살짝 어두워지며 안내가 나타남 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-colors duration-500">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-app-black opacity-0 translate-y-2 transition duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    프로젝트 보기
                    <i className="ri-arrow-right-up-line"></i>
                  </span>
                </div>
              </div>

              {/* Card body — 왼쪽 큰 이름, 오른쪽 작업 정보 */}
              <div className="px-2 md:px-3 pt-5 md:pt-6 pb-3 md:pb-4 flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="text-2xl md:text-[32px] font-normal tracking-[-0.02em] leading-tight">
                    {project.brand}
                  </h3>
                  <p className="mt-2 text-base text-app-gray leading-relaxed">
                    {project.summary}
                  </p>
                </div>
                <ul className="shrink-0 text-right text-sm leading-relaxed text-app-gray">
                  <li className="text-app-black">{project.category}</li>
                  {project.tags.split(' · ').map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                  <li>{project.badge.replace('실무 · ', '')}</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject ? (
        // 섹션 밖(body)에 그려서 메뉴바보다 위에 뜨도록
        createPortal(<ProjectModal project={selectedProject} onClose={closeProject} />, document.body)
      ) : null}
    </section>
  );
}