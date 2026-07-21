import { AdCanvas } from '../AdCanvas';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-FRÅGOR · Instagram-frågor med svarsvägen
 *
 * Klon av ägarens Group 6-mall: äkta IG "Svar"-vy med frågekort, plus svarta
 * caption-plattor ovanpå. Formatet lånar trovärdighet från en verklig
 * gränssnittskontext — och frågorna GÖR argumentet åt oss: de visar att folk
 * faktiskt undrar det här, i sina egna ord.
 *
 * Systemtypsnitt i korten (inte Switzer) — native-mimikry kräver att UI:t ser
 * ut som iOS, annars kollapsar illusionen. Typsnitt väljs per annons.
 *
 * Rättat mot v1: stavfelet "STURL" → "STRUL".
 */

const QUESTIONS: { q: string; w: number }[] = [
  { q: 'När måste jag byta elcentral?', w: 250 },
  { q: 'Behövs jordfelsbrytare?', w: 300 },
  { q: 'Propparna går när vi kör ugn + diskmaskin samtidigt, är det normalt?', w: 280 },
  { q: 'Ibland surrar det från proppskåpet, farligt?', w: 230 },
  { q: 'Vad gör en jordfelsbrytare?', w: 190 },
  { q: 'Vad är lastbalansering?', w: 260 },
  { q: 'Köpte min elcentral för 30 år sedan, hur vet jag när den behöver bytas?', w: 220 },
  { q: 'Mina säkringar går konstant. Hur borde jag tänka?', w: 270 },
  { q: 'Räcker min elcentral om vi skaffar laddbox?', w: 240 },
  { q: 'Vad kostar det att uppgradera i stället för att byta?', w: 285 },
  { q: 'Har porslinsproppar. Måste allt bytas?', w: 205 },
  { q: 'Elektrikern sa att hela centralen måste bytas. Stämmer det?', w: 265 },
  { q: 'Hur lång tid tar ett byte?', w: 215 },
  { q: 'Gäller ROT-avdraget på elcentralen?', w: 255 },
];

const CAPTIONS = [
  { t: 'Varje dag får vi frågor om elcentraler.', s: 40 },
  { t: 'Problem, strul, byte, kompletteringar…', s: 40 },
  { t: 'Snabbaste sättet att få svar?', s: 44 },
  { t: '1. Elcentral­kollen', s: 42 },
  { t: '2. Fyll i vårt formulär', s: 42 },
  { t: '3. Ring oss', s: 42 },
];

function Card({ q, w }: { q: string; w: number }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 22,
        border: '1px solid #ececec',
        boxShadow: '0 1px 5px rgba(0,0,0,0.05)',
        padding: '26px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      {/* Svärtat användarnamn — samma redigeringsgest som i ägarens mall */}
      <div style={{ height: 30, width: w, borderRadius: 6, background: '#141414' }} />
      <div
        style={{
          fontFamily: '-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: 33,
          fontWeight: 700,
          fontStyle: 'italic',
          lineHeight: 1.24,
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
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, "SF Pro Text", sans-serif',
            fontSize: 28,
            fontStyle: 'italic',
            fontWeight: 600,
            color: '#9a9a9a',
          }}
        >
          Besvara
        </span>
        <span style={{ fontSize: 28, color: '#b6b6b6' }}>&#8250;</span>
      </div>
    </div>
  );
}

export function ECFragor({ format }: { format: FormatId }) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  // Rutnätet MÅSTE svämma över nederkanten. En äkta skärmdump av ett scroll-läge
  // kapas mitt i ett kort — slutar korten i luften avslöjas montaget direkt.
  const count = isStory ? 16 : format === 'square' ? 9 : 12;
  const shown = Array.from({ length: count }, (_, i) => QUESTIONS[i % QUESTIONS.length]);
  const left = shown.filter((_, i) => i % 2 === 0);
  const right = shown.filter((_, i) => i % 2 === 1);

  return (
    <AdCanvas
      format={format}
      style={{ background: '#fafafa' }}
      bleed={
        <div style={{ position: 'absolute', inset: 0, background: '#fafafa', overflow: 'hidden' }}>
          {/* IG-header */}
          <div
            style={{
              height: 108,
              borderBottom: '1.5px solid #dcdcdc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: '#fff',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 40,
                fontSize: 52,
                color: '#111',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              &#8249;
            </span>
            <span
              style={{
                fontFamily: '-apple-system, "SF Pro Text", sans-serif',
                fontSize: 38,
                fontWeight: 700,
                color: '#111',
              }}
            >
              Svar
            </span>
          </div>

          {/* Frågekort i två kolumner */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              padding: '24px 26px',
              alignItems: 'flex-start',
            }}
          >
            {[left, right].map((col, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {col.map((c, j) => (
                  <Card key={j} q={c.q} w={c.w} />
                ))}
              </div>
            ))}
          </div>
        </div>
      }
    >
      {/* Caption-plattorna — annonsens egentliga budskap, ovanpå gränssnittet */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          padding: `0 ${f.safe.side}px`,
        }}
      >
        {CAPTIONS.map((c, i) => (
          <span
            key={i}
            style={{
              background: '#0A0A0A',
              color: '#fff',
              borderRadius: 999,
              padding: '14px 34px',
              fontSize: c.s,
              fontWeight: 800,
              letterSpacing: '-0.015em',
              lineHeight: 1.16,
              textAlign: 'center',
              maxWidth: '100%',
              marginTop: i === 2 ? 16 : 0,
            }}
          >
            {c.t}
          </span>
        ))}
      </div>
    </AdCanvas>
  );
}
