import { useEffect, useCallback, useRef } from 'react';
import type { GalleryItem } from '@/data/projects';
import Img from '@/components/base/Img';
import DetailShowcase from '@/components/base/DetailShowcase';

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function GalleryModal({ item, onClose }: GalleryModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <div
      ref={modalRef}
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} 상세보기`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition duration-300 cursor-pointer"
        aria-label="닫기"
      >
        <i className="ri-close-line text-xl md:text-2xl"></i>
      </button>

      {/* Modal content */}
      <div className="modal-content w-full max-w-[930px] mx-auto my-10 md:my-14 pb-20 px-4">
        {/* Header info */}
        <div className="text-center mb-8 px-4">
          <p className="text-white/50 text-xs font-montserrat tracking-[0.2em] uppercase mb-3">
            {item.brand}
          </p>
          <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
            {item.title}
          </h3>
          <p className="text-white/40 text-xs font-montserrat tracking-wider">
            {item.pixelSize}
          </p>
          <p className="text-white/30 text-xs mt-1">
            기여도 : 개인 100%
          </p>
        </div>

        {/* 먼저 휴대폰 화면 + 띠로 소개 */}
        <div className="mb-10 md:mb-14">
          <DetailShowcase images={item.fullImages[0] ?? []} alt={`${item.title} 상세페이지`} dark />
        </div>

        {/* Scrollable full images — 긴 이미지는 조각으로 나눠져 있어 간격 없이 이어 붙임 */}
        <div className="flex flex-col items-center gap-8">
          {item.fullImages.map((parts, idx) => (
            <div key={idx} className="w-full max-w-[640px] flex flex-col">
              {parts.map((imgSrc, partIdx) => (
                <Img
                  key={imgSrc}
                  src={imgSrc}
                  alt={`${item.title} 상세페이지 ${idx + 1}`}
                  title={`${item.title} - ${item.brand} 상세페이지 디자인`}
                  className="block w-full h-auto object-contain"
                  loading={idx === 0 && partIdx === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}