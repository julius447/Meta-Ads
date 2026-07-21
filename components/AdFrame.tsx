'use client';

import { FORMATS, type FormatId, formatCssVars } from '@/lib/formats';
import { asset } from '@/lib/asset';
import type { AdEntry } from '@/lib/registry';
import { AD_COMPONENTS } from '@/components/ads';

/**
 * Renderar en annons i EXAKT designstorlek och skalar ned visuellt med
 * transform:scale. Layouten räknas alltid i 1080-bas — aldrig via zoom,
 * som skulle räkna om radbrytningar och därmed ändra designen.
 */
export function AdFrame({
  ad,
  format,
  targetWidth = 260,
  caption = true,
}: {
  ad: AdEntry;
  format: FormatId;
  targetWidth?: number;
  /** Av i kontaktarket — där är formatet redan givet av vyn. */
  caption?: boolean;
}) {
  const f = FORMATS[format];
  const z = targetWidth / f.w;
  const src = ad.formats[format];
  const Comp = ad.kind === 'component' ? AD_COMPONENTS[ad.id] : undefined;
  const hasContent = ad.kind === 'component' ? Boolean(Comp) : Boolean(src);

  return (
    <figure className="flex flex-col gap-2">
      <div
        className="relative overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-white/10"
        style={{ width: f.w * z, height: f.h * z }}
      >
        {hasContent ? (
          <div
            style={{
              width: f.w,
              height: f.h,
              transform: `scale(${z})`,
              transformOrigin: 'top left',
              ...formatCssVars(f),
            }}
          >
            {Comp ? (
              <Comp format={format} />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={asset(src!)}
                alt={`${ad.id} ${f.label}`}
                width={f.w}
                height={f.h}
                className="block h-full w-full object-cover"
              />
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center">
            <span className="text-[10px] uppercase tracking-widest text-neutral-600">
              saknas i {f.ratio}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="flex items-baseline justify-between text-[11px]">
          <span className="font-medium text-neutral-300">{f.label}</span>
          <span className="tabular-nums text-neutral-500">
            {f.ratio} · {f.w}×{f.h}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
