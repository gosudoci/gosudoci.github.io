# 고수현 디자인 포트폴리오

React + Vite + Tailwind 로 만든 포트폴리오 사이트입니다.

## 내 컴퓨터에서 보기

터미널에서 이 폴더로 이동한 뒤:

```bash
npm install     # 처음 한 번만
npm run dev     # 실행 → 브라우저에서 http://localhost:3000
```

끄려면 터미널에서 `Ctrl + C`.

## 폴더 구조 (자주 보는 곳만)

| 위치 | 내용 |
| --- | --- |
| `src/data/projects.ts` | **작업물 데이터 전부** (제목, 카테고리, 이미지 목록). 작업물 추가·수정은 여기만 |
| `public/images/` | 웹용으로 최적화된 이미지 |
| `public/resume.pdf` | 이력서 (넣으면 자동으로 다운로드 링크 연결) |
| `src/pages/home/components/` | 화면 섹션들 (Hero, Experience, Gallery, Skills, Contact) |

## 새 작업물 추가하기

### 1. 이미지 넣기

원본 이미지를 한 폴더에 모은 뒤(파일명 순서 = 화면 순서), 터미널에서:

```bash
npm run images -- "원본 폴더 경로" personal/50
```

- 폴더 경로는 Finder에서 폴더를 터미널 창으로 끌어다 놓으면 자동으로 입력됩니다.
- `personal/50` 은 저장할 이름입니다. 영어·숫자로 겹치지 않게 지어주세요.
- 원본은 그대로 두고, 웹용 복사본이 `public/images/personal/50/` 에 생깁니다.
  - 긴 상세페이지는 여러 조각(`01-1.webp`, `01-2.webp` …)으로 나뉩니다.
  - GIF는 움직임을 유지한 채 WebP 또는 MP4로 바뀝니다.
- 마지막에 **붙여 넣을 경로 목록**이 출력됩니다.

### 2. `src/data/projects.ts` 에 추가

**개인 작업(Personal Works)** — `galleryItems` 목록 맨 아래에 추가:

```ts
  {
    id: '50',                         // 겹치지 않는 번호
    category: 'beauty',               // beauty / food / home-living / fashion-accessories / health-food / pet
    title: '토너 상세페이지',
    brand: '브랜드명(개인작업)',
    pixelSize: '20,000px',
    thumbnail: '/images/personal/50/01.webp',     // 썸네일로 쓸 이미지
    fullImages: [
      ['/images/personal/50/02-1.webp', '/images/personal/50/02-2.webp'],  // 한 장(조각들)
    ],
  },
```

**실무 프로젝트(Work Experience)** — `experienceProjects` 안의 해당 브랜드에서
- 상세페이지: `pages` 에 `{ label: '버튼 이름', images: [ ...경로 ] }` 추가
- 광고소재: `items` 에 `{ src: '경로', ratio: 'portrait' }` (정사각형은 `'square'`) 추가
- 숏폼: `shortformVideos` 에 `'https://www.youtube.com/embed/영상ID'` 추가

### 3. 확인 후 배포

`npm run dev` 로 확인 → 이상 없으면 아래 **배포하기** 순서대로 올립니다.

## 배포하기 (GitHub Pages)

사이트 주소: **https://gosudoci.github.io**

터미널에서 이 폴더로 이동한 뒤:

```bash
git add -A
git commit -m "작업물 추가"   # 무엇을 바꿨는지 짧게
git push                     # 코드 백업 (main 브랜치)
npm run deploy               # 사이트에 반영 (gh-pages 브랜치)
```

1~2분 뒤 사이트에 반영됩니다. 안 바뀌어 보이면 브라우저에서 `Cmd + Shift + R` 로 새로고침하세요.

## 이력서 PDF 넣기

PDF 파일 이름을 `resume.pdf` 로 바꿔서 `public` 폴더에 넣으면 끝입니다.
(파일이 없으면 사이트에서 "준비 중" 안내가 나옵니다.)

## 참고

- `src/data/image-sizes.json` 은 자동으로 만들어지는 파일이라 직접 고칠 필요가 없습니다.
- 이미지 경로에는 한글·띄어쓰기를 쓰지 마세요. (서버에서 파일을 못 찾을 수 있습니다)
