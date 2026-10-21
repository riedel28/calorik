'use client';

import { useTranslations } from 'next-intl';
import { useFormContext, useWatch } from 'react-hook-form';

import { Panel } from '@/components/ui/panel';

import type { ProjectionFormValues } from '../projection-form/schema';
import { useNumberFormat } from '../projection-form/use-number-format';
import { useProjection } from '../projection-form/use-projection';
import { StatTile } from '../stat-tile/stat-tile';

const DASH = '—';

const CurrentStats = () => {
  const t = useTranslations();
  const n = useNumberFormat();
  const { control } = useFormContext<ProjectionFormValues>();
  const formula = useWatch({ control, name: 'formula' });
  const { bmr, body, tdee } = useProjection();
  const kg = t('units.kg');
  const kcalPerDay = t('units.kcalPerDay');

  return (
    <Panel
      aside={
        <span className="text-[13px] text-muted-foreground">
          {t('currentStats.formulaLine', { formula: t(`formula.options.${formula}.label`) })}
        </span>
      }
      className="gap-3.5"
      title={t('currentStats.title')}
    >
      {tdee === null && (
        <p className="rounded-lg bg-warn-soft px-4 py-3.5 font-medium text-sm text-warn">
          {t('currentStats.missingData')}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <StatTile
          highlighted
          label={t('currentStats.tdee')}
          sub={kcalPerDay}
          value={tdee === null ? DASH : n.kcal(tdee)}
        />
        <StatTile
          label={t('currentStats.bmr')}
          sub={kcalPerDay}
          value={bmr === null ? DASH : n.kcal(bmr)}
        />
        <StatTile
          label={t('currentStats.bodyFat')}
          sub={
            body === null
              ? DASH
              : t(
                  body.isEstimated
                    ? 'currentStats.bodyFatEstimated'
                    : 'currentStats.bodyFatMeasured',
                )
          }
          value={body === null ? DASH : n.approx(`${n.fixed(body.bodyFatPct)}%`, body.isEstimated)}
        />
        <StatTile
          label={t('currentStats.lbm')}
          sub={
            body === null ? DASH : t('currentStats.fatMassSub', { value: n.fixed(body.fatMassKg) })
          }
          value={
            body === null ? DASH : n.approx(`${n.fixed(body.leanMassKg)} ${kg}`, body.isEstimated)
          }
        />
      </div>
    </Panel>
  );
};

export default CurrentStats;
