import { asset } from '@/lib/asset';
import { type FormatId } from '@/lib/formats';

/**
 * EN-05 · Kvartetten — de fyra EN-05-annonserna sammanslagna
 *
 * Ägarens insikt: som fyra separata annonser ser läsaren aldrig KONTRASTEN.
 * Ett pris i taget säger inget. Fyra på en yta — 34 500 kr ner till 12 000 kr
 * för samma hus, samma vinter — ÄR argumentet. Ett hus i varje hörn, CTA i mitten.
 *
 * Läsordning = argumentet: dyrast uppe vänster, billigast nere höger. Ögat
 * vandrar nedför räkningen. Priserna ankras i de FYRA YTTERHÖRNEN så
 * mitten­medaljongen aldrig täcker en siffra ("en i varje hörn", ordagrant).
 *
 * Tre riktningar (variant): A cirkel-medaljong · B spännvidds-platta · C rena
 * hörn + minimal CTA. Fotona är exponerings­matchade band ur de färdiga
 * EN-05-annonserna — ingen omgradering behövs.
 */

type Variant = 'A' | 'B' | 'C';

const C = {
  navy: '#0E1338',
  navyDeep: '#090B32',
  teal: '#00A991',
  tealBright: '#2BD4A8',
  ink: '#05060f',
};

/** Dyrast → billigast. Hörnet styr var text ankras. Priser owner-satta 2026-07-22. */
const CELLS = [
  { key: 'direktel', label: 'Direktel', price: '43 000', photo: '/photos/en05/direktel.jpg', corner: 'tl' },
  { key: 'luftluft', label: 'Luftvärmepump', price: '25 000', photo: '/photos/en05/luftluft.jpg', corner: 'tr' },
  { key: 'luftvatten', label: 'Luft–vatten', price: '20 000', photo: '/photos/en05/luftvatten.jpg', corner: 'bl' },
  { key: 'bergvarme', label: 'Bergvärme', price: '19 000', photo: '/photos/en05/bergvarme.jpg', corner: 'br' },
] as const;

type Corner = (typeof CELLS)[number]['corner'];

function anchor(corner: Corner, pad = 54): React.CSSProperties {
  const base: React.CSSProperties = { position: 'absolute', display: 'flex', flexDirection: 'column' };
  const v = corner[0] === 't' ? { top: pad } : { bottom: pad };
  const h = corner[1] === 'l' ? { left: pad, alignItems: 'flex-start', textAlign: 'left' as const }
                              : { right: pad, alignItems: 'flex-end', textAlign: 'right' as const };
  return { ...base, ...v, ...h };
}

function Cell({ cell, bare = false, pad }: { cell: (typeof CELLS)[number]; bare?: boolean; pad?: number }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(cell.photo)}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Bart läge: bara fotona ihop, ägaren sätter all text själv i Figma */}
      {bare ? null : <CellText cell={cell} pad={pad} />}
    </div>
  );
}

