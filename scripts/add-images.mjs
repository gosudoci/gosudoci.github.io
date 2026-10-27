// 새 작업물 이미지를 웹용으로 최적화해서 public/images 에 넣습니다. (원본은 그대로 둡니다)
//
// 사용법:  npm run images -- "원본 폴더 경로" 저장할-이름
// 예)      npm run images -- "/Users/me/Desktop/새작업" personal/50
//
// → public/images/personal/50/ 에 01.webp, 02.webp … 가 만들어지고,
//   projects.ts 에 붙여 넣을 경로 목록이 화면에 출력됩니다.
import fs from 'node:fs';
import path from 'node:path';
import { optimizeImage } from './lib/optimize.mjs';

const [srcDir, name] = process.argv.slice(2);
if (!srcDir || !name || !fs.existsSync(srcDir)) {
  console.log('사용법: npm run images -- "원본 폴더 경로" 저장할-이름 (예: personal/50)');
  process.exit(1);
}
if (!/^[a-z0-9/_-]+$/i.test(name)) {
  console.log('저장할 이름은 영어·숫자·-·_·/ 만 써주세요. (예: personal/50, brand-a)');
  process.exit(1);
}

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const files = fs
  .readdirSync(srcDir)
  .filter((f) => !f.startsWith('.') && exts.has(path.extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, 'ko', { numeric: true }));

const root = path.resolve(import.meta.dirname, '..');
const destDir = path.join(root, 'public/images', name);
console.log(`${files.length}개 파일을 파일명 순서대로 처리합니다.\n`);

const lines = [];
for (const [i, file] of files.entries()) {
  const outs = await optimizeImage(
    path.join(srcDir, file),
    path.join(destDir, String(i + 1).padStart(2, '0'))
  );
  const rel = outs.map((o) => '/' + path.relative(path.join(root, 'public'), o).split(path.sep).join('/'));
  console.log(`  ${file.normalize('NFC')} → ${rel.join(', ')}`);
  lines.push(...rel);
}

console.log('\nprojects.ts 에 붙여 넣을 경로:\n');
console.log(lines.map((l) => `  '${l}',`).join('\n'));
