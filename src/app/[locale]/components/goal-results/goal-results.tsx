'use client';

import { useTranslations } from 'next-intl';

import type { GoalStatus } from '@/lib/calculations';
import { cn } from '@/lib/utils';

import { useNumberFormat } from '../projection-form/use-number-format';
import { type GoalProjection, useProjection } from '../projection-form/use-projection';
import { StatTile } from '../stat-tile/stat-tile';
import { WeightTrajectory } from './weight-trajectory';

const DASH = '—';
const ICON_CHECK = 'M8 12.5l2.8 2.8L16.5 9.5';
const ICON_ALERT = 'M12 7.5v5.5M12 16.5v.01';
const OK_STATUSES: ReadonlySet<GoalStatus> = new Set(['maintain', 'ok']);

const StatusNote = ({ isOk, text }: { isOk: boolean; text: string }) => (
  <div
    className={cn(
      'flex items-start gap-2.5 rounded-lg px-3.5 py-3',
      isOk ? 'bg-ok-soft text-ok' : 'bg-warn-soft text-warn',
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
      <path d={isOk ? ICON_CHECK : ICON_ALERT} />
    </svg>
    <span className="font-medium text-sm leading-[1.45]">{text}</span>
  </div>
);

const GoalResults = () => {
  const t = useTranslations('goalResults');
  const tUnits = useTranslations('units');
  const n = useNumberFormat();
  const { goal } = useProjection();
  const kg = tUnits('kg');

  const maintenanceLine = (projection: GoalProjection) => {
    const diff = Math.round(projection.caloriesVsTdee / 10) * 10;
    const value = n.kcal(Math.abs(diff));
    if (diff === 0) {
      return t('atMaintenance');
    }
    return diff < 0 ? t('belowMaintenance', { value }) : t('aboveMaintenance', { value });
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-3.5 rounded-[14px] bg-secondary p-4">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1.5">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-muted-foreground text-xs">
              {t('dailyCalories')}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-4xl text-accent-foreground tabular-nums leading-[1.05] tracking-[-0.02em]">
                {goal ? n.kcalRounded(goal.dailyCalories) : DASH}
              </span>
              <span className="font-semibold text-muted-foreground text-sm">
                {tUnits('kcalPerDay')}
              </span>
            </div>
          </div>
          <span className="pb-1 font-medium text-[13px] text-muted-foreground">
            {goal ? maintenanceLine(goal) : ''}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <StatTile
            className="bg-card"
            label={t('estimatedBodyFat')}
            size="md"
            sub={goal ? `${n.signed(goal.bodyFatChangePct)} ${t('percentPoints')}` : ''}
            value={goal ? n.approx(`${n.fixed(goal.bodyFatPct)}%`, goal.bodyFatIsEstimated) : DASH}
          />
          <StatTile
            className="bg-card"
            label={t('leanMassAtGoal')}
            size="md"
            sub={goal ? `${n.signed(goal.leanMassChangeKg)} ${kg}` : ''}
            value={
              goal ? n.approx(`${n.fixed(goal.leanMassKg)} ${kg}`, goal.bodyFatIsEstimated) : DASH
            }
          />
          <StatTile
            className="bg-card"
            label={t('pace')}
            size="md"
            sub={goal ? t('ofBodyWeight', { value: n.fixed(goal.weeklyChangePct, 2) }) : ''}
            value={goal ? `${n.signed(goal.weeklyChangeKg, 2)} ${t('perWeek')}` : DASH}
          />
        </div>
      </div>

      {goal ? (
        <StatusNote
          isOk={OK_STATUSES.has(goal.status)}
          text={t(`status.${goal.status}`, { bmr: n.kcal(goal.bmr) })}
        />
      ) : (
        <StatusNote isOk={false} text={t('status.missingGoal')} />
      )}

      {goal && (
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-[13px] text-muted-foreground">{t('trajectory')}</span>
          <WeightTrajectory
            days={goal.days}
            goalKg={goal.goalWeightKg}
            startKg={goal.currentWeightKg}
            todayLabel={t('today')}
            unit={kg}
          />
        </div>
      )}

      <p className="text-muted-foreground text-xs leading-normal">{t('note')}</p>
    </div>
  );
};

export default GoalResults;
