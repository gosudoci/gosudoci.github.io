// 웹용 이미지 최적화 공통 함수
// - 원본은 읽기만 하고 절대 수정하지 않습니다.
// - GIF → 움직이는 WebP (더 작을 때만, 아니면 GIF 그대로 복사)
//         1MB가 넘는 큰 GIF는 MP4 영상이 훨씬 가벼우면 MP4로 (사이트에서 GIF처럼 자동 반복 재생)
// - 일반 이미지 → WebP. 세로로 아주 긴 이미지는 여러 조각(-1, -2 …)으로 나눠
//   화면에 보이는 조각부터 불러오게 합니다. (사이트에서는 간격 없이 이어 붙여 보여줌)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import sharp from 'sharp';

const SLICE_MAX = 8000;

/** GIF → MP4 (ffmpeg-static 이 설치돼 있을 때만). 실패하면 null */
function gifToMp4(src, out, width) {
  let ffmpeg;
  try {
    ffmpeg = createRequire(import.meta.url)('ffmpeg-static');
  } catch {
    return null;
  }
  const w = Math.floor(width / 2) * 2;
  const res = spawnSync(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', `scale=${w}:-2:flags=lanczos`,
    '-c:v', 'libx264', '-crf', '26', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
    out,
  ]);
  return res.status === 0 && fs.existsSync(out) ? out : null;
}

/**
 * @param {string} src 원본 파일 경로
 * @param {string} destNoExt 확장자를 뺀 결과 파일 경로 (확장자는 자동 결정)
 * @param {{ maxWidth?: number, quality?: number }} [opts]
 * @returns {Promise<string[]>} 만들어진 파일 경로 목록 (긴 이미지는 여러 개)
 */
export async function optimizeImage(src, destNoExt, opts = {}) {
  const { maxWidth = 1720, quality = 80 } = opts;
  fs.mkdirSync(path.dirname(destNoExt), { recursive: true });
  const srcSize = fs.statSync(src).size;
  const ext = path.extname(src).toLowerCase();
  const webp = { quality, effort: 6, smartSubsample: true };

  if (ext === '.gif') {
    const meta = await sharp(src, { animated: true }).metadata();
    let pipeline = sharp(src, { animated: true });
    if (meta.width > maxWidth) pipeline = pipeline.resize({ width: maxWidth });
    const buf = await pipeline.webp(webp).toBuffer();
    const best = buf.length < srcSize ? buf.length : srcSize;

    // 큰 GIF는 MP4 영상(소리 없음, 자동 반복)이 훨씬 가벼워서, 확실히 작을 때만 MP4로 바꿉니다.
    if (best > 1024 * 1024) {
      const mp4 = gifToMp4(src, `${destNoExt}.mp4`, Math.min(meta.width, maxWidth));
      if (mp4 && fs.statSync(mp4).size < best * 0.6) return [mp4];
      if (mp4) fs.rmSync(mp4);
    }

    if (buf.length < srcSize) {
      fs.writeFileSync(`${destNoExt}.webp`, buf);
      return [`${destNoExt}.webp`];
    }
    fs.copyFileSync(src, `${destNoExt}.gif`);
    return [`${destNoExt}.gif`];
  }

  const meta = await sharp(src, { limitInputPixels: false }).metadata();
  const width = Math.min(meta.width, maxWidth);
  const height = Math.round((meta.height * width) / meta.width);

  if (height <= SLICE_MAX) {
    const out = `${destNoExt}.webp`;
    await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp(webp).toFile(out);
    return [out];
  }

  // 긴 이미지: 리사이즈 후 같은 높이의 조각으로 나누기
  const resized = await sharp(src, { limitInputPixels: false })
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 0 })
    .toBuffer();
  const count = Math.ceil(height / SLICE_MAX);
  const sliceH = Math.ceil(height / count);
  const outs = [];
  for (let i = 0; i < count; i++) {
    const top = i * sliceH;
    const out = `${destNoExt}-${i + 1}.webp`;
    await sharp(resized, { limitInputPixels: false })
      .extract({ left: 0, top, width, height: Math.min(sliceH, height - top) })
      .webp(webp)
      .toFile(out);
    outs.push(out);
  }
  return outs;
}
