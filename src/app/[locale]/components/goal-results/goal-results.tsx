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
    <Card className="shadow-xs">
      <CardHeader className="px-4 pt-4 pb-2 sm:px-5">
        <CardTitle className="text-base">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5">
        <div className="grid grid-cols-2 gap-2">
          {results.map((result) => (
            <div className="rounded-xl bg-muted/50 p-3 text-center" key={result.label}>
              <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
                {result.label}
              </p>
              <p className="font-semibold text-foreground text-lg">{result.value}</p>
              <p className="text-muted-foreground text-xs">{result.unit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalResults;
