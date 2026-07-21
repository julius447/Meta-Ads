/**
 * Formatsystemet — en enda sanning för alla annonsformat.
 *
 * Designbeslut (research-grundade, 2026-07):
 * - Vi designar i 1080-bas (matchar allt befintligt material + Ads Manager-praxis).
 *   Meta rekommenderar numera 1440-bas för stillbild; `exportScale` låter oss
 *   rendera 1,333× utan att röra designen (Playwright, deviceScaleFactor).
 * - Safe zones är DATA, inte CSS. Från mars 2026 delar Stories och Reels EN zon:
 *   topp 14%, botten 20–35%, sidor 6%.
 * - "Center-square"-regeln: allt bärande (budskap, siffra, ansikte, logga) ska
 *   rymmas i en centrerad 1:1-ruta så samma idé överlever alla tre formaten.
 */

export type FormatId = 'feed' | 'square' | 'story';

export interface FormatSpec {
  id: FormatId;
  label: string;
  ratio: string;
  /** Logisk designyta i px (canvas renderas exakt så här). */
  w: number;
  h: number;
  /** Multiplicera vid export för Metas rekommenderade upplösning. */
  exportScale: number;
  /** Safe zones i px, uträknade ur procentsatserna ovan. */
  safe: { top: number; bottom: number; side: number };
  /** Typografisk skalfaktor — story tål/kräver större text. */
  scale: number;
  /** Hur innehållet fördelas vertikalt. */
  stack: 'bottom' | 'spread' | 'center';
}

export const FORMATS: Record<FormatId, FormatSpec> = {
  feed: {
    id: 'feed',
    label: 'Feed',
    ratio: '4:5',
    w: 1080,
    h: 1350,
    exportScale: 1.3333, // → 1440×1800 (Metas rek. för stillbild)
    safe: { top: 48, bottom: 96, side: 48 },
    scale: 1,
    stack: 'bottom',
  },
  square: {
    id: 'square',
    label: 'Kvadrat',
    ratio: '1:1',
    w: 1080,
    h: 1080,
    exportScale: 1.3333, // → 1440×1440
    safe: { top: 48, bottom: 80, side: 48 },
    scale: 0.94,
    stack: 'bottom',
  },
  story: {
    id: 'story',
    label: 'Story / Reels',
    ratio: '9:16',
    w: 1080,
    h: 1920,
    exportScale: 1.3333, // → 1440×2560
    // Unified safe zone (mars 2026): topp 14%, botten 20%, sidor 6%
    safe: { top: 269, bottom: 384, side: 65 },
    scale: 1.18,
    stack: 'bottom',
  },
};

export const FORMAT_ORDER: FormatId[] = ['feed', 'square', 'story'];

/** CSS-variabler som varje annonskomponent kan luta sig mot. */
export function formatCssVars(f: FormatSpec): React.CSSProperties {
  return {
    // 1 "u" = 1px i 1080-bas. Låter komponenter skala med bredden.
    ['--u' as string]: `${f.w / 1080}`,
    ['--s' as string]: `${f.scale}`,
    ['--safe-top' as string]: `${f.safe.top}px`,
    ['--safe-bottom' as string]: `${f.safe.bottom}px`,
    ['--safe-side' as string]: `${f.safe.side}px`,
  };
}
