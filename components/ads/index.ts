import type { ComponentType } from 'react';
import type { FormatId } from '@/lib/formats';
import { EC01Morkret } from './elcentral/EC01-Morkret';
import { EC03OftastInte } from './elcentral/EC03-OftastInte';
import { EC10Nyhet } from './elcentral/EC10-Nyhet';
import { ECProblemLosning } from './elcentral/EC-ProblemLosning';

export type AdComponent = ComponentType<{ format: FormatId }>;

/** Nyckel = adId i registret. Alla format renderas av samma komponent. */
export const AD_COMPONENTS: Record<string, AdComponent> = {
  'EC-01': EC01Morkret,
  'EC-03': EC03OftastInte,
  'EC-NYHET': EC10Nyhet,
  'EC-PROBLEM': ECProblemLosning,
};
