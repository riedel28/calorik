'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

import { useUserData } from '@/context/user-data-context';
import { calculateCalories } from '@/helpers';

const MACRO_BREAKDOWN = [
  { key: 'protein', percentage: 30 },
  { key: 'carbs', percentage: 35 },
  { key: 'fats', percentage: 35 },
] as const;

type GoalKey = 'cut' | 'maintain' | 'gain';

const sliderPositions: Record<GoalKey, number> = {
  cut: 12,
  maintain: 50,
  gain: 88,
};

const Result = () => {
  const pageT = useTranslations('page');
  const { userData } = useUserData();
  const resultCalories = calculateCalories(userData);

  const animation = useSpring({
    from: { value: 0 },
    to: { value: Number.isNaN(resultCalories) ? 0 : resultCalories },
  });

  useEffect(() => {
    const title = 'Calorik';

    if (resultCalories) {
      document.title = `${title} | ${resultCalories}`;
    } else {
      document.title = title;
    }
  }, [resultCalories]);

  useEffect(() => {
    if (!resultCalories) {
      return;
    }

    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [resultCalories]);

  const hasResult = Boolean(resultCalories && !Number.isNaN(resultCalories));
  const goalKey: GoalKey =
    userData?.goal && ['cut', 'maintain', 'gain'].includes(userData.goal)
      ? (userData.goal as GoalKey)
      : 'maintain';
  const sliderPercentage = sliderPositions[goalKey];

  const macros = hasResult
    ? MACRO_BREAKDOWN.map(({ key, percentage }) => ({
        key,
        percentage,
        calories: Math.round((resultCalories * percentage) / 100),
      }))
    : [];

  return (
    <section className="rounded-lg bg-background p-6 shadow-xs ring-1 ring-black/5 backdrop-blur-md sm:p-8">
      <div className="mb-6 space-y-1">
        <h2 className="font-semibold text-2xl text-foreground">{pageT('resultsSectionTitle')}</h2>
      </div>

      {hasResult ? (
        <div className="space-y-10">
          <div className="space-y-2 text-center">
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
              {pageT('dailyCalorieTarget')}
            </p>
            <animated.p className="font-bold text-5xl text-primary sm:text-6xl">
              {animation.value.to((value) => Math.floor(value))}
            </animated.p>
            <p className="text-muted-foreground text-sm">{pageT('caloriesPerDay')}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
              {pageT('calorieDistribution')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {macros.map((macro) => (
                <div
                  className="rounded-2xl bg-background/80 p-4 text-center shadow-inner ring-1 ring-black/5"
                  key={macro.key}
                >
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    {pageT(`macros.${macro.key}`)} ({macro.percentage}%)
                  </p>
                  <p className="mt-2 font-semibold text-2xl text-foreground">{macro.calories}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
                {pageT('weeklyWeightChange')}
              </h3>
              <span className="font-medium text-primary text-sm">
                {pageT(`weeklyChangeActiveLabel.${goalKey}`)}
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${sliderPercentage}%` }}
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow"
                style={{ left: `calc(${sliderPercentage}% - 0.375rem)` }}
              />
            </div>
            <div className="flex justify-between font-medium text-muted-foreground text-xs">
              <span>{pageT('weeklyChangeLabels.cut')}</span>
              <span>{pageT('weeklyChangeLabels.maintain')}</span>
              <span>{pageT('weeklyChangeLabels.gain')}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{pageT('emptyState')}</p>
      )}
    </section>
  );
};

export default Result;
