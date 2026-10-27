import { useState } from 'react';
import type { DetailTab } from '@/data/projects';
import Img from '@/components/base/Img';
import DetailShowcase from '@/components/base/DetailShowcase';

interface DetailPageTabProps {
  tab: DetailTab;
  brand: string;
}

export default function DetailPageTab({ tab, brand }: DetailPageTabProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const activePage = tab.pages[pageIndex] || tab.pages[0];

  return (
    <div>
      {/* Page selector */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {tab.pages.map((page, index) => (
          <button
            key={page.label}
            type="button"
            onClick={() => setPageIndex(index)}
            className={`px-3.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition duration-300 cursor-pointer whitespace-nowrap ${
              index === pageIndex
                ? 'bg-app-black text-white'
                : 'bg-app-light text-app-gray hover:text-app-black'
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* 먼저 휴대폰 화면 + 띠로 소개 */}
      <div key={`showcase-${activePage.label}`} className="mb-8 md:mb-10">
        <DetailShowcase images={activePage.images} alt={`${brand} ${activePage.label}`} />
      </div>

      {/* Stacked long images — 간격 없이 이어 붙여 한 페이지처럼 */}
      <div key={activePage.label} className="max-w-[640px] mx-auto flex flex-col bg-app-light">
        {activePage.images.map((src, index) => (
          <Img
            key={src}
            src={src}
            alt={`${brand} ${activePage.label} 상세페이지 ${index + 1}`}
            className="block w-full h-auto"
            loading="lazy"
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-montserrat tracking-wider text-app-gray">
        {activePage.label}
      </p>
    </div>
  );
}
