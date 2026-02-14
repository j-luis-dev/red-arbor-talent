#!/usr/bin/env node
/* eslint-disable no-undef */
/**
 * Generates assets/images/splash-icon.png from icon.svg (redarbor logo).
 * Run: node scripts/generate-splash-icon.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'icon.svg');
const outPath = path.join(root, 'assets', 'images', 'splash-icon.png');
const size = 512;

async function main() {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log('Written:', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
