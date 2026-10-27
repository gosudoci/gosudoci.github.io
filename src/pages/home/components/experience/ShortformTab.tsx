import { useState } from 'react';
import type { ShortformTab as ShortformTabType } from '@/data/projects';

interface ShortformTabProps {
  tab: ShortformTabType;
}

/** https://www.youtube.com/embed/ID → ID */
function videoId(src: string) {
  return src.split('/embed/')[1]?.split(/[?&]/)[0] ?? src;
}

/**
 * 처음에는 썸네일만 보여주고(화면에 보일 때만 불러옴),
 * 클릭하면 그 자리에서 유튜브 플레이어를 불러와 재생합니다.
 */
function ShortformItem({ src, index }: { src: string; index: number }) {
  const [playing, setPlaying] = useState(false);
  const id = videoId(src);

  return (
    <div className="relative w-full aspect-[9/16] overflow-hidden rounded-md bg-app-black border border-black/5">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          title={`숏폼 영상 ${index + 1}`}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`숏폼 영상 ${index + 1} 재생`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={`숏폼 영상 ${index + 1} 썸네일`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/90 text-app-black transition-transform duration-300 group-hover:scale-105">
              <i className="ri-play-fill text-2xl md:text-3xl translate-x-[1px]"></i>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function ShortformTab({ tab }: ShortformTabProps) {
  return (
    <div>
      <div className="mb-4 md:mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h4 className="text-sm md:text-base font-medium text-app-black">
          숏폼 콘텐츠
        </h4>
        <p className="text-xs font-montserrat tracking-wider text-app-gray">
          {tab.videos.length} videos
        </p>
      </div>

      {tab.channelUrl ? (
        <a
          href={tab.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-5 md:mb-6 flex items-center justify-between gap-3 rounded-md bg-app-light px-4 md:px-5 py-3.5 cursor-pointer"
        >
          <span className="flex items-center gap-2.5 text-sm text-app-black">
            <i className="ri-youtube-fill text-lg"></i>
            <span>
              <span className="font-medium">건강만만세</span>
              <span className="ml-2 text-xs text-app-gray">숏폼 시리즈 채널</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-app-black whitespace-nowrap">
            채널에서 더 보기
            <i className="ri-arrow-right-up-line transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"></i>
          </span>
        </a>
      ) : null}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {tab.videos.map((src, index) => (
          <ShortformItem key={src} src={src} index={index} />
        ))}
      </div>
    </div>
  );
}
