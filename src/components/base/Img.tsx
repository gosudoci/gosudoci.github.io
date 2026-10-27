import { useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { getImageSize } from '@/components/base/imageSize';
import { withBase } from '@/components/base/withBase';

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * GIF를 변환한 MP4 — GIF처럼 소리 없이 자동 반복 재생.
 * 화면 가까이 왔을 때만 불러오고, 화면 밖으로 나가면 멈춥니다.
 */
function LoopVideo({ src, className, title, alt, loading }: ImgProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [load, setLoad] = useState(loading === 'eager');
  const size = getImageSize(src);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? withBase(src) : undefined}
      width={size?.[0]}
      height={size?.[1]}
      className={className}
      title={title}
      aria-label={alt}
      style={size ? { aspectRatio: `${size[0]} / ${size[1]}` } : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload={load ? 'auto' : 'none'}
    />
  );
}

/**
 * 화면에 보일 때만 불러오는(lazy) 이미지.
 * 가로·세로 크기를 미리 알려줘서, 불러오기 전에도 자리를 차지해 화면이 밀리지 않습니다.
 * .mp4 경로를 넣으면 GIF처럼 반복 재생되는 영상으로 보여줍니다.
 */
export default function Img({
  src,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: ImgProps) {
  if (src.toLowerCase().endsWith('.mp4')) {
    return <LoopVideo src={src} loading={loading} {...rest} />;
  }

  const size = getImageSize(src);
  return (
    <img
      src={withBase(src)}
      width={size?.[0]}
      height={size?.[1]}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
