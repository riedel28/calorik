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
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div className="rounded-2xl bg-muted/50 p-4 text-center" key={stat.label}>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="mt-1 font-semibold text-2xl text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.unit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStats;
