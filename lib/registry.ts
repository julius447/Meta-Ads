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
const COMPONENT_ADS: AdEntry[] = [
  { id: 'EC-01', variant: '', campaign: 'Elcentral', kind: 'component',
    formats: { feed: 'EC-01', square: 'EC-01', story: 'EC-01' } },
  { id: 'EC-03', variant: '', campaign: 'Elcentral', kind: 'component',
    formats: { feed: 'EC-03', square: 'EC-03', story: 'EC-03' } },
  { id: 'EC-NYHET', variant: '', campaign: 'Elcentral', kind: 'component',
    formats: { feed: 'EC-NYHET', square: 'EC-NYHET', story: 'EC-NYHET' } },
  { id: 'EC-PROBLEM', variant: '', campaign: 'Elcentral', kind: 'component',
    formats: { feed: 'EC-PROBLEM', square: 'EC-PROBLEM', story: 'EC-PROBLEM' } },
];

const overridden = new Set(COMPONENT_ADS.map(a => `${a.campaign}/${a.id}`));

export const ADS: AdEntry[] = [
  ...COMPONENT_ADS,
  ...GENERATED_ADS.filter(a => !overridden.has(`${a.campaign}/${a.id}`)),
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
