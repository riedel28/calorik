'use client';

import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useProjection } from '../projection-form/use-projection';

const formatCalories = (value: number | null) => (value === null ? '—' : String(Math.round(value)));

const formatMass = (value: number | null, isEstimated: boolean) =>
  value === null ? '—' : `${isEstimated ? '~' : ''}${value.toFixed(1)}`;

const CurrentStats = () => {
  const t = useTranslations('currentStats');
  const { bmr, bodyFatIsEstimated, fatMassKg, leanMassKg, tdee } = useProjection();

  const stats = [
    { label: t('tdee'), unit: 'kcal', value: formatCalories(tdee) },
    { label: t('bmr'), unit: 'kcal', value: formatCalories(bmr) },
    { label: t('lbm'), unit: 'kg', value: formatMass(leanMassKg, bodyFatIsEstimated) },
    { label: t('fm'), unit: 'kg', value: formatMass(fatMassKg, bodyFatIsEstimated) },
  ];

  return (
    <Card className="shadow-xs">
      <CardHeader className="px-4 pt-4 pb-2 sm:px-5">
        <CardTitle className="text-base">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((stat) => (
            <div className="rounded-xl bg-muted/50 p-3 text-center" key={stat.label}>
              <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="font-semibold text-foreground text-lg">{stat.value}</p>
              <p className="text-muted-foreground text-xs">{stat.unit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStats;
