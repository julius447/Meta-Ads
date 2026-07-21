import { AdCanvas } from '../AdCanvas';
import { Photo, Grain, BottomScrim, C } from '../primitives';
import { type FormatId } from '@/lib/formats';

/**
 * EC-13 · "Så ska det se ut bakom luckan"
 *
 * Klon av ägarens Group 11. Den enda annonsen i kampanjen som visar det GODA
 * utfallet i stället för hotet — den behövs som motvikt, annars blir hela
 * Elcentral-serien enbart oro.
 *
 * Signaturgrepp: den tealfärgade linjen mellan rubrik och CTA. Den är hela
 * annonsens ornament — inget mer får läggas till.
 */
export function EC13BakomLuckan({ format }: { format: FormatId }) {
  const isStory = format === 'story';

  return (
    <AdCanvas
      format={format}
      style={{ background: C.midnightDeep }}
      bleed={
        <>
          <Photo
            src="/photos/elcentral-modern.jpg"
            alt="Modern, korrekt installerad elcentral"
            objectPosition={isStory ? '50% 38%' : '50% 44%'}
          />
          <Grain opacity={0.045} />
          <BottomScrim stop={isStory ? '58%' : '46%'} />
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: isStory ? 86 : 80,
            lineHeight: 0.98,
            letterSpacing: '-0.028em',
            color: '#fff',
            textWrap: 'balance',
            textShadow: '0 4px 26px rgba(0,0,0,0.45)',
          }}
        >
          Så ska det se ut bakom luckan till elcentralen
        </h1>

        {/* Signaturlinjen — annonsens enda ornament */}
        <span style={{ width: 150, height: 6, background: C.teal, borderRadius: 3 }} />

        <p
          style={{
            margin: 0,
            fontSize: 42,
            fontWeight: 600,
            lineHeight: 1.22,
            letterSpacing: '-0.012em',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Boka en kostnadsfri rådgivning
        </p>
      </div>
    </AdCanvas>
  );
}
