'use client';

import { addDays, startOfToday } from 'date-fns';
import { useFormatter } from 'next-intl';

import { useNumberFormat } from '../projection-form/use-number-format';

// Geometry in SVG viewBox units (0 0 600 160): the line spans y 20..140.
const CHART_W = 600;
const CHART_H = 160;
const CHART_TOP = 20;
const CHART_SPAN = 120;
const GRID_LINES = [20, 80, 140];
const FLAT_EPSILON_KG = 0.05;
// Value labels sit below a point in the upper half and above it in the lower half.
const LABEL_FLIP_PCT = 55;
const LABEL_ABOVE_PCT = 20;
const LABEL_BELOW_PCT = 6;

interface WeightTrajectoryProps {
  days: number;
  goalKg: number;
  startKg: number;
  todayLabel: string;
  unit: string;
}

export const WeightTrajectory = ({
  days,
  goalKg,
  startKg,
  todayLabel,
  unit,
}: WeightTrajectoryProps) => {
  const format = useFormatter();
  const n = useNumberFormat();

  const lo = Math.min(startKg, goalKg);
  const hi = Math.max(startKg, goalKg);
  const yOf = (kg: number) =>
    hi - lo < FLAT_EPSILON_KG
      ? CHART_H / 2
      : CHART_TOP + ((hi - kg) / Math.max(hi - lo, 1)) * CHART_SPAN;
  const y0 = yOf(startKg);
  const y1 = yOf(goalKg);
  const pct = (y: number) => (y / CHART_H) * 100;
  const labelTop = (y: number) =>
    pct(y) > LABEL_FLIP_PCT ? pct(y) - LABEL_ABOVE_PCT : pct(y) + LABEL_BELOW_PCT;

  const today = startOfToday();
  const dateLabel = (offsetDays: number) =>
    format.dateTime(addDays(today, offsetDays), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <>
      <div className="relative mx-3.5 h-[130px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="none"
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        >
          {GRID_LINES.map((y) => (
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
          {n.fixed(startKg)} {unit}
        </span>
        <span
          className="absolute right-3 font-bold text-[13px] text-accent-foreground tabular-nums"
          style={{ top: `${labelTop(y1)}%` }}
        >
          {n.fixed(goalKg)} {unit}
        </span>
      </div>
      <div className="flex justify-between gap-3 text-muted-foreground text-xs">
        <span>{todayLabel}</span>
        <span>{dateLabel(Math.round(days / 2))}</span>
        <span>{dateLabel(days)}</span>
      </div>
    </>
  );
};
