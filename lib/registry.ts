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

export const ADS: AdEntry[] = GENERATED_ADS;

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
