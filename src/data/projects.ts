// ========================================
// 사이트 데이터 — 작업물을 추가·수정할 때는 이 파일만 고치면 됩니다.
//   1) Work Experience (실무 프로젝트)  → experienceStats, experienceProjects
//   2) Personal Works (개인 작업 갤러리) → galleryCategories, galleryItems
// 이미지 경로는 public 폴더 기준입니다. (예: public/images/a.webp → '/images/a.webp')
// 추가 방법은 README.md 의 "새 작업물 추가하기"를 참고하세요.
// ========================================

// ---------- 타입 (수정할 필요 없음) ----------

export interface ExperienceStat {
  value: number;
  suffix: string;
  label: string;
}

export interface DetailPage {
  /** 버튼에 표시될 이름 */
  label: string;
  /** 위에서부터 순서대로 간격 없이 이어 붙일 이미지들 */
  images: string[];
}

export interface DetailTab {
  id: string;
  label: string;
  type: 'detail';
  pages: DetailPage[];
}

export interface AdItem {
  src: string;
  /** 세로형(portrait) / 정사각형(square) — 필터에 쓰임 */
  ratio: 'portrait' | 'square';
}

export interface AdsTab {
  id: string;
  label: string;
  type: 'ads';
  /** 상단 "멀티 사이즈 세트" 이미지 (없으면 생략) */
  multiSize?: string[];
  /** true면 전체/세로형/정사각형 필터 버튼 표시 */
  filterable: boolean;
  items: AdItem[];
}

export interface ShortformTab {
  id: string;
  label: string;
  type: 'shortform';
  /** 유튜브 embed 주소 */
  videos: string[];
  /** 유튜브 채널 주소 (있으면 "채널에서 더 보기" 링크 표시) */
  channelUrl?: string;
}

export type ExperienceTab = DetailTab | AdsTab | ShortformTab;

export interface WorkPoint {
  no: string;
  title: string;
  desc: string;
}

export interface ExperienceDetail {
  title: string;
  info: { label: string; value: string }[];
  overview: string[];
  points: WorkPoint[];
  tabs: ExperienceTab[];
}

export interface ExperienceProject {
  id: string;
  badge: string;
  brand: string;
  category: string;
  summary: string;
  tags: string;
  /** 카드 썸네일 (16:10 가로형) */
  thumbnail: string;
  /** 넣으면 썸네일 자리에 이 이미지들이 옆으로 흐르는 띠로 보임 */
  thumbnailStrip?: string[];
  detail: ExperienceDetail;
}

export interface GalleryItem {
  id: string;
  /** galleryCategories 의 id 중 하나 */
  category: string;
  title: string;
  brand: string;
  pixelSize: string;
  /** 갤러리 카드 썸네일 */
  thumbnail: string;
  /** 상세 이미지. 안쪽 [ ] 하나가 한 장이며, 긴 이미지는 여러 조각으로 나뉘어 있음 */
  fullImages: string[][];
}

// ========================================
// 1) Work Experience — 실무 프로젝트
// ========================================

export const experienceStats: ExperienceStat[] = [
  { value: 7, suffix: '', label: '랜딩·상세페이지' },
  { value: 100, suffix: '+', label: '광고소재' },
  { value: 21, suffix: '', label: '숏폼 영상' },
  { value: 100, suffix: '%', label: '기획·디자인 기여도' },
];

export const shortformVideos: string[] = [
  'https://www.youtube.com/embed/cs-gtxIZ8bM',
  'https://www.youtube.com/embed/MgXhdhvPLFc',
  'https://www.youtube.com/embed/PAsVVRgGHC4',
  'https://www.youtube.com/embed/EkVGxelqW34',
  'https://www.youtube.com/embed/VRAHKFBTHnU',
  'https://www.youtube.com/embed/cgGPBVLGRic',
  'https://www.youtube.com/embed/Ttm66pTEI-w',
  'https://www.youtube.com/embed/nY1C8X82rQo',
  'https://www.youtube.com/embed/20pOvLPnd6g',
  'https://www.youtube.com/embed/wxrMzA4Y1Qo',
  'https://www.youtube.com/embed/AgJhWYzgr4A',
  'https://www.youtube.com/embed/2Lz-61ObvJc',
  'https://www.youtube.com/embed/evVuk7TnctU',
  'https://www.youtube.com/embed/eMY6n37Jm4Y',
];

