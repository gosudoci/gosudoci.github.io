import { useEffect, useState } from 'react';
import type { AdItem, AdsTab } from '@/data/projects';
import Img from '@/components/base/Img';
import { getImageSize } from '@/components/base/imageSize';
import { withBase } from '@/components/base/withBase';

interface AdCreativeTabProps {
  tab: AdsTab;
  brand: string;
}

type FilterKey = 'all' | 'portrait' | 'square';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'portrait', label: '세로형' },
  { key: 'square', label: '정사각형' },
];

/** 파일 크기 정보로 "1200 × 628" 같은 라벨 만들기 */
function sizeLabel(src: string) {
  const size = getImageSize(src);
  return size ? `${size[0]} × ${size[1]}` : '';
}

export default function AdCreativeTab({ tab, brand }: AdCreativeTabProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [preview, setPreview] = useState<AdItem | null>(null);

  const visibleItems =
    filter === 'all' ? tab.items : tab.items.filter((item) => item.ratio === filter);

  useEffect(() => {
    if (!preview) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        setPreview(null);
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [preview]);

  return (
    <div>
      {/* Multi size set — 실제 비율대로, 높이를 맞춰 한 줄에 나란히 */}
      {tab.multiSize?.length ? (
        <div className="mb-10 md:mb-12">
          <h4 className="text-sm md:text-base font-medium text-app-black mb-4">
            멀티 사이즈 세트
          </h4>
          <div className="flex items-start gap-2 md:gap-4">
            {tab.multiSize.map((src) => {
              const [w, h] = getImageSize(src) ?? [1, 1];
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPreview({ src, ratio: 'portrait' })}
                  className="group min-w-0 text-left cursor-pointer"
                  style={{ flex: `${w / h} 1 0` }}
                  aria-label={`멀티 사이즈 ${sizeLabel(src)} 크게 보기`}
                >
                  <Img
                    src={src}
                    alt={`${brand} 광고소재 ${sizeLabel(src)}`}
                    className="block w-full h-auto rounded-md border border-black/5"
                  />
                  <span className="mt-2 block text-xs md:text-xs font-montserrat tracking-wider text-app-gray">
                    {sizeLabel(src)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Ads grid heading + filter */}
      <div className="mb-4 md:mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {!tab.filterable ? (
          <h4 className="text-sm md:text-base font-medium text-app-black">
            광고소재 {tab.items.length}종
          </h4>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`px-3.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition duration-300 cursor-pointer whitespace-nowrap ${
                  filter === item.key
                    ? 'bg-app-black text-white'
                    : 'bg-app-light text-app-gray hover:text-app-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
        {tab.filterable ? (
          <p className="text-xs font-montserrat tracking-wider text-app-gray">
            {visibleItems.length} creatives
          </p>
        ) : null}
      </div>

      {/* Grid — 실제 비율 유지 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 items-start">
        {visibleItems.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setPreview(item)}
            className="group relative w-full overflow-hidden rounded-md border border-black/5 bg-app-light cursor-pointer"
            aria-label={`광고소재 ${index + 1} 크게 보기`}
          >
            <Img
              src={item.src}
              alt={`${brand} 광고소재 ${index + 1}`}
              className="block w-full h-auto"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition duration-300 group-hover:bg-black/40 group-hover:opacity-100">
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <i className="ri-expand-diagonal-line text-base"></i>
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Preview lightbox */}
      {preview ? (
        <div
          className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center px-4 py-16"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label="광고소재 확대 보기"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
            }}
            className="fixed top-5 right-5 md:top-8 md:right-8 z-[121] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition duration-300 cursor-pointer"
            aria-label="닫기"
          >
            <i className="ri-close-line text-xl md:text-2xl"></i>
          </button>
          <img
            src={withBase(preview.src)}
            alt={`${brand} 광고소재 확대`}
            className="max-h-[80vh] max-w-full w-auto h-auto rounded-md"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}
