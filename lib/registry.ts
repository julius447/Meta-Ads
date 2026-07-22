import { GENERATED_ADS } from './registry.generated';
import type { FormatId } from './formats';

export interface AdEntry {
  id: string;
  variant: string;
  campaign: string;
  /** 'image' = befintlig PNG. 'component' = React-annons (nya spåret). */
  kind: 'image' | 'component';
  formats: Partial<Record<FormatId, string>>;
}

/**
 * React-annonser (nya spåret). Dessa ERSÄTTER PNG-versionen med samma id —
 * en komponent renderar alla tre format.
 */
const ALL3: Partial<Record<FormatId, boolean>> = { feed: true, square: true, story: true };
const comp = (id: string, campaign: string, formats: Partial<Record<FormatId, boolean>> = ALL3): AdEntry => ({
  id, variant: '', campaign, kind: 'component',
  formats: Object.fromEntries(Object.keys(formats).map(k => [k, id])),
});

const COMPONENT_ADS: AdEntry[] = [
  comp('EC-01', 'Elcentral'),
  // Ägaren strök kvadrat för EC-03 — bara feed + story körs.
  comp('EC-03', 'Elcentral', { feed: true, story: true }),
  comp('EC-05A', 'Elcentral'),
  comp('EC-05B', 'Elcentral'),
  comp('EC-09', 'Elcentral'),
  comp('EC-08', 'Elcentral'),
  comp('EC-13', 'Elcentral'),
  comp('EN05-KV-A', 'Energi', { square: true }),
  comp('EN05-KV-B', 'Energi', { square: true }),
  comp('EN05-KV-C', 'Energi', { square: true }),
];

/**
 * Kapade av ägaren 2026-07-21. EC-07 ligger här av annat skäl: jag har ingen
 * duglig bild till den och vägrar skeppa AI-bilderna han redan underkänt.
 */
const RETIRED = new Set([
  'Elcentral/EC-06A', 'Elcentral/EC-06B', 'Elcentral/EC-07', 'Elcentral/EC-12',
  'Elcentral/EC-NYHET', 'Elcentral/EC-PROBLEM',
]);

const overridden = new Set(COMPONENT_ADS.map(a => `${a.campaign}/${a.id}`));

export const ADS: AdEntry[] = [
  ...COMPONENT_ADS,
  ...GENERATED_ADS.filter(a => {
    const k = `${a.campaign}/${a.id}`;
    return !overridden.has(k) && !RETIRED.has(k);
  }),
];

export const CAMPAIGNS = [...new Set(ADS.map(a => a.campaign))].sort();

export function adsByCampaign(campaign: string): AdEntry[] {
  return ADS.filter(a => a.campaign === campaign);
}

export function campaignSlug(name: string): string {
  return name.toLowerCase().replace(/å|ä/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');
}

export function campaignFromSlug(slug: string): string | undefined {
  return CAMPAIGNS.find(c => campaignSlug(c) === slug);
}

export function adKey(a: AdEntry): string {
  return a.variant ? `${a.id}-${a.variant}` : a.id;
}
