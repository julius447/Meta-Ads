#!/usr/bin/env node
/**
 * Synkar befintligt annonsmaterial in i appen och genererar lib/registry.generated.ts.
 *
 * Källor:
 *  1. ~/Desktop/Ampy Annonser — KLARA/Färdiga annonser <Kampanj>/*.png   → färdiga annonser
 *  2. ~/Desktop/Annonser.zip (uppackad)                                   → v1-mallar (Group 5–16)
 *
 * Körs om när som helst: `npm run sync`
 */
import { readdirSync, existsSync, mkdirSync, copyFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { homedir } from 'node:os';

const ROOT = process.cwd();
const KLARA = join(homedir(), 'Desktop', 'Ampy Annonser — KLARA');
const TEMPLATES_SRC = '/tmp/annonser-zip/z1';
const PUB = join(ROOT, 'public', 'assets');

const CAMPAIGNS = ['Elcentral', 'Service', 'Elkollen', 'Energi', 'Belysning', 'Branding'];

/** Filnamn → format. Ex: EC-01_final_4x5.png */
function detectFormat(file) {
  if (/_9x16|1080x1920|9-16/.test(file)) return 'story';
  if (/_1x1|1080x1080|1-1/.test(file)) return 'square';
  return 'feed'; // 4x5 default
}

/** EK-03-V2b_final_4x5.png → { id:'EK-03', variant:'V2b' } */
function parseId(file) {
  const stem = basename(file, extname(file)).replace(/_final.*$/, '');
  const m = stem.match(/^([A-Z]{2,3}-\d{2})(?:-)?(.*)$/);
  if (!m) return { id: stem, variant: '' };
  return { id: m[1], variant: (m[2] || '').replace(/^-/, '') };
}

function ensure(dir) { if (!existsSync(dir)) mkdirSync(dir, { recursive: true }); }

const ads = new Map(); // key = `${campaign}/${id}${variant}`

// ---- 1. Färdiga annonser ----
for (const c of CAMPAIGNS) {
  const dir = join(KLARA, `Färdiga annonser ${c}`);
  if (!existsSync(dir)) { console.warn(`⚠  saknas: ${dir}`); continue; }
  const files = readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png'));
  if (!files.length) console.warn(`⚠  TOM: Färdiga annonser ${c}`);
  ensure(join(PUB, 'ads', c));
  for (const f of files) {
    copyFileSync(join(dir, f), join(PUB, 'ads', c, f));
    const { id, variant } = parseId(f);
    const key = `${c}/${id}${variant}`;
    const fmt = detectFormat(f);
    if (!ads.has(key)) ads.set(key, { id, variant, campaign: c, kind: 'image', formats: {} });
    ads.get(key).formats[fmt] = `/assets/ads/${c}/${f}`;
  }
}

// ---- 2. v1-mallar ----
if (existsSync(TEMPLATES_SRC)) {
  ensure(join(PUB, 'templates'));
  for (const f of readdirSync(TEMPLATES_SRC).filter(f => f.endsWith('.png'))) {
    copyFileSync(join(TEMPLATES_SRC, f), join(PUB, 'templates', f));
    const id = basename(f, '.png').replace(/\s+/g, '-');
    ads.set(`Mallar/${id}`, {
      id, variant: '', campaign: 'Mallar', kind: 'image',
      formats: { feed: `/assets/templates/${f}` },
    });
  }
}

const list = [...ads.values()].sort((a, b) =>
  a.campaign.localeCompare(b.campaign) || a.id.localeCompare(b.id) || a.variant.localeCompare(b.variant));

const out = `// GENERERAD av scripts/sync-assets.mjs — redigera inte för hand.
import type { AdEntry } from './registry';

export const GENERATED_ADS: AdEntry[] = ${JSON.stringify(list, null, 2)};
`;
writeFileSync(join(ROOT, 'lib', 'registry.generated.ts'), out);

const byCampaign = list.reduce((m, a) => (m[a.campaign] = (m[a.campaign] || 0) + 1, m), {});
console.log('✓ registry.generated.ts skriven');
console.table(byCampaign);
console.log(`Totalt: ${list.length} annonser`);
