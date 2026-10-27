import { useEffect, useState } from 'react';
import { withBase } from '@/components/base/withBase';
import { scrollToTarget } from '@/components/base/smoothScroll';
import GridLines from '@/components/base/GridLines';

// 이력서 PDF — public 폴더에 resume.pdf 라는 이름으로 넣으면 자동으로 연결됩니다.
// (파일이 없으면 "준비 중" 안내가 나옵니다)
const RESUME_URL = withBase('/resume.pdf');

// ========================================
// Contact Footer
// ========================================

export default function Contact() {
  const [resumeNotice, setResumeNotice] = useState(false);
  const [resumeReady, setResumeReady] = useState(false);

  useEffect(() => {
    fetch(RESUME_URL, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || '';
        setResumeReady(res.ok && type.includes('pdf'));
      })
      .catch(() => setResumeReady(false));
  }, []);

  return (
    <footer
      id="contact"
      className="relative z-10 bg-app-black text-white min-h-[100svh] flex flex-col pt-28 md:pt-36 pb-10"
      aria-label="Contact"
    >
      <GridLines tone="dark" />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16 flex-1 flex flex-col justify-between gap-20">
        {/* 큰 제목 — 아래에서 위로 드러남 */}
        <h2 className="reveal font-montserrat font-light leading-[0.95] tracking-[-0.04em] text-[13vw] md:text-[clamp(4rem,9vw,8.5rem)]">
          <span className="mask"><span>Thank you</span></span>
          <span className="mask"><span>for your time.</span></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
          {/* Left — 인사 */}
          <p className="reveal reveal-delay-1 text-white/75 text-lg md:text-xl max-w-md leading-relaxed">
            항상 배우고 먼저 도전하는 자세로,<br />
            귀사의 비전을 함께 그려나가고 싶습니다.<br />
            끝까지 읽어주셔서 감사합니다.
          </p>

          {/* Right — 연락처 (이메일 크게) */}
          <div className="reveal reveal-delay-2">
            <a
              href="mailto:gosudoci@gmail.com"
              className="block text-white text-[8.5vw] md:text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-tight tracking-[-0.02em] hover-underline w-fit cursor-pointer"
            >
              gosudoci@gmail.com
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-base">
              <a
                href="tel:010-2377-6460"
                className="text-white/80 hover:text-white transition-colors hover-underline cursor-pointer"
              >
                <span className="text-white/50 mr-2">전화</span>010-2377-6460
              </a>
              <a
                href={resumeReady ? RESUME_URL : '#'}
                target="_blank"
                rel="noopener noreferrer"
                download={resumeReady ? '고수현_이력서.pdf' : undefined}
                className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors hover-underline cursor-pointer"
                onClick={(e) => {
                  if (!resumeReady) {
                    e.preventDefault();
                    setResumeNotice(true);
                  }
                }}
              >
                이력서 다운로드 (PDF)
                <i className="ri-download-line transition-transform duration-300 group-hover:translate-y-0.5"></i>
              </a>
            </div>
            {resumeNotice ? (
              <p className="mt-2 text-sm text-white/70">
                이력서 PDF가 준비 중입니다. 곧 업데이트될 예정입니다.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom credit */}
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16 mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-white/50 text-xs font-montserrat">
          &copy; 2025/2026 Suhyeon Ko. All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="flex items-center gap-1 text-white/60 hover:text-white text-xs font-montserrat transition-colors duration-300 cursor-pointer"
        >
          Back to top
          <i className="ri-arrow-up-line"></i>
        </button>
      </div>
    </footer>
  );
}
