import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, C } from '../primitives';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-05 · Nyhets-native
 *
 * KLON av ägarens Group 10-mall. Min första version underkändes, och han hade
 * rätt — felet var inte typsnittet utan LAYOUTEN:
 *   v1 (fel): vänsterställt, rubriken bröts på två rader per segment, subhead
 *             i samma tunga grad → kompakt och rörigt.
 *   v2 (nu):  CENTRERAT, EN rad per rubriksegment, linjer kant till kant med
 *             STATISTIK-chippet centrerat, subhead i lägre grad.
 *
 * Text i bild är korrekt här — text ÄR nyhetsformatets innehåll.
 *
 * ⚠ FAKTAGRÄNS: siffran ärvs från ägarens mall och är INTE verifierad av mig.
 * Måste stämmas av mot Elsäkerhetsverket före live.
 */

export interface NyhetProps {
  format: FormatId;
  kicker?: string;
  line1: string;
  line2: string;
  sub: string;
  photo: string;
  objectPosition?: string;
}

export function ECNyhetBase({
  format,
  kicker = 'Statistik',
  line1,
  line2,
  sub,
  photo,
  objectPosition = '55% 46%',
}: NyhetProps) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  // Rubriken MÅSTE rymmas på en rad per segment — det är hela mallens rytm.
  const h = isStory ? 88 : 84;

  return (
    <AdCanvas
      format={format}
      bleed={
        <>
          <Photo src={photo} alt="" objectPosition={objectPosition} dim={0.5} />
          {/* Band bakom textblocket. Utan detta slåss fotots ljuspunkter med
              rubriken — plintarna i EC-05A åt upp "PÅ FEM ÅR". */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(6,8,20,0) 18%, rgba(6,8,20,0.72) 40%, rgba(6,8,20,0.78) 68%, rgba(6,8,20,0.35) 88%)',
            }}
          />
          <Grain opacity={0.07} />
        </>
      }
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          transform: 'translateY(-42%)',
          padding: `0 ${Math.max(f.safe.side, 40)}px`,
          textAlign: 'center',
        }}
      >
        {/* Kicker mellan två linjer kant till kant */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26 }}>
          <span style={{ flex: 1, height: 3, background: '#fff' }} />
          <span
            style={{
              background: '#fff',
              color: C.ink,
              fontFamily: 'Anton, sans-serif',
              fontSize: 32,
              letterSpacing: '0.06em',
              padding: '8px 20px 5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {kicker}
          </span>
          <span style={{ flex: 1, height: 3, background: '#fff' }} />
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: 'Anton, sans-serif',
            fontWeight: 400,
            fontSize: h,
            lineHeight: 1.06,
            letterSpacing: '0.002em',
            textTransform: 'uppercase',
            color: '#fff',
            whiteSpace: 'nowrap',
            textShadow: '0 3px 20px rgba(0,0,0,0.5)',
          }}
        >
          {line1}
          <span style={{ display: 'block', color: C.yellow }}>{line2}</span>
        </h1>

        <p
          style={{
            margin: '18px auto 0',
            fontFamily: 'Anton, sans-serif',
            fontSize: isStory ? 46 : 42,
            lineHeight: 1.14,
            letterSpacing: '0.012em',
            textTransform: 'uppercase',
            color: '#fff',
            maxWidth: 900,
            textShadow: '0 2px 14px rgba(0,0,0,0.5)',
          }}
        >
          {sub}
        </p>
      </div>
    </AdCanvas>
  );
}

/** EC-05A — händelse-statistiken. */
export function EC05ANyhet({ format }: { format: FormatId }) {
  return (
    <ECNyhetBase
      format={format}
      line1="298 händelser på fem år –"
      line2="felet satt i elcentralen."
      sub="Villor och radhus är överrepresenterade – och felet syns sällan i förväg"
      photo="/photos/elcentral-handske.jpg"
    />
  );
}

/** EC-05B — samma mall, åldersvinkeln, på porslinspropps­fotot. */
export function EC05BNyhet({ format }: { format: FormatId }) {
  return (
    <ECNyhetBase
      format={format}
      kicker="Elsäkerhet"
      line1="Porslinsproppar sitter kvar"
      line2="i tusentals svenska villor."
      sub="De saknar oftast jordfelsbrytare – skyddet som bryter strömmen i tid"
      photo="/photos/porslinsproppar.jpg"
      objectPosition="50% 44%"
    />
  );
}
