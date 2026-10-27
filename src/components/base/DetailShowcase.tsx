import Img from '@/components/base/Img';
import { getImageSize } from '@/components/base/imageSize';

interface DetailShowcaseProps {
  /** 상세페이지 한 장을 이루는 이미지(조각)들 — 위에서부터 순서대로 */
  images: string[];
  alt: string;
  /** 어두운 배경(개인 작업 창) 위에 놓일 때 */
  dark?: boolean;
}

/**
 * 상세페이지 전체 길이 중 f(0~1) 지점부터 보여주는 이미지 묶음.
 * 이미지 크기를 알고 있으니, 해당 지점이 들어 있는 조각부터 그리고
 * 그 조각 안에서 얼마나 내려왔는지만큼 위로 당겨서 보여줍니다.
 */
function PageWindow({ images, alt, at }: { images: string[]; alt: string; at: number }) {
  const heights = images.map((src) => {
    const size = getImageSize(src);
    return size ? size[1] / size[0] : 1;
  });
  const total = heights.reduce((a, b) => a + b, 0);
  const offset = total * at;

  let start = 0;
  let before = 0;
  while (start < images.length - 1 && before + heights[start] <= offset) {
    before += heights[start];
    start += 1;
  }

  return (
    <div
      className="absolute inset-x-0 top-0 flex flex-col"
      // margin-top % 는 너비 기준이라, 너비 1 기준 높이값을 그대로 쓸 수 있음
      style={{ marginTop: `${-(offset - before) * 100}%` }}
    >
      {images.slice(start, start + 3).map((src) => (
        <Img key={src} src={src} alt={alt} loading="eager" className="block w-full h-auto" />
      ))}
    </div>
  );
}

/**
 * 상세페이지를 열면 먼저 보이는 소개 화면.
 * 휴대폰 화면에 첫 부분을, 옆의 띠 두 개에 중간·뒷부분을 보여줍니다.
 */
export default function DetailShowcase({ images, alt, dark = false }: DetailShowcaseProps) {
  if (!images.length) return null;

  return (
    <div className={`rounded-lg px-5 py-8 md:px-12 md:py-12 ${dark ? 'bg-[#222222]' : 'bg-app-light'}`}>
      <div className="mx-auto max-w-[720px] grid grid-cols-[1.25fr_1fr] md:grid-cols-[1.25fr_1fr_1fr] gap-3 md:gap-5">
        {/* 휴대폰 */}
        <div className="rounded-[2rem] md:rounded-[2.6rem] bg-[#1a1a1a] p-[7px] md:p-[10px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] md:rounded-[2.05rem] bg-white">
            <PageWindow images={images} alt={`${alt} 첫 화면`} at={0} />
            <span className="absolute left-1/2 top-2 h-[18px] md:h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
          </div>
        </div>

        {/* 중간·뒷부분 띠 */}
        {[0.35, 0.68].map((at, i) => (
          <div
            key={at}
            className={`relative overflow-hidden rounded-xl bg-white ${i === 1 ? 'hidden md:block' : ''}`}
          >
            <PageWindow images={images} alt={`${alt} 일부`} at={at} />
          </div>
        ))}
      </div>

      <p className={`mt-6 md:mt-8 text-center text-sm ${dark ? 'text-white/70' : 'text-app-gray'}`}>
        아래로 스크롤하면 전체 상세페이지를 볼 수 있어요
        <i className="ri-arrow-down-line ml-1 align-middle"></i>
      </p>
    </div>
  );
}
