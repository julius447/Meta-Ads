import type { CSSProperties, ReactNode } from 'react';
import { asset } from '@/lib/asset';

/* Ampy-palett + annonsspecifika toner. Teal är ENDA accenten per annons. */
export const C = {
  midnight: '#0E1338',
  midnightDeep: '#090B32',
  teal: '#00A991',
  tealBright: '#2BD4A8',
  yellow: '#FFE500',
  ink: '#0B0B0F',
  paper: '#FFFFFF',
} as const;

/**
 * Fullbleed-foto med redaktionell grade.
 * Research: lyft svärtan (aldrig 0), högdagrar under 245, kall skugga,
 * korn i LUMINANS. Det som säljer äkthet är imperfektionen ingen skulle valt.
 */
export function Photo({
  src,
  alt = '',
  objectPosition = 'center',
  grade = true,
  dim = 0,
  style,
}: {
  src: string;
  alt?: string;
  objectPosition?: string;
  grade?: boolean;
  /** Extra nedtoning 0–1 för textkontrast. */
  dim?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          // Lyft svärtan + kyl skuggan en aning. Aldrig klippta vita.
          filter: grade
            ? 'contrast(0.96) saturate(0.92) brightness(1.02)'
            : undefined,
        }}
      />
      {grade && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            // Kall skugga i botten, varm nolla i mitten → dokumentärkänsla
            background:
              'linear-gradient(180deg, rgba(10,14,30,0.18) 0%, rgba(10,14,30,0) 38%, rgba(8,10,24,0.10) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      )}
      {dim > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(6,8,20,${dim})`,
          }}
        />
      )}
    </div>
  );
}

/** Fint luminanskorn — ~1,5 %. Bryter den digitala plastigheten. */
export function Grain({ opacity = 0.055 }: { opacity?: number }) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>`;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: '160px 160px',
      }}
    />
  );
}

/**
 * Botten-gradient som ger text fäste utan att lägga en platta över bilden.
 * Mjukare än en hård scrim — läser som ljussättning, inte som overlay.
 */
export function BottomScrim({
  from = 0.0,
  to = 0.92,
  stop = '46%',
}: {
  from?: number;
  to?: number;
  stop?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, rgba(6,8,20,${from}) ${stop}, rgba(6,8,20,${to}) 100%)`,
      }}
    />
  );
}

/**
 * Glaskort — den FIXADE varianten.
 * Research: billig glassmorphism = för hög opacitet, ingen saturate (→ gråmuddig),
 * och ingen kant. Ljus faller uppifrån: 1 px ljus innerkant upptill, mörk nedtill.
 */
export function GlassCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 28,
        padding: '44px 48px',
        background: 'rgba(18,22,40,0.28)',
        backdropFilter: 'blur(26px) saturate(180%)',
        WebkitBackdropFilter: 'blur(26px) saturate(180%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.35), 0 24px 60px rgba(0,0,0,0.28)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Opak midnight-block (Group 11/12-språket). Läser skarpt även i 150 px tumnagel. */
export function MidnightBlock({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: C.midnightDeep,
        padding: '56px 64px 64px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Grön pill-CTA (Group 12). Enda accentytan i annonsen. */
export function PillCTA({
  children,
  bg = C.teal,
  color = '#fff',
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: bg,
        color,
        borderRadius: 999,
        padding: '26px 46px',
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

/** Understruken nyckelterm — hans signatur i mörker-mallarna. */
export function Underlined({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        textDecoration: 'underline',
        textUnderlineOffset: '0.14em',
        textDecorationThickness: '0.055em',
      }}
    >
      {children}
    </span>
  );
}
