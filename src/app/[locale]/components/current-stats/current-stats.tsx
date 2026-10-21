'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useFormContext, useWatch } from 'react-hook-form';

import { cn } from '@/lib/utils';

import type { ProjectionFormValues } from '../projection-form/schema';
import { useProjection } from '../projection-form/use-projection';

const FORMULA_KEYS = {
  'harris-benedict': 'harrisBenedict',
  'katch-mcardle': 'katchMcArdle',
  'mifflin-st-jeor': 'mifflinStJeor',
} as const;

const CurrentStats = () => {
  const t = useTranslations();
  const format = useFormatter();
  const { control } = useFormContext<ProjectionFormValues>();
  const formula = useWatch({ control, name: 'formula' });
  const { bmr, bodyFatIsEstimated, bodyFatPct, fatMassKg, leanMassKg, tdee } = useProjection();

  const oneDecimal = (value: number) =>
    format.number(value, { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const calories = (value: number | null) =>
    value === null ? '—' : format.number(Math.round(value));
  const approx = bodyFatIsEstimated ? '≈ ' : '';

  const stats = [
    { label: t('currentStats.tdee'), sub: t('units.kcalPerDay'), value: calories(tdee) },
    { label: t('currentStats.bmr'), sub: t('units.kcalPerDay'), value: calories(bmr) },
    {
      label: t('currentStats.bodyFat'),
      sub: bodyFatIsEstimated
        ? t('currentStats.bodyFatEstimated')
        : t('currentStats.bodyFatMeasured'),
      value: bodyFatPct === null ? '—' : `${approx}${oneDecimal(bodyFatPct)}%`,
    },
    {
      label: t('currentStats.lbm'),
      sub:
        fatMassKg === null ? '—' : t('currentStats.fatMassSub', { value: oneDecimal(fatMassKg) }),
      value: leanMassKg === null ? '—' : `${approx}${oneDecimal(leanMassKg)} ${t('units.kg')}`,
    },
  ];

  return (
    <section
      aria-labelledby="stats-title"
      className="flex flex-col gap-3.5 rounded-xl border bg-card p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold text-[17px]" id="stats-title">
          {t('currentStats.title')}
        </h2>
        <span className="text-[13px] text-muted-foreground">
          {t('currentStats.formulaLine', { formula: t(`formula.${FORMULA_KEYS[formula]}`) })}
        </span>
      </div>

      {tdee === null && (
        <p className="rounded-lg bg-warn-soft px-4 py-3.5 font-medium text-sm text-warn">
          {t('currentStats.missingData')}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {stats.map((stat, index) => {
          const isPrimary = index === 0;
          return (
            <div
              className={cn(
                'flex flex-col gap-1 rounded-lg px-3.5 py-3',
                isPrimary ? 'bg-primary text-primary-foreground' : 'bg-secondary',
              )}
              key={stat.label}
            >
              <span className={cn('font-semibold text-xs', !isPrimary && 'text-muted-foreground')}>
                {stat.label}
              </span>
              <span className="font-bold text-[22px] tabular-nums tracking-[-0.01em]">
                {stat.value}
              </span>
              <span className={cn('text-xs', isPrimary ? 'font-medium' : 'text-muted-foreground')}>
                {stat.sub}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CurrentStats;
