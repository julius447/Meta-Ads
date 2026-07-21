import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CAMPAIGNS,
  campaignSlug,
  campaignFromSlug,
  adsByCampaign,
  adKey,
} from '@/lib/registry';
import { FORMATS, FORMAT_ORDER, type FormatId } from '@/lib/formats';
import { AdFrame } from '@/components/AdFrame';

/**
 * KONTAKTARKET — granskningsytan.
 *
 * Finns för att döda den dyraste delen av processen: en annons i taget.
 * Ägaren ska se hela kampanjen på en skärm och kunna svara "4, 9 och 11 är
 * dåliga" i ETT meddelande, i stället för elva rundor.
 *
 * Numret framför varje annons är hela poängen — det ger honom ett kort
 * handtag att peka med. Ta inte bort det.
 */

export function generateStaticParams() {
  return CAMPAIGNS.flatMap((c) =>
    FORMAT_ORDER.map((f) => ({ slug: campaignSlug(c), format: f })),
  );
}

export default async function ContactSheet({
  params,
}: {
  params: Promise<{ slug: string; format: string }>;
}) {
  const { slug, format } = await params;
  const campaign = campaignFromSlug(slug);
  const fmt = FORMAT_ORDER.find((f) => f === format) as FormatId | undefined;
  if (!campaign || !fmt) notFound();

  const ads = adsByCampaign(campaign);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-6 py-10">
      <nav className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link href="/" className="text-neutral-500 transition hover:text-neutral-200">
          ← Alla kampanjer
        </Link>
        <Link
          href={`/campaign/${slug}`}
          className="text-neutral-500 transition hover:text-neutral-200"
        >
          Detaljvy
        </Link>
      </nav>

      <header className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-white/10 pb-5">
        <div className="flex items-baseline gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-50">
            {campaign}
          </h1>
          <span className="tabular-nums text-sm text-neutral-500">
            {ads.length} annonser
          </span>
        </div>
        <div className="flex gap-1.5">
          {FORMAT_ORDER.map((f) => (
            <Link
              key={f}
              href={`/kontaktark/${slug}/${f}`}
              className={
                f === fmt
                  ? 'rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-900'
                  : 'rounded-full px-3 py-1 text-xs text-neutral-400 ring-1 ring-white/15 transition hover:text-neutral-100'
              }
            >
              {FORMATS[f].label}
            </Link>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(196px,1fr))] gap-x-5 gap-y-8">
        {ads.map((ad, i) => (
          <div key={adKey(ad)} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="tabular-nums text-[13px] font-semibold text-neutral-100">
                {i + 1}
              </span>
              <span className="truncate text-[12px] text-neutral-500">
                {adKey(ad)}
              </span>
            </div>
            <AdFrame ad={ad} format={fmt} targetWidth={196} caption={false} />
          </div>
        ))}
      </div>
    </main>
  );
}
