import { notFound } from 'next/navigation';
import { AD_COMPONENTS } from '@/components/ads';
import { FORMAT_ORDER, type FormatId } from '@/lib/formats';

/**
 * ISOLERAD render-route. Inget UI, ingen chrome — bara duken.
 * Det är hit exportmotorn (headless Chrome / Playwright) pekar.
 * Människor tittar på /campaign/[slug].
 */
export function generateStaticParams() {
  return Object.keys(AD_COMPONENTS).flatMap((ad) =>
    FORMAT_ORDER.map((format) => ({ ad, format }))
  );
}

export default async function RenderPage({
  params,
}: {
  params: Promise<{ ad: string; format: string }>;
}) {
  const { ad, format } = await params;
  const Comp = AD_COMPONENTS[ad];
  if (!Comp || !FORMAT_ORDER.includes(format as FormatId)) notFound();

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background: 'transparent',
        width: 'fit-content',
      }}
    >
      <Comp format={format as FormatId} />
    </div>
  );
}
