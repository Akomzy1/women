import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { renderPage, renderStyleTile } from '../src/page.mjs';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const config = JSON.parse(await readFile(path.join(root, 'product.config.json'), 'utf8'));
const manifest = JSON.parse(await readFile(path.join(root, 'assets/manifest.json'), 'utf8'));
await mkdir(path.join(dist, 'assets'), { recursive: true });
await Promise.all([
  writeFile(path.join(dist, 'index.html'), renderPage(config)),
  writeFile(path.join(dist, 'style-tile.html'), renderStyleTile()),
  ...['styles.css', 'app.js', 'offer.mjs'].map(file => copyFile(path.join(root, 'src', file), path.join(dist, file))),
  writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n'),
  writeFile(path.join(dist, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#3c1635"/><g fill="none" stroke="#fbf7f0" stroke-width="2"><ellipse cx="28" cy="29" rx="15" ry="22" transform="rotate(25 28 29)"/><ellipse cx="37" cy="35" rx="15" ry="22" transform="rotate(-25 37 35)"/></g></svg>')
]);
for (const asset of manifest.assets) {
  const source = path.join(root, asset.path);
  const meta = await sharp(source).metadata();
  if (meta.width !== asset.width || meta.height !== asset.height) throw new Error(`Image dimensions differ from manifest: ${asset.path}`);
  await copyFile(source, path.join(dist, asset.path));
  await Promise.all([360, 640].map(width => sharp(source).resize({ width }).webp({ quality: 85 }).toFile(path.join(dist, asset.path.replace('.webp', `-${width}.webp`)))));
}
console.log('Built landing page, style tile and 18 validated image assets in dist/.');
