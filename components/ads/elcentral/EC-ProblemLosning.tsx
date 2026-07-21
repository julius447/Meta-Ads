import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, PillCTA, C } from '../primitives';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-PROBLEM · "Offerten sa 45 000. Det behövdes inte."
 *
 * Ägarens idé: en problem/lösning för elcentral. Han har rätt i att den kan bli
 * stark — vi säljer bokstavligen en lösning på ett problem.
 *
 * MEN JAG BYGGER DEN INTE SOM GROUP 5 (två kolumner sida vid sida), av två skäl:
 *  1. Två jämnstora kolumner = två konkurrerande fokuspunkter, och research är
 *     entydig: två fokuspunkter halverar varandra. Ögat i flödet gör EN vertikal
 *     svep och EN fixering.
 *  2. Emoji-som-ikon är listat som ett av de tydligaste "mall/AI"-tellen 2026.
 *
 * I stället: en VERTIKAL dramaturgi. Problemet överst (mörkt, siffran som svider),
 * vändningen under (ljust, lättnaden). En läsriktning, ett crescendo — och
 * kandören som payoff: vi tjänar på att du byter, och säger ändå ifrån.
 *
 * ⚠ FAKTAGRÄNS: 45 000 kr är hämtat ur ägarens egen SMS-mall (Group 7).
 * Kompletteringsspannet måste stämmas av mot faktabanken före live.
 */
export function ECProblemLosning({ format }: { format: FormatId }) {
  const f = FORMATS[format];
  const isStory = format === 'story';
  // Fotot är en smal remsa som binder ihop de två halvorna visuellt.
  const photoH = Math.round(f.h * (isStory ? 0.3 : format === 'square' ? 0.22 : 0.26));
  const photoTop = Math.round(f.h / 2 - photoH / 2);
  const photoBottom = photoTop + photoH;

  return (
    <AdCanvas
      format={format}
      style={{ background: C.midnightDeep }}
      bleed={
        <>
          {/* Övre halva: problemet, i mörker */}
          <div style={{ position: 'absolute', inset: 0, background: C.midnightDeep }} />
          {/* Fotoremsa i mitten */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: photoTop,
              height: photoH,
              overflow: 'hidden',
            }}
          >
            <Photo
              src="/photos/porslinsproppar.jpg"
              alt="Gammal elcentral med porslinsproppar"
              objectPosition="50% 40%"
              dim={0.28}
            />
            <Grain opacity={0.05} />
          </div>
          {/* Undre halva: lösningen, i ljus */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: photoBottom,
              background: '#F4F6FA',
            }}
          />
        </>
      }
    >
      {/* Zonerna positioneras ABSOLUT mot samma mått som bakgrunden.
          Flex-layout gick sönder här: när innehållet översteg duken shrinkade
          spacer-diven och zonerna gled ur synk med fotoremsan. */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* ── PROBLEMET ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: photoTop,
            padding: `${f.safe.top + 8}px ${f.safe.side + 20}px 38px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 18,
          }}
        >
          <span
            style={{
              fontSize: 27,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Offerten
          </span>
          <div
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: isStory ? 128 : 116,
              lineHeight: 0.9,
              letterSpacing: '-0.035em',
              color: '#fff',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            45 000 kr
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 500,
              lineHeight: 1.25,
              color: 'rgba(255,255,255,0.66)',
            }}
          >
            &rdquo;Hela elcentralen måste bytas.&rdquo;
          </p>
        </div>

        {/* ── LÖSNINGEN ── */}
        <div
          style={{
            position: 'absolute',
            top: photoBottom,
            left: 0,
            right: 0,
            bottom: 0,
            padding: `42px ${f.safe.side + 20}px ${f.safe.bottom + 8}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 27,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: C.teal,
            }}
          >
            Vad som faktiskt behövdes
          </span>
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: isStory ? 82 : 74,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              color: C.midnightDeep,
              textWrap: 'balance',
            }}
          >
            En komplettering. Inte en ny central.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.3,
              color: 'rgba(14,19,56,0.7)',
              maxWidth: 880,
            }}
          >
            Vi tjänar på att du byter. Vi säger ändå ifrån när du inte behöver.
          </p>
          <div style={{ marginTop: 8 }}>
            <PillCTA>Gör testet</PillCTA>
          </div>
        </div>
      </div>
    </AdCanvas>
  );
}
