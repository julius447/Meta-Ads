import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, PillCTA, Underlined, C } from '../primitives';
import { FORMATS, type FormatId } from '@/lib/formats';

/**
 * EC-03 · "Du behöver oftast inte byta ut hela elcentralen"
 *
 * Bygger på ägarens Group 12-mall, som han själv rankade högst: äkta foto på
 * porslinsproppar + opakt midnight-block + grön pill-CTA. Ingen liquid glass,
 * ingen fejkad AI-bild.
 *
 * Detta är kampanjens starkaste hook: den säljer BORT sig själv. Ampy tjänar
 * på att du byter — och säger ändå att du oftast inte behöver. Ingen svensk
 * konkurrent kör den vinkeln (Ad Library-recon).
 *
 * SKÄRPT MOT v1: strammare typografi (800/-0.028em), tydlig vertikal rytm,
 * och blocket är proportionerat per format i stället för fast höjd.
 */
export function EC03OftastInte({ format }: { format: FormatId }) {
  const f = FORMATS[format];
  // Fotot får bära mer yta i story, mindre i kvadrat.
  const blockRatio = format === 'story' ? 0.34 : format === 'square' ? 0.42 : 0.37;
  const blockH = Math.round(f.h * blockRatio);

  return (
    <AdCanvas
      format={format}
      style={{ background: C.midnightDeep }}
      bleed={
        <>
          <div style={{ position: 'absolute', inset: `0 0 ${blockH}px 0`, overflow: 'hidden' }}>
            <Photo
              src="/photos/porslinsproppar.jpg"
              alt="Gammal elcentral med porslinsproppar"
              objectPosition="50% 46%"
            />
            <Grain opacity={0.045} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: blockH,
              background: C.midnightDeep,
            }}
          />
        </>
      }
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          paddingBottom: format === 'story' ? 0 : 8,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 82,
            lineHeight: 0.98,
            letterSpacing: '-0.028em',
            color: '#fff',
            textWrap: 'balance',
          }}
        >
          Du behöver <Underlined>oftast</Underlined> inte byta ut hela elcentralen
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.25,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          Gör testet och se om du <span style={{ color: C.tealBright }}>behöver</span> byta
        </p>

        <div style={{ marginTop: 6 }}>
          <PillCTA>Ta testet</PillCTA>
        </div>
      </div>
    </AdCanvas>
  );
}
