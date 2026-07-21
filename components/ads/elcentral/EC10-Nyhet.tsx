import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, BottomScrim, C } from '../primitives';
import { type FormatId } from '@/lib/formats';

/**
 * EC-NYHET · "298 händelser på fem år"
 *
 * Nyhets-native. Ägaren: "det är en jävligt bra annonsstrategi" — och han har
 * rätt: formatet lånar trovärdighet från en redaktionell kontext i stället för
 * att be om den. Det är också den enda av våra mallar där mycket text i bild
 * är KORREKT, eftersom text ÄR nyhetsformatets innehåll.
 *
 * TYPSNITT: Anton, inte Switzer. Kondenserad tabloid-vikt är vad ögat läser som
 * "nyhet". Per ägardirektiv väljs typsnitt per annons.
 *
 * ⚠ FAKTAGRÄNS: siffran 298 måste vara källbelagd (Elsäkerhetsverket) innan
 * detta går live. Den ärvs från v1-mallen och är INTE verifierad av mig.
 */
export function EC10Nyhet({ format }: { format: FormatId }) {
  const isStory = format === 'story';
  const isSquare = format === 'square';

  return (
    <AdCanvas
      format={format}
      bleed={
        <>
          <Photo
            src="/photos/elcentral-handske.jpg"
            alt="Elektriker med handske vid öppen elcentral"
            objectPosition={isStory ? '55% 38%' : '55% 46%'}
            dim={0.34}
          />
          <BottomScrim stop={isStory ? '44%' : '22%'} to={0.93} />
          <Grain opacity={0.07} />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {/* Kicker med linjer — den redaktionella signalen */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.9)' }} />
          <span
            style={{
              background: '#fff',
              color: C.ink,
              fontFamily: 'Anton, sans-serif',
              fontSize: 30,
              letterSpacing: '0.08em',
              padding: '9px 20px 6px',
            }}
          >
            STATISTIK
          </span>
          <span style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.9)' }} />
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'Anton, sans-serif',
            fontWeight: 400,
            fontSize: isSquare ? 76 : 84,
            lineHeight: 0.94,
            letterSpacing: '0.005em',
            color: '#fff',
            textTransform: 'uppercase',
            textShadow: '0 4px 24px rgba(0,0,0,0.45)',
          }}
        >
          {/* Explicita radbrytningar — automatisk ombrytning gav ensamt "ÅR". */}
          298 händelser
          <br />
          på fem år
          <span style={{ display: 'block', color: C.yellow, marginTop: 8 }}>
            felet satt
            <br />i elcentralen
          </span>
        </h1>

        <p
          style={{
            margin: 0,
            fontFamily: 'Anton, sans-serif',
            fontSize: 34,
            lineHeight: 1.16,
            letterSpacing: '0.01em',
            color: 'rgba(255,255,255,0.92)',
            textTransform: 'uppercase',
            maxWidth: 960,
          }}
        >
          Villor och radhus är överrepresenterade — och felet syns sällan i förväg
        </p>

        <p
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.62)',
            letterSpacing: '0.01em',
          }}
        >
          Källa: Elsäkerhetsverket · Ampy
        </p>
      </div>
    </AdCanvas>
  );
}
