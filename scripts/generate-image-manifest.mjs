/**
 * Scans public/images and records the real pixel width of every file,
 * writing src/config/imageManifest.json.
 *
 * `imgSrcSet()` needs this: it used to claim every full-size image was
 * "1600w", which is a lie for portrait photos that are only 900px wide,
 * and it had no way to know whether a -800 / -1200 companion actually
 * exists. Guessing either way costs bandwidth — a phone downloads a
 * file far larger than it needs, or the browser requests a variant that
 * 404s. Reading the real dimensions at build time removes the guess.
 *
 * Dimensions are parsed straight out of the file headers so this stays
 * dependency-free and runs before every build, like the sitemap.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'public', 'images');

/** Width of a JPEG, from the first SOF marker. */
function jpegWidth(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const marker = buf[i + 1];
    // SOF0..SOF15, excluding DHT/JPG/DAC which share the range
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return buf.readUInt16BE(i + 7);
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

/** Width of a PNG, from IHDR. */
function pngWidth(buf) {
  return buf.readUInt32BE(16);
}

/** Width of a WebP — lossy (VP8), lossless (VP8L) and extended (VP8X). */
function webpWidth(buf) {
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') return buf.readUInt16LE(26) & 0x3fff;
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return (bits & 0x3fff) + 1;
  }
  if (chunk === 'VP8X') return ((buf.readUIntLE(24, 3) & 0xffffff) + 1);
  return null;
}

function widthOf(file) {
  const buf = readFileSync(file);
  const ext = extname(file).toLowerCase();
  try {
    if (ext === '.jpg' || ext === '.jpeg') return jpegWidth(buf);
    if (ext === '.png') return pngWidth(buf);
    if (ext === '.webp') return webpWidth(buf);
  } catch {
    return null;
  }
  return null;
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const manifest = {};
let counted = 0;

for (const file of walk(imagesDir)) {
  const ext = extname(file).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const width = widthOf(file);
  if (!width) continue;

  const url = '/' + file.slice(join(root, 'public').length + 1).split(/[\\/]/).join('/');
  manifest[url] = width;
  counted += 1;
}

writeFileSync(
  join(root, 'src', 'config', 'imageManifest.json'),
  JSON.stringify(manifest, null, 0) + '\n'
);

console.log(`imageManifest.json — ${counted} images measured`);
