'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { FieldLegend, FieldSet } from '@/components/ui/field';
import { OptionDot, OptionRadio, OptionText, SegmentRadio } from '@/components/ui/option-radio';
import { Panel } from '@/components/ui/panel';
import { RadioGroup } from '@/components/ui/radio-group';
import { ACTIVITY_LEVELS, ACTIVITY_MULTIPLIERS, BMR_FORMULAS, GENDERS } from '@/lib/calculations';

import { FIELD_LABEL_CLASS, NumberField } from '../projection-form/number-field';
import type { ProjectionFormValues } from '../projection-form/schema';

const UserInputs = () => {
  const t = useTranslations();
  const format = useFormatter();
  const { control } = useFormContext<ProjectionFormValues>();
  const activityLevel = useWatch({ control, name: 'activityLevel' });

  return (
    <Panel className="min-w-0 flex-[1_1_340px]" title={t('yourData.title')}>
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <FieldSet className="gap-2">
            <FieldLegend className={FIELD_LABEL_CLASS}>{t('yourData.gender.title')}</FieldLegend>
            <RadioGroup
              className="grid grid-cols-2 gap-1.5 rounded-lg bg-secondary p-1"
              onValueChange={field.onChange}
              value={field.value}
            >
              {GENDERS.map((gender) => (
                <SegmentRadio key={gender} value={gender}>
                  {t(`yourData.gender.${gender}`)}
                </SegmentRadio>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
      />

      <div className="grid grid-cols-2 gap-3.5">
        <NumberField label={t('yourData.age.label')} name="age" suffix={t('yourData.age.unit')} />
        <NumberField
          label={t('yourData.height.label')}
          name="height"
          suffix={t('yourData.height.unit')}
        />
        <NumberField
          label={t('yourData.weight.label')}
          name="weight"
          step="0.1"
          suffix={t('yourData.weight.unit')}
        />
        <NumberField
          inputClassName="border-dashed border-border-strong"
          label={t('yourData.bodyFat.label')}
          name="bodyFat"
          placeholder={t('yourData.bodyFat.placeholder')}
          step="0.5"
          suffix={t('yourData.bodyFat.unit')}
        />
      </div>

      <Controller
        control={control}
        name="activityLevel"
        render={({ field }) => (
          <FieldSet className="gap-2">
            <FieldLegend className={FIELD_LABEL_CLASS}>{t('activity.title')}</FieldLegend>
            <RadioGroup
              className="flex flex-col gap-1.5"
              onValueChange={field.onChange}
              value={field.value}
            >
              {ACTIVITY_LEVELS.map((level) => (
                <OptionRadio className="justify-between" key={level} value={level}>
                  <OptionText
                    description={t(`activity.${level}Description`)}
                    label={t(`activity.${level}`)}
                  />
                  {level !== 'custom' && (
                    <span className="font-bold text-[13px] text-muted-foreground tabular-nums group-data-checked:text-accent-foreground">
                      ×{format.number(ACTIVITY_MULTIPLIERS[level])}
                    </span>
                  )}
                </OptionRadio>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
      />

      {activityLevel === 'custom' && (
        <NumberField
          label={t('activity.customMultiplier.title')}
          name="customMultiplier"
          placeholder={t('activity.customMultiplier.placeholder')}
          step="0.01"
          suffix="×"
        />
      )}

      <Controller
        control={control}
        name="formula"
        render={({ field }) => (
          <FieldSet className="gap-2">
            <FieldLegend className={FIELD_LABEL_CLASS}>{t('formula.title')}</FieldLegend>
            <RadioGroup
              className="flex flex-col gap-1.5"
              onValueChange={field.onChange}
              value={field.value}
            >
              {BMR_FORMULAS.map((formula) => (
                <OptionRadio key={formula} value={formula}>
                  <OptionDot />
                  <OptionText
                    description={t(`formula.options.${formula}.description`)}
                    label={t(`formula.options.${formula}.label`)}
                  />
                </OptionRadio>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
      />
    </Panel>
  );
};

export default UserInputs;
