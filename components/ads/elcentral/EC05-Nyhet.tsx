import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, C } from '../primitives';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-05 · Nyhets-native
 *
 * KLON av ägarens EC-05A/B_final_4x5.png — inte av mitt minne av en Figma-mall.
 *
 * v1 och v2 underkändes båda. Orsaken var densamma: jag byggde efter en
 * beskrivning i stället för att öppna referensen, som låg i public/assets/ads/
 * hela tiden. Mätt mot originalet hade jag fel om justering (vänster, inte
 * centrerat), chipfärg (röd, inte vit), gulmarkering (bara siffran, inte hela
 * raden), underrubrikens register (gemener grotesk, inte versal Anton) och
 * källraden (fanns, saknades hos mig).
 *
 * Strukturen, mätt ur originalet:
 *   blixt uppe vänster · rött chip · svart platta som hugger rubriken ·
 *   helbredds svart band med underrubrik + källa.
 * Chip och rubrikplatta ligger PÅ fotot; bandet går kant till kant.
 */

const RED = '#E4142B';

export interface NyhetProps {
  format: FormatId;
  kicker: string;
  /** Gulmarkeras. Bara siffran/måttet — aldrig hela raden. */
  lead: string;
  line1Rest: string;
  line2: string;
  sub: string;
  source: string;
  photo: string;
  objectPosition?: string;
}

export function ECNyhetBase({
  format,
  kicker,
  lead,
  line1Rest,
  line2,
  sub,
  source,
  photo,
  objectPosition = '50% 46%',
}: NyhetProps) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  const pad = 65;
  // Mätt mot originalet: rad 1 ska sluta vid ~845px, inte 965. 82→72.
  const h = isStory ? 76 : format === 'square' ? 67 : 72;

  return (
    <AdCanvas
      format={format}
      style={{ background: '#000' }}
      bleed={
        <>
          {/* Originalets foto är mörkare än något jag har extraherat. dim
              kompenserar, men det är en approximation — [GAP] originalbild. */}
          <Photo src={photo} alt="" objectPosition={objectPosition} dim={0.38} />
          <Grain opacity={0.05} />

          {/* Blixten uppe till vänster — finns i originalet, lätt att missa */}
          <svg
            width="34"
            height="46"
            viewBox="0 0 24 32"
            style={{ position: 'absolute', left: 52, top: 46 }}
            aria-hidden
          >
            <path d="M14 0L2 18h7l-2 14L21 13h-8l2-13z" fill="#fff" />
          </svg>

          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            {/* Chip + rubrikplatta ligger PÅ fotot */}
            <div style={{ paddingLeft: pad, paddingRight: pad }}>
              <span
                style={{
                  display: 'inline-block',
                  background: RED,
                  color: '#fff',
                  fontFamily: 'Anton, sans-serif',
                  fontSize: isStory ? 40 : 36,
                  letterSpacing: '0.03em',
                  padding: '11px 20px 7px',
                  textTransform: 'uppercase',
                }}
              >
                {kicker}
              </span>
            </div>

            <div style={{ paddingLeft: pad, paddingRight: pad }}>
              <h1
                style={{
                  display: 'inline-block',
                  margin: 0,
                  background: '#000',
                  padding: '16px 22px 12px',
                  fontFamily: 'Anton, sans-serif',
                  fontWeight: 400,
                  fontSize: h,
                  // 1.0 klippte ringen på Å och prickarna på Ä mot raden ovanför.
                  // Svenska diakriter kräver mer luft än engelsk versalsättning.
                  lineHeight: 1.07,
                  letterSpacing: '0.004em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                <span style={{ color: C.yellow }}>{lead}</span> {line1Rest}
                <span style={{ display: 'block' }}>{line2}</span>
              </h1>
            </div>

            {/* Bandet går kant till kant — underrubrik + källa */}
            <div
              style={{
                background: '#000',
                padding: `26px ${pad}px ${Math.max(f.safe.bottom, 78)}px`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: isStory ? 50 : 46,
                  fontWeight: 600,
                  lineHeight: 1.26,
                  letterSpacing: '-0.014em',
                  color: '#fff',
                }}
              >
                {sub}
              </p>
              <p
                style={{
                  margin: '22px 0 0',
                  fontSize: isStory ? 30 : 27,
                  fontWeight: 500,
                  letterSpacing: '-0.004em',
                  color: 'rgba(255,255,255,0.62)',
                }}
              >
                {source}
              </p>
            </div>
          </div>
        </>
      }
    >
      <div />
    </AdCanvas>
  );
}

/** EC-05A — händelsestatistiken. */
export function EC05ANyhet({ format }: { format: FormatId }) {
  return (
    <ECNyhetBase
      format={format}
      kicker="Statistik"
      lead="298"
      line1Rest="händelser på fem år –"
      line2="felet satt i elcentralen"
      sub="Villor och radhus är överrepresenterade – och felet syns sällan i förväg"
      source="Källa: Elsäkerhetsverket, 2018–2022"
      photo="/photos/porslinsproppar.jpg"
      objectPosition="50% 40%"
    />
  );
}

/** EC-05B — fältmätningen. */
export function EC05BNyhet({ format }: { format: FormatId }) {
  return (
    <ECNyhetBase
      format={format}
      kicker="Från fältet"
      lead="78 grader"
      line1Rest="i proppskåpet –"
      line2="ingen hade märkt något"
      sub="Ett glapp i skenan kan hetta upp – ofta utan att något syns"
      source="Uppmätt vid utryckning i januari"
      photo="/photos/elcentral-handske.jpg"
      objectPosition="55% 46%"
    />
  );
}
