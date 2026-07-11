'use client';

import { useFormatter, useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useProjection } from '../projection-form/use-projection';

const CurrentStats = () => {
  const t = useTranslations('currentStats');
  const tUnits = useTranslations('units');
  const format = useFormatter();
  const { bmr, bodyFatIsEstimated, fatMassKg, leanMassKg, tdee } = useProjection();

  const formatCalories = (value: number | null) =>
    value === null ? '—' : format.number(Math.round(value), { useGrouping: false });

  const formatMass = (value: number | null, isEstimated: boolean) =>
    value === null
      ? '—'
      : `${isEstimated ? '~' : ''}${format.number(value, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        })}`;

  const stats = [
    { label: t('tdee'), unit: tUnits('kcal'), value: formatCalories(tdee) },
    { label: t('bmr'), unit: tUnits('kcal'), value: formatCalories(bmr) },
    { label: t('lbm'), unit: tUnits('kg'), value: formatMass(leanMassKg, bodyFatIsEstimated) },
    { label: t('fm'), unit: tUnits('kg'), value: formatMass(fatMassKg, bodyFatIsEstimated) },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader className="px-5 pt-5 pb-3 sm:px-6">
        <CardTitle className="font-display text-lg tracking-tight">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-medium text-[13px] text-muted-foreground ">{stat.label}</p>
              <p className="mt-1 font-display font-semibold text-2xl text-foreground tabular-nums tracking-tight">
                {stat.value}
                <span className="ml-1 font-normal font-sans text-muted-foreground text-sm">
                  {stat.unit}
                </span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStats;