function CellText({ cell, pad }: { cell: (typeof CELLS)[number]; pad?: number }) {
  return (
    <>
      {/* Läsbarhetslager: mörkare mot ytterhörnet där texten sitter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            cell.corner[0] === 't'
              ? 'linear-gradient(180deg, rgba(5,6,15,0.72) 0%, rgba(5,6,15,0.12) 46%, rgba(5,6,15,0.30) 100%)'
              : 'linear-gradient(0deg, rgba(5,6,15,0.72) 0%, rgba(5,6,15,0.12) 46%, rgba(5,6,15,0.30) 100%)',
        }}
      />
      <div style={anchor(cell.corner, pad)}>
        <span
          style={{
            fontSize: 27,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.82)',
            marginBottom: 6,
          }}
        >
          {cell.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 30, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>ca</span>
          <span style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 0.9 }}>
            {cell.price}
          </span>
        </div>
        <span style={{ fontSize: 26, fontWeight: 500, color: 'rgba(255,255,255,0.62)', marginTop: 4 }}>kr/år</span>
      </div>
    </>
  );
}

function Center({ variant }: { variant: Variant }) {
  if (variant === 'A') {
    return (
      <div
        style={{
          width: 372,
          height: 372,
          borderRadius: '50%',
          background: C.navyDeep,
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 40,
        }}
      >
        <span style={{ fontSize: 33, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.12 }}>
          Samma hus.
          <br />
          Fyra räkningar.
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, color: 'rgba(255,255,255,0.6)', margin: '14px 0 20px', maxWidth: 250, lineHeight: 1.3 }}>
          Värmesystemet avgör priset
        </span>
        <span
          style={{
            background: C.teal,
            color: '#fff',
            fontSize: 25,
            fontWeight: 700,
            padding: '15px 30px',
            borderRadius: 999,
            letterSpacing: '-0.01em',
          }}
        >
          Räkna på ditt hus →
        </span>
      </div>
    );
  }

  if (variant === 'B') {
    // Spännvidden ÄR hjälten: skillnaden mellan dyrast och billigast.
    return (
      <div
        style={{
          width: 468,
          padding: '34px 30px 30px',
          borderRadius: 30,
          background: C.navyDeep,
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: 23, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
          Skillnad per år
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '4px 0 2px' }}>
          <span style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em', color: C.tealBright, lineHeight: 0.9 }}>
            22 500
          </span>
        </div>
        <span style={{ fontSize: 26, fontWeight: 500, color: 'rgba(255,255,255,0.62)', marginBottom: 18 }}>
          kr — samma hus, samma vinter
        </span>
        <span
          style={{
            background: C.teal,
            color: '#fff',
            fontSize: 26,
            fontWeight: 700,
            padding: '16px 34px',
            borderRadius: 999,
          }}
        >
          Räkna på ditt hus →
        </span>
      </div>
    );
  }

  // C — minimal: liten pill, låter de fyra priserna vara hjältarna
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
      }}
    >
      <span
        style={{
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#fff',
          background: 'rgba(9,11,50,0.82)',
          padding: '12px 24px',
          borderRadius: 14,
          backdropFilter: 'blur(4px)',
        }}
      >
        Samma vinter. Fyra räkningar.
      </span>
      <span
        style={{
          background: C.teal,
          color: '#fff',
          fontSize: 27,
          fontWeight: 700,
          padding: '17px 36px',
          borderRadius: 999,
          boxShadow: '0 18px 50px rgba(0,0,0,0.5)',
        }}
      >
        Räkna på ditt hus →
      </span>
    </div>
  );
}

export function EN05Kvartetten({
  format,
  variant = 'A',
  bare = false,
  noCenter = false,
}: {
  format: FormatId;
  variant?: Variant;
  /** Inga etiketter, inga priser, ingen mitt. Bara fotona. */
  bare?: boolean;
  /** Behåll hörnetiketter + priser men dölj mittmedaljongen (ägaren sätter CTA). */
  noCenter?: boolean;
}) {
  const isStory = format === 'story';
  const canvasH = isStory ? 1920 : format === 'feed' ? 1350 : 1080;

  // Story: rutnätet får INTE nå kanterna — Instagram/Facebook lägger
  // profil/namn i toppen (~14%) och CTA-sticker + "Skicka meddelande" i botten
  // (~20%). Hela rutnätet inkl. hörnpriser måste ligga innanför safe zone,
  // annars kapas siffrorna. Därför krymps det till safe-bandet med navy-ram.
  const SAFE_TOP = 300;
  const SAFE_BOTTOM = 1536; // 1920 − 20% (Stories-stickerns höjd)
  const gridTop = isStory ? SAFE_TOP : 0;
  const gridH = isStory ? SAFE_BOTTOM - SAFE_TOP : canvasH;

  const grid = (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: gridTop,
        width: 1080,
        height: gridH,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }}
    >
      {CELLS.map((c) => (
        <Cell key={c.key} cell={c} bare={bare} pad={isStory ? 72 : 54} />
      ))}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.14)', transform: 'translateX(-1px)' }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.14)', transform: 'translateY(-1px)' }} />
      {!bare && !noCenter && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Center variant={variant} />
        </div>
      )}
    </div>
  );

  return (
    <div style={{ position: 'relative', width: 1080, height: canvasH, background: C.ink, overflow: 'hidden' }}>
      {grid}
    </div>
  );
}

export const EN05KvartettenA = ({ format }: { format: FormatId }) => <EN05Kvartetten format={format} variant="A" />;
export const EN05KvartettenB = ({ format }: { format: FormatId }) => <EN05Kvartetten format={format} variant="B" />;
export const EN05KvartettenC = ({ format }: { format: FormatId }) => <EN05Kvartetten format={format} variant="C" />;
/** Bar fotobas — inga etiketter, inga priser, ingen CTA. Ägaren sätter text själv. */
export const EN05KvartettenBar = ({ format }: { format: FormatId }) => <EN05Kvartetten format={format} bare />;
/** Hörnetiketter + priser, men INGEN mittkopia — ägaren sätter CTA:n själv. */
export const EN05KvartettenLabels = ({ format }: { format: FormatId }) => (
  <EN05Kvartetten format={format} noCenter />
);
