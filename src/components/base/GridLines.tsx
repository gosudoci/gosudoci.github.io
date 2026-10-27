interface GridLinesProps {
  /** 밝은 배경이면 light, 검은 배경이면 dark */
  tone?: 'light' | 'dark';
}

/** 화면 크기별로 보이는 열 (모바일 4 · 640px 6 · 768px 8 · 1024px 10 · 1280px 12) */
const columns = [
  '', '', '', '',
  'hidden sm:block', 'hidden sm:block',
  'hidden md:block', 'hidden md:block',
  'hidden lg:block', 'hidden lg:block',
  'hidden xl:block', 'hidden xl:block',
];

/**
 * 배경의 세로 그리드 선 — danielebuser.com 과 같은 규격.
 * 화면 양옆 16px 여백, 열 사이 16px, 각 열의 양쪽에 1px 선.
 * 섹션 안쪽 맨 앞에 넣고, 섹션은 relative, 내용은 relative 로 두면 내용 뒤에 깔립니다.
 */
export default function GridLines({ tone = 'light' }: GridLinesProps) {
  const line = tone === 'dark' ? 'border-[#1a1a1a]' : 'border-[#e8e8e8]';

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div className="mx-auto h-full max-w-[1920px] px-4">
        <div className="grid h-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {columns.map((visibility, i) => (
            <div key={i} className={`h-full border-x ${line} ${visibility}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
