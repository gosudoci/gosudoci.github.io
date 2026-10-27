// public/images 안의 모든 이미지·영상(mp4) 가로·세로 크기를 src/data/image-sizes.json 에 기록합니다.
// 화면에 보일 때만 불러오는(lazy loading) 이미지가 자리를 미리 잡도록 쓰입니다.
// npm run dev / npm run build 때 자동으로 실행되니 직접 실행할 필요는 없습니다.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const outFile = path.join(root, 'src/data/image-sizes.json');
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.mp4']);

/** MP4 파일 머리말(tkhd)에서 영상 가로·세로 읽기 */
function mp4Size(file) {
  const buf = fs.readFileSync(file);
  let found = null;
  const scan = (start, end) => {
    let pos = start;
    while (pos + 8 <= end && !found) {
      let size = buf.readUInt32BE(pos);
      const type = buf.toString('latin1', pos + 4, pos + 8);
      if (size === 1) size = Number(buf.readBigUInt64BE(pos + 8));
      if (size === 0) size = end - pos;
      if (size < 8) break;
      if (type === 'moov' || type === 'trak') scan(pos + 8, pos + size);
      else if (type === 'tkhd') {
        const w = buf.readUInt32BE(pos + size - 8) / 65536;
        const h = buf.readUInt32BE(pos + size - 4) / 65536;
        if (w && h) found = [Math.round(w), Math.round(h)];
      }
      pos += size;
    }
  };
  scan(0, buf.length);
  return found;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    return exts.has(path.extname(d.name).toLowerCase()) ? [p] : [];
  });
}

const sizes = {};
for (const file of walk(path.join(publicDir, 'images')).sort()) {
  const key = '/' + path.relative(publicDir, file).split(path.sep).join('/').normalize('NFC');
  if (file.toLowerCase().endsWith('.mp4')) {
    const size = mp4Size(file);
    if (size) sizes[key] = size;
    continue;
  }
  const meta = await sharp(file).metadata();
  sizes[key] = [meta.width, meta.pageHeight ?? meta.height];
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(sizes, null, 1) + '\n');
console.log(`image-sizes: ${Object.keys(sizes).length}개 이미지 크기 기록`);