export const experienceProjects: ExperienceProject[] = [
  {
    id: 'malgeun365',
    badge: '실무 · 기획·디자인 100%',
    brand: '맑은365 면역보감',
    category: '건강기능식품',
    summary: '중장년 타깃 면역 건강기능식품의 판매 콘텐츠 전반 기획·디자인',
    tags: '상세페이지 4 · 광고소재 66 · 숏폼 21',
    thumbnail: '/images/experience/malgeun365/thumb.webp',
    thumbnailStrip: [
      '/images/experience/malgeun365/ads/01.webp',
      '/images/experience/malgeun365/ads/02.webp',
      '/images/experience/malgeun365/ads/07.webp',
      '/images/experience/malgeun365/ads/08.webp',
      '/images/experience/malgeun365/ads/12.webp',
      '/images/experience/malgeun365/ads/13.webp',
      '/images/experience/malgeun365/ads/14.webp',
      '/images/experience/malgeun365/ads/15.webp',
      '/images/experience/malgeun365/ads/18.webp',
      '/images/experience/malgeun365/ads/19.webp',
      '/images/experience/malgeun365/ads/20.webp',
      '/images/experience/malgeun365/ads/22.webp',
    ],
    detail: {
      title: '맑은365 면역보감 로얄 프리미엄 진',
      info: [
        { label: '카테고리', value: '건강기능식품' },
        { label: '기간', value: '2026 · 3개월' },
        { label: '역할', value: '기획 · 디자인 100%' },
        { label: '작업', value: '상세페이지 · 광고소재 · 숏폼' },
      ],
      overview: [
        '중장년층을 타깃으로 한 면역 건강기능식품의 판매 콘텐츠 전반을 기획하고 디자인했습니다.',
        '랜딩페이지, SNS 광고소재, 숏폼 영상까지 하나의 제품을 채널별 특성에 맞게 풀어냈습니다.',
      ],
      points: [
        {
          no: '01',
          title: '기사형 페이지',
          desc: '뉴스 기사 형식으로 정보를 먼저 전달하고 제품으로 자연스럽게 이어지도록 구성을 기획',
        },
        {
          no: '02',
          title: '소구점 분리',
          desc: "'잔기침·가래', '명절 선물', '가격 혜택' 등 타깃의 관심사별로 메시지를 나눠 광고소재 제작",
        },
        {
          no: '03',
          title: '숏폼 시리즈화',
          desc: '정보성 건강 콘텐츠를 시리즈 템플릿으로 기획해 일정한 톤으로 빠르게 제작',
        },
        {
          no: '04',
          title: '심의 대응',
          desc: '건강기능식품 광고 심의 기준에 맞춰 표현을 정리',
        },
      ],
      tabs: [
        {
          id: 'detail',
          label: '상세페이지',
          type: 'detail',
          pages: [
            {
              label: '랜딩 1',
              images: [
                '/images/experience/malgeun365/detail/landing-2/01.mp4',
                '/images/experience/malgeun365/detail/landing-2/02.webp',
                '/images/experience/malgeun365/detail/landing-2/03.webp',
                '/images/experience/malgeun365/detail/landing-2/04.mp4',
                '/images/experience/malgeun365/detail/landing-2/05.webp',
                '/images/experience/malgeun365/detail/landing-2/06.mp4',
                '/images/experience/malgeun365/detail/landing-2/07.webp',
                '/images/experience/malgeun365/detail/landing-2/08.webp',
                '/images/experience/malgeun365/detail/landing-2/09.webp',
                '/images/experience/malgeun365/detail/landing-2/10.webp',
                '/images/experience/malgeun365/detail/landing-2/11.webp',
                '/images/experience/malgeun365/detail/landing-2/12.mp4',
                '/images/experience/malgeun365/detail/landing-2/13.webp',
                '/images/experience/malgeun365/detail/landing-2/14.webp',
              ],
            },
            {
              label: '랜딩 2',
              images: [
                '/images/experience/malgeun365/detail/landing-1/01.webp',
                '/images/experience/malgeun365/detail/landing-1/02.webp',
                '/images/experience/malgeun365/detail/landing-1/03.webp',
                '/images/experience/malgeun365/detail/landing-1/04.webp',
                '/images/experience/malgeun365/detail/landing-1/05.mp4',
                '/images/experience/malgeun365/detail/landing-1/06.webp',
                '/images/experience/malgeun365/detail/landing-1/07.webp',
                '/images/experience/malgeun365/detail/landing-1/08.webp',
                '/images/experience/malgeun365/detail/landing-1/09.webp',
                '/images/experience/malgeun365/detail/landing-1/10.mp4',
                '/images/experience/malgeun365/detail/landing-1/11.webp',
              ],
            },
            {
              label: '기사형 1',
              images: [
                '/images/experience/malgeun365/detail/article-1/01.mp4',
                '/images/experience/malgeun365/detail/article-1/02.webp',
                '/images/experience/malgeun365/detail/article-1/03.gif',
                '/images/experience/malgeun365/detail/article-1/04.webp',
                '/images/experience/malgeun365/detail/article-1/05.mp4',
                '/images/experience/malgeun365/detail/article-1/06.mp4',
                '/images/experience/malgeun365/detail/article-1/07.webp',
              ],
            },
            {
              label: '기사형 2',
              images: [
                '/images/experience/malgeun365/detail/article-2/01.mp4',
                '/images/experience/malgeun365/detail/article-2/02.mp4',
                '/images/experience/malgeun365/detail/article-2/03.gif',
                '/images/experience/malgeun365/detail/article-2/04.webp',
                '/images/experience/malgeun365/detail/article-2/05.webp',
                '/images/experience/malgeun365/detail/article-2/06.webp',
              ],
            },
          ],
        },
        {
          id: 'ads',
          label: '광고소재',
          type: 'ads',
          multiSize: [
            '/images/experience/malgeun365/ads/multi-1200x628.webp',
            '/images/experience/malgeun365/ads/multi-628x628.webp',
            '/images/experience/malgeun365/ads/multi-500x628.webp',
          ],
          filterable: false,
          items: [
            { src: '/images/experience/malgeun365/ads/01.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/02.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/03.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/04.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/05.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/06.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/07.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/08.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/09.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/10.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/11.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/12.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/13.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/14.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/15.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/16.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/17.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/18.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/19.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/20.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/21.webp', ratio: 'portrait' },
            { src: '/images/experience/malgeun365/ads/22.webp', ratio: 'portrait' },
          ],
        },
        {
          id: 'shortform',
          label: '숏폼',
          type: 'shortform',
          videos: shortformVideos,
          channelUrl: 'https://www.youtube.com/@manmanse-z7z',
        },
      ],
    },
  },
  {
    id: 'manpride',
    badge: '실무 · 기획·디자인 100%',
    brand: '맨프라이드',
    category: '남성 전용 의료기기',
    summary: '심의 기준이 엄격한 의료기기 브랜드의 랜딩페이지·광고소재 기획·디자인',
    tags: '랜딩페이지 3 · 광고소재 50+',
    thumbnail: '/images/experience/manpride/thumb.webp',
    thumbnailStrip: [
      '/images/experience/manpride/ads/portrait-33.webp',
      '/images/experience/manpride/ads/portrait-01.webp',
      '/images/experience/manpride/ads/portrait-02.webp',
      '/images/experience/manpride/ads/portrait-06.webp',
      '/images/experience/manpride/ads/portrait-08.webp',
      '/images/experience/manpride/ads/portrait-13.webp',
      '/images/experience/manpride/ads/portrait-14.webp',
      '/images/experience/manpride/ads/portrait-16.webp',
      '/images/experience/manpride/ads/portrait-19.webp',
      '/images/experience/manpride/ads/portrait-20.webp',
      '/images/experience/manpride/ads/portrait-21.webp',
      '/images/experience/manpride/ads/portrait-26.webp',
      '/images/experience/manpride/ads/portrait-27.webp',
      '/images/experience/manpride/ads/portrait-29.webp',
      '/images/experience/manpride/ads/portrait-11.webp',
      '/images/experience/manpride/ads/portrait-12.webp',
    ],
    detail: {
      title: '맨프라이드',
      info: [
        { label: '카테고리', value: '남성 전용 의료기기' },
        { label: '기간', value: '2026 · 3개월' },
        { label: '역할', value: '기획 · 디자인 100%' },
        { label: '작업', value: '랜딩페이지 · 광고소재' },
      ],
      overview: [
        '광고 심의 기준이 엄격한 남성 전용 의료기기 브랜드의 랜딩페이지와 광고소재를 기획하고 디자인했습니다.',
        '같은 브랜드의 필름 제품까지 함께 담당하며, 제품 성격에 따라 톤을 다르게 설계했습니다.',
      ],
      points: [
        {
          no: '01',
          title: '톤 분리',
          desc: '의료기기는 블루·화이트 톤으로 신뢰감을, 필름 제품은 블랙·레드 톤으로 강렬한 인상을 주도록 설계',
        },
        {
          no: '02',
          title: '소구점 확장',
          desc: "'자신감', '간편한 홈케어', '프라이버시' 등의 메시지를 더해 다양한 광고소재로 확장",
        },
        {
          no: '03',
          title: '심의 대응',
          desc: '의료기기 광고 심의 기준에 맞춰 문구와 표현을 정리',
        },
      ],
      tabs: [
        {
          id: 'detail',
          label: '상세페이지',
          type: 'detail',
          pages: [
            {
              label: '의료기기 랜딩 1',
              images: [
                '/images/experience/manpride/detail/medical-2-1.webp',
                '/images/experience/manpride/detail/medical-2-2.webp',
              ],
            },
            {
              label: '필름 랜딩 1',
              images: [
                '/images/experience/manpride/detail/film-1-1.webp',
                '/images/experience/manpride/detail/film-1-2.webp',
              ],
            },
            {
              label: '필름 랜딩 2',
              images: [
                '/images/experience/manpride/detail/film-2-1.webp',
                '/images/experience/manpride/detail/film-2-2.webp',
                '/images/experience/manpride/detail/film-2-3.webp',
                '/images/experience/manpride/detail/film-2-4.webp',
                '/images/experience/manpride/detail/film-2-5.webp',
              ],
            },
          ],
        },
        {
          id: 'ads',
          label: '광고소재',
          type: 'ads',
          filterable: true,
          items: [
            { src: '/images/experience/manpride/ads/portrait-01.webp', ratio: 'portrait' }, // 260807_맨프라이드 광고소재_고수현.jpg
            { src: '/images/experience/manpride/ads/portrait-02.webp', ratio: 'portrait' }, // 16262188229528206054.png
            { src: '/images/experience/manpride/ads/portrait-03.webp', ratio: 'portrait' }, // 새로형-소재13.jpg
            { src: '/images/experience/manpride/ads/portrait-04.webp', ratio: 'portrait' }, // 세로형-1.jpg
            { src: '/images/experience/manpride/ads/portrait-05.webp', ratio: 'portrait' }, // 세로형-2.jpg
            { src: '/images/experience/manpride/ads/portrait-06.webp', ratio: 'portrait' }, // 세로형-3.jpg
            { src: '/images/experience/manpride/ads/portrait-07.webp', ratio: 'portrait' }, // 세로형-4.jpg
            { src: '/images/experience/manpride/ads/portrait-08.webp', ratio: 'portrait' }, // 세로형-5.jpg
            { src: '/images/experience/manpride/ads/portrait-09.webp', ratio: 'portrait' }, // 세로형-6.jpg
            { src: '/images/experience/manpride/ads/portrait-10.webp', ratio: 'portrait' }, // 세로형-7.jpg
            { src: '/images/experience/manpride/ads/portrait-11.webp', ratio: 'portrait' }, // 세로형-9.jpg
            { src: '/images/experience/manpride/ads/portrait-12.webp', ratio: 'portrait' }, // 세로형-10.jpg
            { src: '/images/experience/manpride/ads/portrait-13.webp', ratio: 'portrait' }, // 세로형-11.jpg
            { src: '/images/experience/manpride/ads/portrait-14.webp', ratio: 'portrait' }, // 세로형-소재.jpg
            { src: '/images/experience/manpride/ads/portrait-15.webp', ratio: 'portrait' }, // 세로형-소재1.jpg
            { src: '/images/experience/manpride/ads/portrait-16.webp', ratio: 'portrait' }, // 세로형-소재3.jpg
            { src: '/images/experience/manpride/ads/portrait-17.webp', ratio: 'portrait' }, // 세로형-소재5.jpg
            { src: '/images/experience/manpride/ads/portrait-18.webp', ratio: 'portrait' }, // 세로형-소재6.jpg
            { src: '/images/experience/manpride/ads/portrait-19.webp', ratio: 'portrait' }, // 세로형-소재7.jpg
            { src: '/images/experience/manpride/ads/portrait-20.webp', ratio: 'portrait' }, // 세로형-소재8.jpg
            { src: '/images/experience/manpride/ads/portrait-21.webp', ratio: 'portrait' }, // 세로형-소재9.jpg
            { src: '/images/experience/manpride/ads/portrait-22.webp', ratio: 'portrait' }, // 세로형-소재10.jpg
            { src: '/images/experience/manpride/ads/portrait-23.webp', ratio: 'portrait' }, // 세로형-소재11.jpg
            { src: '/images/experience/manpride/ads/portrait-24.webp', ratio: 'portrait' }, // 세로형-소재12.jpg
            { src: '/images/experience/manpride/ads/portrait-25.webp', ratio: 'portrait' }, // 세로형-소재14.jpg
            { src: '/images/experience/manpride/ads/portrait-26.webp', ratio: 'portrait' }, // 세로형-소재15.jpg
            { src: '/images/experience/manpride/ads/portrait-27.webp', ratio: 'portrait' }, // 세로형-소재16.jpg
            { src: '/images/experience/manpride/ads/portrait-28.webp', ratio: 'portrait' }, // 세로형-소재17.jpg
            { src: '/images/experience/manpride/ads/portrait-29.webp', ratio: 'portrait' }, // 세로형-소재18.jpg
            { src: '/images/experience/manpride/ads/portrait-30.webp', ratio: 'portrait' }, // 세로형-소재19.jpg
            { src: '/images/experience/manpride/ads/portrait-31.webp', ratio: 'portrait' }, // 세로형-소재20.jpg
            { src: '/images/experience/manpride/ads/portrait-32.webp', ratio: 'portrait' }, // 세로형-소재21.jpg
            { src: '/images/experience/manpride/ads/portrait-33.webp', ratio: 'portrait' }, // 세로형-소재22.jpg
            { src: '/images/experience/manpride/ads/square-01.webp', ratio: 'square' }, // 12057143534898049034.png
            { src: '/images/experience/manpride/ads/square-02.webp', ratio: 'square' }, // 정사각형-1.jpg
            { src: '/images/experience/manpride/ads/square-03.webp', ratio: 'square' }, // 정사각형-2.jpg
            { src: '/images/experience/manpride/ads/square-04.webp', ratio: 'square' }, // 정사각형-3.jpg
            { src: '/images/experience/manpride/ads/square-05.webp', ratio: 'square' }, // 정사각형-4.jpg
            { src: '/images/experience/manpride/ads/square-06.webp', ratio: 'square' }, // 정사각형-5.jpg
            { src: '/images/experience/manpride/ads/square-07.webp', ratio: 'square' }, // 정사각형-6.jpg
            { src: '/images/experience/manpride/ads/square-08.webp', ratio: 'square' }, // 정사각형-7.jpg
            { src: '/images/experience/manpride/ads/square-09.webp', ratio: 'square' }, // 정사각형-9.jpg
            { src: '/images/experience/manpride/ads/square-10.webp', ratio: 'square' }, // 정사각형-10.jpg
            { src: '/images/experience/manpride/ads/square-11.webp', ratio: 'square' }, // 정사각형-11.jpg
            { src: '/images/experience/manpride/ads/square-12.webp', ratio: 'square' }, // 정사각형-소재-1.jpg
            { src: '/images/experience/manpride/ads/square-13.webp', ratio: 'square' }, // 정사각형-소재1.jpg
            { src: '/images/experience/manpride/ads/square-14.webp', ratio: 'square' }, // 정사각형-소재7.jpg
            { src: '/images/experience/manpride/ads/square-15.webp', ratio: 'square' }, // 정사각형-소재16.jpg
            { src: '/images/experience/manpride/ads/square-16.webp', ratio: 'square' }, // 정사각형-소재19.jpg
            { src: '/images/experience/manpride/ads/square-17.webp', ratio: 'square' }, // 정사각형-소재20.jpg
            { src: '/images/experience/manpride/ads/square-18.webp', ratio: 'square' }, // 정사각형-소재21.jpg
            { src: '/images/experience/manpride/ads/square-19.webp', ratio: 'square' }, // 정사각형-소재22.jpg
          ],
        },
      ],
    },
  },
];

