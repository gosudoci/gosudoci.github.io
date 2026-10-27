import { useCallback, useEffect, useRef, useState } from 'react';
import type { ExperienceProject } from '@/data/projects';
import DetailPageTab from '@/pages/home/components/experience/DetailPageTab';
import AdCreativeTab from '@/pages/home/components/experience/AdCreativeTab';
import ShortformTab from '@/pages/home/components/experience/ShortformTab';

interface ProjectModalProps {
  project: ExperienceProject;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeTabId, setActiveTabId] = useState(project.detail.tabs[0].id);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [handleEsc]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // 흰 카드 바깥(어두운 영역)을 누르면 닫기
    if (e.target === backdropRef.current || e.target === contentRef.current) onClose();
  };

  const activeTab =
    project.detail.tabs.find((tab) => tab.id === activeTabId) ||
    project.detail.tabs[0];

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.brand} 프로젝트 상세`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-5 right-5 md:top-8 md:right-8 z-[110] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-app-black text-white hover:bg-app-black/80 backdrop-blur-sm transition duration-300 cursor-pointer"
        aria-label="닫기"
      >
        <i className="ri-close-line text-xl md:text-2xl"></i>
      </button>

      <div
        ref={contentRef}
        className="modal-content w-full max-w-[1000px] mx-auto py-6 md:py-12 px-3 md:px-6"
      >
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Project intro */}
          <div className="px-5 md:px-10 pt-9 md:pt-12 pb-4 md:pb-6">
            <p className="text-sm font-medium text-app-gray mb-2">
              {project.brand}
            </p>
            <h3 className="text-xl md:text-2xl font-medium text-app-black mb-7 leading-snug">
              {project.detail.title}
            </h3>

            {/* Info grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              {project.detail.info.map((row) => (
                <div key={row.label}>
                  <p className="text-xs text-app-gray mb-1.5">
                    {row.label}
                  </p>
                  <p className="text-sm text-app-black leading-snug">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="space-y-1 mb-8">
              {project.detail.overview.map((line) => (
                <p
                  key={line}
                  className="text-[15px] md:text-base text-app-black leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Work points */}
            <div>
              <p className="text-xs md:text-sm font-medium text-app-black mb-4">
                작업 포인트
              </p>
              <ol className="space-y-3 list-decimal pl-5 marker:text-app-gray">
                {project.detail.points.map((point) => (
                  <li key={point.no} className="pl-1">
                    <p className="text-[15px] text-app-gray leading-relaxed">
                      <span className="font-medium text-app-black">
                        {point.title}
                      </span>
                      <span className="mx-1.5 text-app-gray/40">—</span>
                      {point.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 md:px-10 pt-6 md:pt-8 pb-12 md:pb-16">
            <div className="inline-flex flex-wrap gap-1 bg-app-light rounded-full p-1 mb-7 md:mb-9">
              {project.detail.tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition duration-300 cursor-pointer whitespace-nowrap ${
                    tab.id === activeTab.id
                      ? 'bg-app-black text-white'
                      : 'text-app-gray hover:text-app-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab.type === 'detail' ? (
              <DetailPageTab tab={activeTab} brand={project.brand} />
            ) : null}
            {activeTab.type === 'ads' ? <AdCreativeTab tab={activeTab} brand={project.brand} /> : null}
            {activeTab.type === 'shortform' ? (
              <ShortformTab tab={activeTab} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}