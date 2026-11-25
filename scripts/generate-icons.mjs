// Génère les icônes et l'image de partage à partir de public/favicon.svg et du logo.
// Usage : node scripts/generate-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/favicon.svg');

// Icône Apple (écran d'accueil iOS) et PNG 192 / 512 pour le manifeste
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(svg, { density: 600 }).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(svg, { density: 600 }).resize(512, 512).png().toFile('public/icon-512.png');

// favicon.ico : un ICO contenant un PNG 32×32 (format accepté par tous les navigateurs récents)
const png32 = await sharp(svg, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12);
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png32]));

// Image de partage (Open Graph) 1200×630 : le logo sur une carte blanche, fond nuit avec halos bleu et violet
const source = 'src/assets/logo/logo-original.jpg';
const logo = await sharp(source).resize({ width: 640 }).png().toBuffer();
const { width: lw = 0, height: lh = 0 } = await sharp(logo).metadata();
const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <radialGradient id="a" cx="0.1" cy="0.9" r="0.7">
        <stop offset="0" stop-color="#1236E0" stop-opacity="0.7"/>
        <stop offset="1" stop-color="#1236E0" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="b" cx="0.9" cy="0.1" r="0.6">
        <stop offset="0" stop-color="#6B55F5" stop-opacity="0.6"/>
        <stop offset="1" stop-color="#6B55F5" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="#070B24"/>
    <rect width="1200" height="630" fill="url(#a)"/>
    <rect width="1200" height="630" fill="url(#b)"/>
    <rect x="${(1200 - lw) / 2 - 40}" y="60" width="${lw + 80}" height="${lh + 60}" rx="28" fill="#FFFFFF"/>
    <text x="600" y="${lh + 185}" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="#FFFFFF">Innover ensemble, bâtir le futur.</text>
  </svg>`,
);
await sharp(background)
  .composite([{ input: logo, left: Math.round((1200 - lw) / 2), top: 90 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('Icônes et image de partage générées dans public/.');

