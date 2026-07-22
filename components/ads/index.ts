import type { ComponentType } from 'react';
import type { FormatId } from '@/lib/formats';
import { EC01Morkret } from './elcentral/EC01-Morkret';
import { EC03OftastInte } from './elcentral/EC03-OftastInte';
import { EC05ANyhet, EC05BNyhet } from './elcentral/EC05-Nyhet';
import { EC09Fragor } from './elcentral/EC09-Fragor';
import { EC08Sms } from './elcentral/EC08-Sms';
import { EC13BakomLuckan } from './elcentral/EC13-BakomLuckan';
import { EN05KvartettenA, EN05KvartettenB, EN05KvartettenC, EN05KvartettenBar } from './energi/EN05-Kvartetten';

export type AdComponent = ComponentType<{ format: FormatId }>;

/** Nyckel = adId i registret. Alla format renderas av samma komponent. */
export const AD_COMPONENTS: Record<string, AdComponent> = {
  'EC-01': EC01Morkret,
  'EC-03': EC03OftastInte,
  'EC-05A': EC05ANyhet,
  'EC-05B': EC05BNyhet,
  'EC-09': EC09Fragor,
  'EC-08': EC08Sms,
  'EC-13': EC13BakomLuckan,
  'EN05-KV-A': EN05KvartettenA,
  'EN05-KV-B': EN05KvartettenB,
  'EN05-KV-C': EN05KvartettenC,
  'EN05-KV-BAR': EN05KvartettenBar,
};
