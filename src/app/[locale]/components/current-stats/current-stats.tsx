'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { ProjectionFormValues } from '../projection-form/projection-form';

const CurrentStats = () => {
  const t = useTranslations('currentStats');
  const { watch } = useFormContext<ProjectionFormValues>();
  const units = watch('units');

  const massUnit = units === 'metric' ? 'kg' : 'lbs';

  const stats = [
    { label: t('tdee'), value: '2000', unit: 'kcal' },
    { label: t('bmr'), value: '1600', unit: 'kcal' },
    { label: t('lbm'), value: '68', unit: massUnit },
    { label: t('fm'), value: '12', unit: massUnit },
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
