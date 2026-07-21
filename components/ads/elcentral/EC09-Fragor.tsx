import { AdCanvas } from '../AdCanvas';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-09 · Instagram-frågor
 *
 * KLON av ägarens EC-09-NEW i Figma — inte av min tidigare EC-06.
 * Skillnaderna mot min version, mätta ur hans:
 *   1. Namnen är HANDKLOTTRADE, inte rena staplar. Det är gesten som säljer
 *      att någon faktiskt suddat något — en prydlig rektangel läser som grafik.
 *   2. Caption-blocket är EN oregelbunden svart blobb (rad-hugg), inte
 *      separata pills. Raderna möts och smälter ihop.
 *   3. Hans copy, ordagrant. Jag har inte rört ett ord.
 *
 * Korten står kvar i systemtypsnitt — native-mimikry kollapsar annars.
 */

const SYS = '-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif';

/** Ägarens frågor först (ordagrant ur EC-09-NEW), därefter påfyllning i samma ton. */
const QUESTIONS: string[] = [
  'Vad kostar det att byta elcentral',
  'När måste man byta elcentral?',
  'Propparna går när vi kör ugn + diskmaskin samtidigt, är det normalt?',
  'Ibland surrar det från proppskåpet, farligt?',
  'Vad gör en jordfelsbrytare?',
  'Kan jag byta en taklampa själv eller behöver jag en elektriker för det?',
  'Måste jag byta min elcentral?',
  'Mina säkringar går konstant. Hur borde jag tänka?',
  'Köpte min elcentral för 30 år sedan, hur vet jag när den behöver bytas?',
  'Räcker min elcentral om vi skaffar laddbox?',
  'Har porslinsproppar. Måste allt bytas?',
  'Vad är lastbalansering?',
  'Elektrikern sa att hela centralen måste bytas. Stämmer det?',
  'Vad kostar det att uppgradera i stället för att byta?',
  'Hur lång tid tar ett byte?',
  'Gäller ROT-avdraget på elcentralen?',
  'Installerar ni laddboxar?',
  'Det luktar bränt vid proppskåpet. Vad gör jag?',
];

/**
 * Handklotter över användarnamnet.
 * Tre överlappande drag med wobble — deterministiskt per index, så renderingen
 * blir identisk varje gång (annars ändras annonsen mellan exporter).
 */
function Scribble({ w, seed }: { w: number; seed: number }) {
  const h = 40;
  const rnd = (n: number) => {
    const x = Math.sin(seed * 37.1 + n * 11.7) * 10000;
    return x - Math.floor(x);
  };
  // Ett överstrykningsdrag går FRAM OCH TILLBAKA. En vågform i en riktning
  // läser som grafik; det är vändningarna i kanterna som gör gesten mänsklig.
  const pass = (s: number) => {
    const dir = s % 2 === 0;
    const y0 = 10 + s * 4.5 + rnd(s) * 3;
    // Låt draget skjuta över kanten — ett tuschdrag stannar inte på millimetern
    const over = 6 + rnd(s * 3) * 10;
    const x0 = dir ? -over : w + over;
    const x1 = dir ? w + over : -over;
    const steps = 5;
    const d: string[] = [`M ${x0.toFixed(1)} ${y0.toFixed(1)}`];
    for (let i = 1; i <= steps; i++) {
      const x = x0 + ((x1 - x0) * i) / steps;
      // Kraftig y-variation = ojämn silhuett. Låg variation gav en stapel.
      const y = y0 + (rnd(s * 9 + i) - 0.5) * 22;
      const cx = x - (x1 - x0) / (steps * 2);
      const cy = y + (rnd(s + i * 3) - 0.5) * 26;
      d.push(`Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return d.join(' ');
  };

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={pass(i)}
          stroke="#151515"
          /* Ojämn tjocklek per drag — samma bredd hela vägen blir en stapel igen */
          strokeWidth={[17, 10, 14, 7][i]}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </svg>
  );
}

function Card({ q, w, seed }: { q: string; w: number; seed: number }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        border: '1px solid #ededed',
        padding: '22px 26px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Scribble w={w} seed={seed} />
      <div
        style={{
          fontFamily: SYS,
          fontSize: 32,
          fontWeight: 700,
          fontStyle: 'italic',
          lineHeight: 1.26,
          color: '#111',
          letterSpacing: '-0.012em',
        }}
      >
        {q}
      </div>
      <div
        style={{
          background: '#efefef',
          borderRadius: 12,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: SYS, fontSize: 27, fontStyle: 'italic', fontWeight: 500, color: '#9a9a9a' }}>
          Besvara
        </span>
        <span style={{ fontSize: 26, color: '#bcbcbc' }}>&#8250;</span>
      </div>
    </div>
  );
}

/** Ägarens copy — ordagrant. Ändra inte utan hans ord. */
const CAPTION_LINES = [
  { t: '”MÅSTE JAG BYTA ELCENTRAL?”', size: 60, caps: true },
  { t: 'Oftast är svaret nej.', size: 58, caps: false },
  { t: 'Elcentral-kollen visar vad du', size: 58, caps: false },
  { t: 'behöver göra 👇', size: 58, caps: false },
];

export function EC09Fragor({ format }: { format: FormatId }) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  // Rutnätet ska svämma över nederkanten — en äkta skärmdump kapas mitt i ett kort.
  const count = isStory ? 18 : format === 'square' ? 9 : 12;
  const shown = QUESTIONS.slice(0, count);
  const left = shown.filter((_, i) => i % 2 === 0);
  const right = shown.filter((_, i) => i % 2 === 1);
  const widths = [250, 300, 280, 230, 190, 260, 220, 270, 240, 285, 205, 265, 215, 255, 235, 275, 245, 210];

  return (
    <AdCanvas
      format={format}
      style={{ background: '#fafafa' }}
      bleed={
        <div style={{ position: 'absolute', inset: 0, background: '#fafafa', overflow: 'hidden' }}>
          {/* IG-header */}
          <div
            style={{
              height: 104,
              borderBottom: '1.5px solid #dcdcdc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: '#fff',
            }}
          >
            <span style={{ position: 'absolute', left: 38, fontSize: 50, color: '#111', fontWeight: 300, lineHeight: 1 }}>
              &#8249;
            </span>
            <span style={{ fontFamily: SYS, fontSize: 37, fontWeight: 700, color: '#111' }}>Svar</span>
          </div>

          <div style={{ display: 'flex', gap: 18, padding: '22px 24px', alignItems: 'flex-start' }}>
            {[left, right].map((col, ci) => (
              <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {col.map((q, j) => {
                  const idx = j * 2 + ci;
                  return <Card key={idx} q={q} w={widths[idx % widths.length]} seed={idx + 1} />;
                })}
              </div>
            ))}
          </div>
        </div>
      }
    >
      {/* Caption-blobben — radhugg som möts och smälter ihop, likt ägarens */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
          padding: `0 ${isStory ? 40 : 28}px`,
        }}
      >
        {CAPTION_LINES.map((l, i) => (
          <div key={i} style={{ lineHeight: 1.34 }}>
            <span
              style={{
                background: '#000',
                color: '#fff',
                fontWeight: 800,
                fontSize: l.size,
                letterSpacing: '-0.022em',
                padding: '10px 22px',
                borderRadius: 14,
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              {l.t}
            </span>
          </div>
        ))}
      </div>
    </AdCanvas>
  );
}
