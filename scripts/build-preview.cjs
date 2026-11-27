// Build only the KITA browser assets for a separate Cloudflare Pages test project.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'kita-preview-dist');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const assets = new Set(['index.html', 'sw.js', 'manifest.webmanifest', 'icon.svg']);
for (const [, ref] of html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)(?:\?[^"]*)?)"/g)) {
  if (/^https?:\/\//i.test(ref)) continue;
  const name = ref.split('?')[0];
  if (!/^[a-zA-Z0-9._-]+\.(?:js|css)$/.test(name)) throw new Error('Unexpected local asset: ' + name);
  assets.add(name);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
for (const icon of manifest.icons || []) {
  if (!/^[a-zA-Z0-9._-]+\.(?:svg|png|ico|webp)$/.test(icon.src)) throw new Error('Unexpected manifest icon');
  assets.add(icon.src);
}
for (const name of assets) if (!fs.statSync(path.join(root, name)).isFile()) throw new Error('Missing asset: ' + name);
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const name of assets) fs.copyFileSync(path.join(root, name), path.join(out, name));
fs.writeFileSync(path.join(out, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log('KITA test build: ' + assets.size + ' app assets + _headers + robots.txt in kita-preview-dist');
