'use client';

import { addDays, differenceInCalendarDays, parseISO, startOfToday } from 'date-fns';
import { useFormatter, useTranslations } from 'next-intl';
import { useFormContext, useWatch } from 'react-hook-form';

import { cn } from '@/lib/utils';

import type { ProjectionFormValues } from '../projection-form/schema';
import { useProjection } from '../projection-form/use-projection';

// Weekly pace limits, as % of current body weight
const MAX_SAFE_LOSS_PCT = 1;
const MAX_SAFE_GAIN_PCT = 0.5;
const MAINTAIN_EPSILON_KG = 0.05;

const ICON_CHECK = 'M8 12.5l2.8 2.8L16.5 9.5';
const ICON_ALERT = 'M12 7.5v5.5M12 16.5v.01';

// Chart geometry in SVG viewBox units (0 0 600 160)
const CHART_W = 600;
const CHART_H = 160;
const CHART_TOP = 20;
const CHART_SPAN = 120;

type Format = ReturnType<typeof useFormatter>;

const signed = (format: Format, value: number, digits: number) => {
  const abs = format.number(Math.abs(value), {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
  if (value > 0) {
    return `+${abs}`;
  }
  if (value < 0) {
    return `−${abs}`;
  }
  return `±${abs}`;
};

interface TrajectoryProps {
  endLabel: string;
  goalKg: number;
  midLabel: string;
  startKg: number;
  todayLabel: string;
  unit: string;
}

const WeightTrajectory = ({
  endLabel,
  goalKg,
  midLabel,
  startKg,
  todayLabel,
  unit,
}: TrajectoryProps) => {
  const format = useFormatter();
  const lo = Math.min(startKg, goalKg);
  const hi = Math.max(startKg, goalKg);
  const span = Math.max(hi - lo, 1);
  const yOf = (kg: number) =>
    hi - lo < MAINTAIN_EPSILON_KG ? CHART_H / 2 : CHART_TOP + ((hi - kg) / span) * CHART_SPAN;
  const y0 = yOf(startKg);
  const y1 = yOf(goalKg);
  const pct = (y: number) => (y / CHART_H) * 100;
  // Put the value label above the point in the lower half, below it in the upper half
  const labelTop = (y: number) => (pct(y) > 55 ? pct(y) - 20 : pct(y) + 6);
  const kg = (value: number) =>
    `${format.number(value, { maximumFractionDigits: 1, minimumFractionDigits: 1 })} ${unit}`;

  return (
    <>
      <div className="relative mx-3.5 h-[130px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="none"
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        >
          {[20, 80, 140].map((y) => (
            <line
              className="stroke-border"
              key={y}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="0"
              x2={CHART_W}
              y1={y}
              y2={y}
            />
          ))}
          <polygon
            className="fill-primary/15"
            points={`0,${CHART_H} 0,${y0} ${CHART_W},${y1} ${CHART_W},${CHART_H}`}
          />
          <polyline
            className="stroke-primary"
            fill="none"
            points={`0,${y0} ${CHART_W},${y1}`}
            strokeLinecap="round"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div
          className="absolute left-0 -mt-[7px] -ml-[7px] size-3.5 rounded-full border-[3px] border-primary bg-card"
          style={{ top: `${pct(y0)}%` }}
        />
        <div
          className="absolute right-0 -mt-[7px] -mr-[7px] size-3.5 rounded-full bg-primary"
          style={{ top: `${pct(y1)}%` }}
        />
        <span
          className="absolute left-3 font-bold text-[13px] tabular-nums"
          style={{ top: `${labelTop(y0)}%` }}
        >
          {kg(startKg)}
        </span>
        <span
          className="absolute right-3 font-bold text-[13px] text-accent-foreground tabular-nums"
          style={{ top: `${labelTop(y1)}%` }}
        >
          {kg(goalKg)}
        </span>
      </div>
      <div className="flex justify-between gap-3 text-muted-foreground text-xs">
        <span>{todayLabel}</span>
        <span>{midLabel}</span>
        <span>{endLabel}</span>
      </div>
    </>
  );
};

const GoalResults = () => {
  const t = useTranslations('goalResults');
  const tUnits = useTranslations('units');
  const format = useFormatter();
  const { control } = useFormContext<ProjectionFormValues>();
  const goalDate = useWatch({ control, name: 'goalDate' });
  const {
    bmr,
    bodyFatIsEstimated,
    bodyFatPct,
    dailyCalories,
    dailyCaloriesBelowBmr,
    goalBodyFatPct,
    goalLeanMassKg,
    goalWeightKg,
    leanMassKg,
    tdee,
    weeklyChangeKg,
    weightKg,
  } = useProjection();

  const oneDecimal = (value: number) =>
    format.number(value, { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const approx = bodyFatIsEstimated ? '≈ ' : '';
  const roundTo10 = (value: number) => Math.round(value / 10) * 10;

  const hasGoal =
    dailyCalories !== null && tdee !== null && weightKg !== null && goalWeightKg !== null;

  let diffLine = '';
  if (hasGoal) {
    const diff = roundTo10(dailyCalories - tdee);
    const value = format.number(Math.abs(diff));
    if (diff === 0) {
      diffLine = t('atMaintenance');
    } else {
      diffLine = diff < 0 ? t('belowMaintenance', { value }) : t('aboveMaintenance', { value });
    }
  }

  const paceKg = weeklyChangeKg ?? 0;
  const pacePct = weightKg ? (Math.abs(paceKg) / weightKg) * 100 : 0;

  const tiles = [
    {
      label: t('estimatedBodyFat'),
      sub:
        goalBodyFatPct !== null && bodyFatPct !== null
          ? `${signed(format, goalBodyFatPct - bodyFatPct, 1)} ${t('percentPoints')}`
          : '',
      value: goalBodyFatPct === null ? '—' : `${approx}${oneDecimal(goalBodyFatPct)}%`,
    },
    {
      label: t('leanMassAtGoal'),
      sub:
        goalLeanMassKg !== null && leanMassKg !== null
          ? `${signed(format, goalLeanMassKg - leanMassKg, 1)} ${tUnits('kg')}`
          : '',
      value:
        goalLeanMassKg === null ? '—' : `${approx}${oneDecimal(goalLeanMassKg)} ${tUnits('kg')}`,
    },
    {
      label: t('pace'),
      sub: hasGoal
        ? t('ofBodyWeight', {
            value: format.number(pacePct, { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
          })
        : '',
      value: hasGoal ? `${signed(format, paceKg, 2)} ${t('perWeek')}` : '—',
    },
  ];

  let status = { icon: ICON_ALERT, isOk: false, text: t('statusMissingGoal') };
  if (hasGoal) {
    const deltaKg = goalWeightKg - weightKg;
    if (Math.abs(deltaKg) < MAINTAIN_EPSILON_KG) {
      status = { icon: ICON_CHECK, isOk: true, text: t('statusMaintain') };
    } else if (dailyCaloriesBelowBmr && bmr !== null) {
      status = { ...status, text: t('belowBmrWarning', { bmr: Math.round(bmr) }) };
    } else if (deltaKg < 0 && pacePct > MAX_SAFE_LOSS_PCT) {
      status = { ...status, text: t('statusTooFastLoss') };
    } else if (deltaKg > 0 && pacePct > MAX_SAFE_GAIN_PCT) {
      status = { ...status, text: t('statusTooFastGain') };
    } else {
      status = { icon: ICON_CHECK, isOk: true, text: t('statusOk') };
    }
  }

  const dateLabel = (date: Date) =>
    format.dateTime(date, { day: 'numeric', month: 'short', year: 'numeric' });
  const today = startOfToday();
  const endDate = goalDate ? parseISO(goalDate) : null;
  const totalDays = endDate ? differenceInCalendarDays(endDate, today) : 0;

  return (
    <>
      <div className="flex flex-col gap-3.5 rounded-[14px] bg-secondary p-4">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1.5">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-muted-foreground text-xs">
              {t('dailyCalories')}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-4xl text-accent-foreground tabular-nums leading-[1.05] tracking-[-0.02em]">
                {hasGoal ? format.number(roundTo10(dailyCalories)) : '—'}
              </span>
              <span className="font-semibold text-muted-foreground text-sm">
                {tUnits('kcalPerDay')}
              </span>
            </div>
          </div>
          <span className="pb-1 font-medium text-[13px] text-muted-foreground">{diffLine}</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {tiles.map((tile) => (
            <div className="flex flex-col gap-1 rounded-lg bg-card px-3.5 py-3" key={tile.label}>
              <span className="font-semibold text-muted-foreground text-xs">{tile.label}</span>
              <span className="font-bold text-lg tabular-nums">{tile.value}</span>
              <span className="text-muted-foreground text-xs">{tile.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'flex items-start gap-2.5 rounded-lg px-3.5 py-3',
          status.isOk ? 'bg-ok-soft text-ok' : 'bg-warn-soft text-warn',
        )}
        role="status"
      >
        <svg
          aria-hidden="true"
          className="mt-px shrink-0"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="12" cy="12" r="9" />
          <path d={status.icon} />
        </svg>
        <span className="font-medium text-sm leading-[1.45]">{status.text}</span>
      </div>

      {hasGoal && endDate && (
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-[13px] text-muted-foreground">{t('trajectory')}</span>
          <WeightTrajectory
            endLabel={dateLabel(endDate)}
            goalKg={goalWeightKg}
            midLabel={dateLabel(addDays(today, Math.round(totalDays / 2)))}
            startKg={weightKg}
            todayLabel={t('today')}
            unit={tUnits('kg')}
          />
        </div>
      )}

      <p className="text-muted-foreground text-xs leading-normal">{t('note')}</p>
    </>
  );
};

export default GoalResults;
