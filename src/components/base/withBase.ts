/**
 * '/images/a.webp' 같은 사이트 내부 경로 앞에 배포 주소의 기본 경로를 붙입니다.
 * (예: github.io/저장소이름/ 으로 배포해도 이미지가 깨지지 않도록)
 */
export function withBase(path: string) {
  if (!path.startsWith('/')) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}
