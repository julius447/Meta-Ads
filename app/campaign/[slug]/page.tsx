import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CAMPAIGNS,
  campaignSlug,
  campaignFromSlug,
  adsByCampaign,
  adKey,
} from '@/lib/registry';
import { FORMAT_ORDER } from '@/lib/formats';
import { AdFrame } from '@/components/AdFrame';

export function generateStaticParams() {
  return CAMPAIGNS.map((c) => ({ slug: campaignSlug(c) }));
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = campaignFromSlug(slug);
  if (!campaign) notFound();

  const ads = adsByCampaign(campaign);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <nav className="mb-10">
        <Link
          href="/"
          className="text-sm text-neutral-500 transition hover:text-neutral-200"
        >
          ← Alla kampanjer
        </Link>
      </nav>

      <header className="mb-12 flex items-baseline justify-between gap-6 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-50">
          {campaign}
        </h1>
        <span className="tabular-nums text-sm text-neutral-500">
          {ads.length} annonser
        </span>
      </header>

      <div className="flex flex-col gap-16">
        {ads.map((ad) => {
          const missing = FORMAT_ORDER.filter((f) => !ad.formats[f]);
          return (
            <section key={adKey(ad)} id={adKey(ad)} className="scroll-mt-8">
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="text-lg font-medium text-neutral-100">
                  {adKey(ad)}
                </h2>
                {missing.length > 0 && (
                  <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-300 ring-1 ring-amber-400/20">
                    saknar {missing.map((m) => FORMAT_ORDER.includes(m) && m).filter(Boolean).length} format
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-start gap-6">
                {FORMAT_ORDER.map((f) => (
                  <AdFrame key={f} ad={ad} format={f} targetWidth={240} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