// ========================================
// 2) Personal Works — 개인 작업 갤러리
// ========================================

export const galleryCategories = [
  { id: 'all', label: '전체' },
  { id: 'beauty', label: '뷰티' },
  { id: 'food', label: '식품' },
  { id: 'home-living', label: '가전/리빙' },
  { id: 'fashion-accessories', label: '패션잡화' },
  { id: 'health-food', label: '건강기능식품' },
  { id: 'pet', label: '반려동물용품' },
];

export const galleryItems: GalleryItem[] = [
  // ==================== 뷰티 ====================
  {
    id: '1',
    category: 'beauty',
    title: '헤어오일 상세페이지',
    brand: 'Luxury Elixir (개인작업)',
    pixelSize: '14,196px',
    thumbnail: '/images/personal/1/thumb.webp',
    fullImages: [
      [
        '/images/personal/1/full-1-1.webp',
        '/images/personal/1/full-1-2.webp',
      ],
    ],
  },
  {
    id: '2',
    category: 'beauty',
    title: '립스틱 상세페이지',
    brand: 'SIYA(개인작업)',
    pixelSize: '21,454px',
    thumbnail: '/images/personal/2/thumb.webp',
    fullImages: [
      [
        '/images/personal/2/full-1-1.webp',
        '/images/personal/2/full-1-2.webp',
      ],
    ],
  },
  {
    id: '3',
    category: 'beauty',
    title: '선크림 상세페이지',
    brand: '이니시스(개인작업)',
    pixelSize: '20,145px',
    thumbnail: '/images/personal/3/thumb.webp',
    fullImages: [
      [
        '/images/personal/3/full-1-1.webp',
        '/images/personal/3/full-1-2.webp',
        '/images/personal/3/full-1-3.webp',
      ],
    ],
  },
  {
    id: '16',
    category: 'beauty',
    title: '선크림 상세페이지',
    brand: 'uv master 선 프로텍션(개인작업)',
    pixelSize: '20,000px',
    thumbnail: '/images/personal/16/thumb.webp',
    fullImages: [
      [
        '/images/personal/16/full-1-1.webp',
        '/images/personal/16/full-1-2.webp',
        '/images/personal/16/full-1-3.webp',
      ],
    ],
  },
  {
    id: '17',
    category: 'beauty',
    title: '세럼 상세페이지',
    brand: 'RE:ORIGIN(개인작업)',
    pixelSize: '21,870px',
    thumbnail: '/images/personal/17/thumb.webp',
    fullImages: [
      [
        '/images/personal/17/full-1-1.webp',
        '/images/personal/17/full-1-2.webp',
        '/images/personal/17/full-1-3.webp',
      ],
    ],
  },
  {
    id: '18',
    category: 'beauty',
    title: '앰플 상세페이지',
    brand: '아비에르(개인작업)',
    pixelSize: '19,692px',
    thumbnail: '/images/personal/18/thumb.webp',
    fullImages: [
      [
        '/images/personal/18/full-1-1.webp',
        '/images/personal/18/full-1-2.webp',
        '/images/personal/18/full-1-3.webp',
      ],
    ],
  },
  {
    id: '19',
    category: 'beauty',
    title: '폼클렌징 상세페이지',
    brand: 'beplain(리디자인)',
    pixelSize: '19,754px',
    thumbnail: '/images/personal/19/thumb.webp',
    fullImages: [
      [
        '/images/personal/19/full-1-1.webp',
        '/images/personal/19/full-1-2.webp',
        '/images/personal/19/full-1-3.webp',
      ],
    ],
  },
  {
    id: '20',
    category: 'beauty',
    title: '피부관리기 상세페이지',
    brand: 'Lumiskin(개인작업)',
    pixelSize: '22,800px',
    thumbnail: '/images/personal/20/thumb.webp',
    fullImages: [
      [
        '/images/personal/20/full-1-1.webp',
        '/images/personal/20/full-1-2.webp',
        '/images/personal/20/full-1-3.webp',
      ],
    ],
  },
  {
    id: '21',
    category: 'beauty',
    title: '핸드크림 상세페이지',
    brand: '디피어(리디자인)',
    pixelSize: '17,560px',
    thumbnail: '/images/personal/21/thumb.webp',
    fullImages: [
      [
        '/images/personal/21/full-1-1.webp',
        '/images/personal/21/full-1-2.webp',
        '/images/personal/21/full-1-3.webp',
      ],
    ],
  },

  // ==================== 식품 ====================
  {
    id: '22',
    category: 'food',
    title: '계란 상세페이지',
    brand: '해품농장(개인작업)',
    pixelSize: '20,800px',
    thumbnail: '/images/personal/22/thumb.webp',
    fullImages: [
      [
        '/images/personal/22/full-1-1.webp',
        '/images/personal/22/full-1-2.webp',
        '/images/personal/22/full-1-3.webp',
      ],
    ],
  },
  {
    id: '24',
    category: 'food',
    title: '김 상세페이지',
    brand: '김(개인작업)',
    pixelSize: '18,428px',
    thumbnail: '/images/personal/24/thumb.webp',
    fullImages: [
      [
        '/images/personal/24/full-1-1.webp',
        '/images/personal/24/full-1-2.webp',
        '/images/personal/24/full-1-3.webp',
      ],
    ],
  },
  {
    id: '25',
    category: 'food',
    title: '단백질바 상세페이지',
    brand: '하루 단백바(리디자인)',
    pixelSize: '26,292px',
    thumbnail: '/images/personal/25/thumb.webp',
    fullImages: [
      [
        '/images/personal/25/full-1-1.webp',
        '/images/personal/25/full-1-2.webp',
        '/images/personal/25/full-1-3.webp',
      ],
      [
        '/images/personal/25/full-2-1.webp',
        '/images/personal/25/full-2-2.webp',
      ],
    ],
  },
  {
    id: '26',
    category: 'food',
    title: '딸기 상세페이지',
    brand: '마하딸기(개인작업)',
    pixelSize: '20,000px',
    thumbnail: '/images/personal/26/thumb.webp',
    fullImages: [
      [
        '/images/personal/26/full-1-1.webp',
        '/images/personal/26/full-1-2.webp',
        '/images/personal/26/full-1-3.webp',
      ],
    ],
  },
  {
    id: '27',
    category: 'food',
    title: '딸기 상세페이지',
    brand: '진주루비(개인작업)',
    pixelSize: '20,354px',
    thumbnail: '/images/personal/27/thumb.webp',
    fullImages: [
      [
        '/images/personal/27/full-1-1.webp',
        '/images/personal/27/full-1-2.webp',
        '/images/personal/27/full-1-3.webp',
      ],
    ],
  },
  {
    id: '28',
    category: 'food',
    title: '과일 상세페이지',
    brand: '솔리가 레드향(개인작업)',
    pixelSize: '18,686px',
    thumbnail: '/images/personal/28/thumb.webp',
    fullImages: [
      [
        '/images/personal/28/full-1-1.webp',
        '/images/personal/28/full-1-2.webp',
        '/images/personal/28/full-1-3.webp',
      ],
    ],
  },
  {
    id: '29',
    category: 'food',
    title: '베이글 상세페이지',
    brand: '베이글(개인작업)',
    pixelSize: '20,500px',
    thumbnail: '/images/personal/29/thumb.webp',
    fullImages: [
      [
        '/images/personal/29/full-1-1.webp',
        '/images/personal/29/full-1-2.webp',
        '/images/personal/29/full-1-3.webp',
      ],
    ],
  },
  {
    id: '30',
    category: 'food',
    title: '복숭아 상세페이지',
    brand: '(개인작업)',
    pixelSize: '24,900px',
    thumbnail: '/images/personal/30/thumb.webp',
    fullImages: [
      [
        '/images/personal/30/full-1-1.webp',
        '/images/personal/30/full-1-2.webp',
      ],
      [
        '/images/personal/30/full-2-1.webp',
        '/images/personal/30/full-2-2.webp',
      ],
    ],
  },
  {
    id: '31',
    category: 'food',
    title: '블루베리 상세페이지',
    brand: '푸름농장(개인작업)',
    pixelSize: '20,000px',
    thumbnail: '/images/personal/31/thumb.webp',
    fullImages: [
      [
        '/images/personal/31/full-1-1.webp',
        '/images/personal/31/full-1-2.webp',
        '/images/personal/31/full-1-3.webp',
      ],
    ],
  },
  {
    id: '32',
    category: 'food',
    title: '휘낭시에 상세페이지',
    brand: '딜리시(개인작업)',
    pixelSize: '20,000px',
    thumbnail: '/images/personal/32/thumb.webp',
    fullImages: [
      [
        '/images/personal/32/full-1-1.webp',
        '/images/personal/32/full-1-2.webp',
        '/images/personal/32/full-1-3.webp',
      ],
    ],
  },
  {
    id: '33',
    category: 'food',
    title: '사과 상세페이지',
    brand: '(개인작업)',
    pixelSize: '17,835px',
    thumbnail: '/images/personal/33/thumb.webp',
    fullImages: [
      [
        '/images/personal/33/full-1-1.webp',
        '/images/personal/33/full-1-2.webp',
        '/images/personal/33/full-1-3.webp',
      ],
    ],
  },
  {
    id: '34',
    category: 'food',
    title: '시리얼 상세페이지',
    brand: '(개인작업)',
    pixelSize: '19,990px',
    thumbnail: '/images/personal/34/thumb.webp',
    fullImages: [
      [
        '/images/personal/34/full-1-1.webp',
        '/images/personal/34/full-1-2.webp',
        '/images/personal/34/full-1-3.webp',
      ],
    ],
  },
  {
    id: '35',
    category: 'food',
    title: '떡볶이 상세페이지',
    brand: '(개인작업)',
    pixelSize: '17,673px',
    thumbnail: '/images/personal/35/thumb.webp',
    fullImages: [
      [
        '/images/personal/35/full-1-1.webp',
        '/images/personal/35/full-1-2.webp',
        '/images/personal/35/full-1-3.webp',
      ],
    ],
  },

  // ==================== 가전/리빙 ====================
  {
    id: '36',
    category: 'home-living',
    title: '소파 상세페이지',
    brand: 'COMODO(개인작업)',
    pixelSize: '31,676px',
    thumbnail: '/images/personal/36/thumb.webp',
    fullImages: [
      [
        '/images/personal/36/full-1-1.webp',
        '/images/personal/36/full-1-2.webp',
        '/images/personal/36/full-1-3.webp',
      ],
      [
        '/images/personal/36/full-2-1.webp',
        '/images/personal/36/full-2-2.webp',
      ],
    ],
  },
  {
    id: '37',
    category: 'home-living',
    title: '선반 상세페이지',
    brand: '(리디자인)',
    pixelSize: '20,200px',
    thumbnail: '/images/personal/37/thumb.webp',
    fullImages: [
      [
        '/images/personal/37/full-1-1.webp',
        '/images/personal/37/full-1-2.webp',
        '/images/personal/37/full-1-3.webp',
      ],
    ],
  },
  {
    id: '38',
    category: 'home-living',
    title: '선풍기 상세페이지',
    brand: '뮤트온(리디자인)',
    pixelSize: '17,482px',
    thumbnail: '/images/personal/38/thumb.webp',
    fullImages: [
      [
        '/images/personal/38/full-1-1.webp',
        '/images/personal/38/full-1-2.webp',
        '/images/personal/38/full-1-3.webp',
      ],
    ],
  },
  {
    id: '39',
    category: 'home-living',
    title: '가습기 상세페이지',
    brand: '(개인작업)',
    pixelSize: '21,144px',
    thumbnail: '/images/personal/39/thumb.webp',
    fullImages: [
      [
        '/images/personal/39/full-1-1.webp',
        '/images/personal/39/full-1-2.webp',
        '/images/personal/39/full-1-3.webp',
      ],
    ],
  },
  {
    id: '40',
    category: 'home-living',
    title: '헤드셋 상세페이지',
    brand: '(개인작업)',
    pixelSize: '20,009px',
    thumbnail: '/images/personal/40/thumb.webp',
    fullImages: [
      [
        '/images/personal/40/full-1-1.webp',
        '/images/personal/40/full-1-2.webp',
        '/images/personal/40/full-1-3.webp',
      ],
    ],
  },

  // ==================== 건강기능식품 ====================
  {
    id: '41',
    category: 'health-food',
    title: '레몬즙 상세페이지',
    brand: 'Every Day(개인작업)',
    pixelSize: '24,915px',
    thumbnail: '/images/personal/41/thumb.webp',
    fullImages: [
      [
        '/images/personal/41/full-1-1.webp',
        '/images/personal/41/full-1-2.webp',
      ],
      [
        '/images/personal/41/full-2-1.webp',
        '/images/personal/41/full-2-2.webp',
      ],
    ],
  },
  {
    id: '42',
    category: 'health-food',
    title: '홍삼 상세페이지',
    brand: '고려홍삼(리디자인)',
    pixelSize: '10,000px',
    thumbnail: '/images/personal/42/thumb.webp',
    fullImages: [
      [
        '/images/personal/42/full-1-1.webp',
        '/images/personal/42/full-1-2.webp',
      ],
    ],
  },
  {
    id: '43',
    category: 'health-food',
    title: '콤부차 상세페이지',
    brand: '(개인작업)',
    pixelSize: '19,933px',
    thumbnail: '/images/personal/43/thumb.webp',
    fullImages: [
      [
        '/images/personal/43/full-1-1.webp',
        '/images/personal/43/full-1-2.webp',
        '/images/personal/43/full-1-3.webp',
      ],
    ],
  },
  {
    id: '44',
    category: 'health-food',
    title: '콜라겐 상세페이지',
    brand: '(개인작업)',
    pixelSize: '22,464px',
    thumbnail: '/images/personal/44/thumb.webp',
    fullImages: [
      [
        '/images/personal/44/full-1-1.webp',
        '/images/personal/44/full-1-2.webp',
      ],
      [
        '/images/personal/44/full-2-1.webp',
        '/images/personal/44/full-2-2.webp',
      ],
    ],
  },
  {
    id: '45',
    category: 'health-food',
    title: '건강기능식품 상세페이지',
    brand: '브로멜라인 쉐르세틴(개인작업)',
    pixelSize: '25,273px',
    thumbnail: '/images/personal/45/thumb.webp',
    fullImages: [
      [
        '/images/personal/45/full-1-1.webp',
        '/images/personal/45/full-1-2.webp',
      ],
      [
        '/images/personal/45/full-2-1.webp',
        '/images/personal/45/full-2-2.webp',
      ],
    ],
  },
  {
    id: '46',
    category: 'health-food',
    title: '건강기능식품 상세페이지',
    brand: '마그네슘(개인작업)',
    pixelSize: '21,798px',
    thumbnail: '/images/personal/46/thumb.webp',
    fullImages: [
      [
        '/images/personal/46/full-1-1.webp',
        '/images/personal/46/full-1-2.webp',
        '/images/personal/46/full-1-3.webp',
      ],
    ],
  },
  {
    id: '47',
    category: 'health-food',
    title: '건강기능식품 상세페이지',
    brand: '간케어(개인작업)',
    pixelSize: '23,441px',
    thumbnail: '/images/personal/47/thumb.webp',
    fullImages: [
      [
        '/images/personal/47/full-1-1.webp',
        '/images/personal/47/full-1-2.webp',
        '/images/personal/47/full-1-3.webp',
      ],
    ],
  },

  // ==================== 반려동물용품 ====================
  {
    id: '48',
    category: 'pet',
    title: '반려동물 영양제 상세페이지',
    brand: '(개인작업)',
    pixelSize: '23,458px',
    thumbnail: '/images/personal/48/thumb.webp',
    fullImages: [
      [
        '/images/personal/48/full-1-1.webp',
        '/images/personal/48/full-1-2.webp',
      ],
      ['/images/personal/48/full-2.webp'],
    ],
  },

  // ==================== 패션잡화 ====================
  {
    id: '49',
    category: 'fashion-accessories',
    title: '바라클라바 상세페이지',
    brand: '(리디자인)',
    pixelSize: '13,530px',
    thumbnail: '/images/personal/49/thumb.webp',
    fullImages: [
      [
        '/images/personal/49/full-1-1.webp',
        '/images/personal/49/full-1-2.webp',
      ],
    ],
  },
];
