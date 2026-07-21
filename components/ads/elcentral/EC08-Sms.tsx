import { AdCanvas } from '../AdCanvas';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-08 · SMS med grannen
 *
 * Klon av ägarens Group 7/8-mall. Formatet är kampanjens starkaste
 * trovärdighetsbärare: rekommendationen kommer från en granne, inte från oss.
 * Vi är tredje part i vårt eget säljargument.
 *
 * Systemtypsnitt (inte Switzer) — native-mimikry kollapsar annars.
 * Ingen "ingen mejl", inga bullets. Samtalet ÄR annonsen.
 */

const SF = '-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif';

type Msg = { side: 'in' | 'out'; text: string; tail?: boolean };

const THREAD: Msg[] = [
  { side: 'out', text: 'Offerten på elcentralen kom precis' },
  { side: 'out', text: '45 000 kr skulle dem ha 🙈', tail: true },
  { side: 'in', text: 'oj' },
  { side: 'in', text: 'Känns ju lite väl dyrt' },
  {
    side: 'in',
    text: 'Gör testet som vi gjorde när vår elcentral höll på att strula. Elcentral­kollen hos Ampy. Var helt säker på att vår behövde bytas. Men istället behövde den bara uppgraderas.',
    tail: true,
  },
  {
    side: 'out',
    text: 'Så ni behövde inte köpa en helt ny elcentral? Som alla andra elektriker säger?!?!?!',
    tail: true,
  },
  { side: 'in', text: 'Nej haha 😂 Vi la pengarna på tvättstugan istället 🫠', tail: true },
];

function Bubble({ m }: { m: Msg }) {
  const out = m.side === 'out';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: out ? 'flex-end' : 'flex-start',
        marginBottom: m.tail ? 22 : 7,
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 780,
          background: out ? '#0A84FF' : '#E9E9EB',
          color: out ? '#fff' : '#0B0B0F',
          borderRadius: 34,
          padding: '18px 30px',
          fontFamily: SF,
          fontSize: 35,
          lineHeight: 1.28,
          letterSpacing: '-0.01em',
        }}
      >
        {m.text}
      </div>
    </div>
  );
}

export function EC08Sms({ format }: { format: FormatId }) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  // Kvadrat rymmer inte hela tråden utan att texten blir oläsligt liten.
  const thread = format === 'square' ? THREAD.slice(2) : THREAD;

  return (
    <AdCanvas
      format={format}
      style={{ background: '#F7F7F9' }}
      bleed={
        <div style={{ position: 'absolute', inset: 0, background: '#F7F7F9' }}>
          {/* iOS-statusrad */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '28px 52px 0 56px',
              fontFamily: SF,
              color: '#000',
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 600, color: '#000' }}>21:33</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 26 }}>
                {[11, 16, 21, 26].map((h) => (
                  <span key={h} style={{ width: 7, height: h, background: '#000', borderRadius: 2 }} />
                ))}
              </div>
              <svg width="34" height="26" viewBox="0 0 34 26">
                <path
                  d="M17 25a3.6 3.6 0 100-7.2 3.6 3.6 0 000 7.2zM5.5 12a17.5 17.5 0 0123 0l-3.8 3.8a12 12 0 00-15.4 0zM11.6 18a8.6 8.6 0 0110.8 0l-3.8 3.8a3.4 3.4 0 00-3.2 0z"
                  fill="#000"
                />
              </svg>
              <span
                style={{
                  width: 48,
                  height: 25,
                  border: '2.5px solid rgba(0,0,0,.4)',
                  borderRadius: 7,
                  padding: 2,
                  display: 'inline-block',
                }}
              >
                <span style={{ display: 'block', height: '100%', width: '72%', background: '#000', borderRadius: 2 }} />
              </span>
            </div>
          </div>

          {/* Kontakthuvud */}
          <div
            style={{
              paddingTop: 16,
              paddingBottom: 20,
              borderBottom: '1.5px solid #DBDBDB',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 44,
                top: 30,
                fontSize: 52,
                color: '#0A84FF',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              &#8249;
            </span>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'linear-gradient(180deg,#AAB0BA,#8D94A0)',
                color: '#fff',
                fontFamily: SF,
                fontSize: 46,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              J
            </div>
            <span style={{ fontFamily: SF, fontSize: 30, color: '#0B0B0F' }}>Johan (Granne)</span>
          </div>

          {/* Tråden */}
          <div style={{ padding: `${isStory ? 40 : 26}px 44px 0` }}>
            <div
              style={{
                textAlign: 'center',
                fontFamily: SF,
                fontSize: 26,
                fontWeight: 600,
                color: '#9A9AA0',
                marginBottom: 26,
              }}
            >
              Tors 19:38
            </div>
            {thread.map((m, i) => (
              <Bubble key={i} m={m} />
            ))}
          </div>
        </div>
      }
    >
      <div />
    </AdCanvas>
  );
}
