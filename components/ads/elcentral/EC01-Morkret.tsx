import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, BottomScrim, Underlined } from '../primitives';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-01 · "Mörkret"
 *
 * Konceptet ägaren gillar: igenkänningen att man hittar till elcentralen i mörker
 * — och att just det ÄR problemet. Kandör-hooken, inte skräck.
 *
 * AVSTEG FRÅN v1-MALLEN (medvetet):
 * 1. Glaskortet är borttaget. Fotot har redan perfekt naturlig kontrast — ett
 *    lysande skåp i ett mörkt rum. En ruta ovanpå det konkurrerar med bildens
 *    egen ljussättning och blir grumlig i 150 px tumnagel (research). Texten
 *    ligger nu i den mörka nedre tredjedelen där den redan har fäste.
 * 2. Displaytexten är uppskalad ~35 % och satt i 800 med tight tracking —
 *    v1 var för liten för att bära i flödet.
 * 3. "ELCENTRAL-KOLLEN · 2 MIN · INGET MEJL" struken (ägardirektiv).
 * 4. Teal-raden + AMPY-wordmark struken (ägardirektiv 2026-07-20) — annonsen
 *    bär rubrik + handlingsrad, inget mer. GODKÄND.
 */
export function EC01Morkret({ format }: { format: FormatId }) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  // Kvadrat har minst höjd → texten hamnar högre upp i bilden och behöver
  // att scrimmet börjar tidigare för att få fäste.
  const scrimStop = format === 'story' ? '52%' : format === 'square' ? '30%' : '40%';

  return (
    <AdCanvas
      format={format}
      bleed={
        <>
          <Photo
            src="/photos/hall-morker-telefon.jpg"
            alt="Person lyser med mobilen mot elcentralen i en mörk hall"
            /* Story är högre → panna panoreringen uppåt så skåpet hamnar i
               den övre halvan och texten får rent mörker under sig. */
            objectPosition={isStory ? '50% 30%' : '50% 42%'}
            dim={0.06}
          />
          {/* Scrimmet måste börja PRECIS ovanför textblocket, annars grumlar det
              bilden i onödan (story) eller ger för dåligt fäste (kvadrat). */}
          <BottomScrim stop={scrimStop} to={0.94} />
          <Grain />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: isStory ? 40 : 30 }}>
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: isStory ? 96 : 88,
            lineHeight: 0.94,
            letterSpacing: '-0.028em',
            color: '#fff',
            textWrap: 'balance',
            maxWidth: 940,
          }}
        >
          Du kan vägen dit
          <br />i mörker.
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.62)', marginTop: 14 }}>
            Och det är problemet.
          </span>
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 38,
            lineHeight: 1.3,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 860,
          }}
        >
          Gör vårt test och se hur din <Underlined>elcentral</Underlined> presterar.
        </p>

      </div>
    </AdCanvas>
  );
}
