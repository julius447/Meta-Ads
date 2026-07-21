#!/usr/bin/env node
/**
 * Exportmotor: renderar varje React-annons till pixel-exakt PNG.
 * Headless Chrome mot den isolerade /render-routen. deviceScaleFactor=1 så
 * preview === export (research: designa i 1:1, aldrig skala i efterhand).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.RENDER_BASE || 'http://localhost:3000';
const OUT = join(process.cwd(), 'out-ads');
const FORMATS = { feed: [1080, 1350], square: [1080, 1080], story: [1080, 1920] };
const ADS = process.argv.slice(2);
if (!ADS.length) { console.error('Ange annons-id, t.ex. node scripts/render-ads.mjs EC-01 EC-03'); process.exit(1); }

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

for (const ad of ADS) {
  for (const [fmt, [w, h]] of Object.entries(FORMATS)) {
    const file = join(OUT, `${ad}__${fmt}_${w}x${h}.png`);
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${w},${h}`,
      '--default-background-color=00000000',
      `--screenshot=${file}`,
      `${BASE}/render/${ad}/${fmt}/`,
    ], { stdio: 'pipe' });
    console.log(`✓ ${ad} ${fmt} ${w}×${h}`);
  }
}
console.log(`\nKlart → ${OUT}`);
