import Link from 'next/link';
import { ADS, CAMPAIGNS, campaignSlug, adsByCampaign } from '@/lib/registry';
import { asset } from '@/lib/asset';
import { FORMAT_ORDER, FORMATS } from '@/lib/formats';

export default function Home() {
  const total = ADS.length;
  const coverage = FORMAT_ORDER.map((f) => ({
    f,
    n: ADS.filter((a) => a.formats[f]).length,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="mb-12">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
          Ampy · internt annonsverktyg
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-50">
          Meta-annonser
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-400">
          Varje kampanj, varje annons, i alla tre format. Granska, jämför och
          iterera innan något går upp i Ads Manager.
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          <div>
            <dt className="text-[11px] uppercase tracking-widest text-neutral-500">
              Annonser
            </dt>
            <dd className="text-2xl font-semibold tabular-nums text-neutral-100">
              {total}
            </dd>
          </div>
          {coverage.map(({ f, n }) => (
            <div key={f}>
              <dt className="text-[11px] uppercase tracking-widest text-neutral-500">
                {FORMATS[f].ratio}
              </dt>
              <dd className="text-2xl font-semibold tabular-nums text-neutral-100">
                {n}
                <span className="ml-1 text-sm font-normal text-neutral-600">
                  /{total}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAMPAIGNS.map((c) => {
          const ads = adsByCampaign(c);
          const cover = ads.find((a) => a.formats.feed)?.formats.feed;
          return (
            <li key={c}>
              <Link
                href={`/campaign/${campaignSlug(c)}/`}
                className="group block overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition hover:ring-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                <div className="aspect-[4/5] overflow-hidden bg-neutral-950">
                  {cover && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset(cover)}
                      alt=""
                      className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="flex items-baseline justify-between px-4 py-3.5">
                  <span className="font-medium text-neutral-100">{c}</span>
                  <span className="tabular-nums text-sm text-neutral-500">
                    {ads.length}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
