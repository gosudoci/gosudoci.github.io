import imageSizes from '@/data/image-sizes.json';

const sizes = imageSizes as unknown as Record<string, [number, number]>;

/** 이미지 원본 크기 [가로, 세로] — scripts/image-sizes.mjs 가 자동 기록 */
export function getImageSize(src: string): [number, number] | undefined {
  return sizes[src.normalize('NFC')];
}
