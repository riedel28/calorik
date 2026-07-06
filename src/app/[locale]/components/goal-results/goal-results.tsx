'use client';

import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useProjection } from '../projection-form/use-projection';

const GoalResults = () => {
  const t = useTranslations('goalResults');
  const tRoot = useTranslations();
  const {
    bmr,
    bodyFatIsEstimated,
    dailyCalories,
    dailyCaloriesBelowBmr,
    goalBodyFatPct,
    goalLeanMassKg,
  } = useProjection();

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
      caption: bodyFatIsEstimated && goalLeanMassKg !== null ? tRoot('estimated') : null,
      label: t('leanMassAtGoal'),
      unit: 'kg',
      value:
        goalLeanMassKg === null
          ? '—'
          : `${bodyFatIsEstimated ? '~' : ''}${goalLeanMassKg.toFixed(1)}`,
    },
    {
      caption: null,
      label: t('dailyCalories'),
      unit: 'kcal/day',
      value: dailyCalories === null ? '—' : String(Math.round(dailyCalories)),
    },
  ];

  return (
    <Card className="shadow-none">
      <CardHeader className="px-5 pt-5 pb-3 sm:px-6">
        <CardTitle className="font-display text-lg tracking-tight">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
          {results.map((result) => (
            <div key={result.label}>
              <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
                {result.label}
              </p>
              <p className="mt-1 font-display font-semibold text-2xl text-foreground tabular-nums tracking-tight">
                {result.value}
                <span className="ml-1 font-normal font-sans text-muted-foreground text-sm">
                  {result.unit}
                  {result.caption && ` (${result.caption})`}
                </span>
              </p>
            </div>
          ))}
        </div>
        {dailyCaloriesBelowBmr && bmr !== null && (
          <p className="mt-5 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-amber-800 text-sm dark:text-amber-200">
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {t('belowBmrWarning', { bmr: Math.round(bmr) })}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalResults;
