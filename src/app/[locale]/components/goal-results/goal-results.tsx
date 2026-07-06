'use client';

import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useProjection } from '../projection-form/use-projection';

const GoalResults = () => {
  const t = useTranslations('goalResults');
  const tRoot = useTranslations();
  const { bmr, bodyFatIsEstimated, dailyCalories, dailyCaloriesBelowBmr, goalBodyFatPct } =
    useProjection();

  const results = [
    {
      caption: bodyFatIsEstimated && goalBodyFatPct !== null ? tRoot('estimated') : null,
      label: t('estimatedBodyFat'),
      unit: '%',
      value:
        goalBodyFatPct === null
          ? '—'
          : `${bodyFatIsEstimated ? '~' : ''}${goalBodyFatPct.toFixed(1)}`,
    },
    {
      caption: null,
      label: t('dailyCalories'),
      unit: 'kcal/day',
      value: dailyCalories === null ? '—' : String(Math.round(dailyCalories)),
    },
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
              <p className="text-muted-foreground text-xs">
                {result.unit}
                {result.caption && ` (${result.caption})`}
              </p>
            </div>
          ))}
        </div>
        {dailyCaloriesBelowBmr && bmr !== null && (
          <p className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-amber-800 text-sm dark:bg-amber-950 dark:text-amber-200">
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {t('belowBmrWarning', { bmr: Math.round(bmr) })}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalResults;
