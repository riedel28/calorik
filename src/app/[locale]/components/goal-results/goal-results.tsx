'use client';

import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GoalResults = () => {
  const t = useTranslations('goalResults');

  const results = [
    { label: t('estimatedBodyFat'), value: '12', unit: '%' },
    { label: t('dailyCalories'), value: '1800', unit: 'kcal/day' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {results.map((result) => (
            <div className="rounded-2xl bg-muted/50 p-4 text-center" key={result.label}>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {result.label}
              </p>
              <p className="mt-1 font-semibold text-2xl text-foreground">{result.value}</p>
              <p className="text-muted-foreground text-sm">{result.unit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalResults;
