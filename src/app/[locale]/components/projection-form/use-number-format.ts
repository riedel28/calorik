'use client';

import { useFormatter } from 'next-intl';

const KCAL_DISPLAY_STEP = 10;

/** Locale-aware number formatting shared by the stats and goal panels. */
export const useNumberFormat = () => {
  const format = useFormatter();

  const fixed = (value: number, digits = 1) =>
    format.number(value, { maximumFractionDigits: digits, minimumFractionDigits: digits });

  return {
    /** Prefixes "≈ " to values derived from an estimated body fat %. */
    approx: (text: string, isEstimated: boolean) => (isEstimated ? `≈ ${text}` : text),
    fixed,
    kcal: (value: number) => format.number(Math.round(value)),
    /** Rounded to 10 kcal: the projection is not more precise than that. */
    kcalRounded: (value: number) =>
      format.number(Math.round(value / KCAL_DISPLAY_STEP) * KCAL_DISPLAY_STEP),
    signed: (value: number, digits = 1) => {
      const abs = fixed(Math.abs(value), digits);
      if (value > 0) {
        return `+${abs}`;
      }
      if (value < 0) {
        return `−${abs}`;
      }
      return `±${abs}`;
    },
  };
};
