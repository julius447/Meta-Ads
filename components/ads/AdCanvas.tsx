import type { CSSProperties, ReactNode } from 'react';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * Fast annonsduk i EXAKT designstorlek.
 *
 * Nyckelinsikt: alla tre format är 1080 px BREDA — bara höjden skiljer
 * (1350 / 1080 / 1920). Därför designar vi horisontellt i råa px en gång,
 * och formatanpassningen blir enbart en vertikal fråga (safe zones + fördelning).
 * Det är därför ads-komponenterna inte behöver en enda media query.
 */
export function AdCanvas({
  format,
  children,
  style,
  bleed,
}: {
  format: FormatId;
  children: ReactNode;
  style?: CSSProperties;
  /** Innehåll som ska gå utanför safe zone (foton, gradienter). */
  bleed?: ReactNode;
}) {
  const f = FORMATS[format];
  return (
    <div
      id="canvas"
      data-format={format}
      style={{
        position: 'relative',
        width: f.w,
        height: f.h,
        overflow: 'hidden',
        background: '#000',
        isolation: 'isolate',
        ...style,
      }}
    >
      {bleed}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          paddingTop: f.safe.top,
          paddingBottom: f.safe.bottom,
          paddingLeft: f.safe.side,
          paddingRight: f.safe.side,
          display: 'flex',
          flexDirection: 'column',
          justifyContent:
            f.stack === 'spread'
              ? 'space-between'
              : f.stack === 'center'
                ? 'center'
                : 'flex-end',
        }}
      >
        {children}
      </div>
    </div>
  );
}
