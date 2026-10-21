'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { FieldLegend, FieldSet } from '@/components/ui/field';
import { OptionDot, OptionRadio, OptionText, SegmentRadio } from '@/components/ui/option-radio';
import { RadioGroup } from '@/components/ui/radio-group';
import { ACTIVITY_MULTIPLIERS } from '@/lib/calculations';

import { FIELD_LABEL_CLASS, NumberField } from '../projection-form/number-field';
import type { ProjectionFormValues } from '../projection-form/schema';

const ACTIVITY_LEVELS = ['none', 'low', 'moderate', 'active', 'veryActive', 'custom'] as const;

const FORMULAS = [
  { key: 'mifflinStJeor', value: 'mifflin-st-jeor' },
  { key: 'harrisBenedict', value: 'harris-benedict' },
  { key: 'katchMcArdle', value: 'katch-mcardle' },
] as const;

const UserInputs = () => {
  const t = useTranslations();
  const format = useFormatter();
  const { control, watch } = useFormContext<ProjectionFormValues>();
  const activityLevel = watch('activityLevel');

  return (
    <section
      aria-labelledby="your-data-title"
      className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px] rounded-xl border bg-card p-5"
    >
      <h2 className="font-semibold text-[17px]" id="your-data-title">
        {t('yourData.title')}
      </h2>

      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <FieldSet className="gap-2">
            <FieldLegend className={FIELD_LABEL_CLASS} variant="label">
              {t('yourData.gender.title')}
            </FieldLegend>
            <RadioGroup
              className="grid grid-cols-2 gap-1.5 rounded-lg bg-secondary p-1"
              onValueChange={field.onChange}
              value={field.value}
            >
              <SegmentRadio value="male">{t('yourData.gender.male')}</SegmentRadio>
              <SegmentRadio value="female">{t('yourData.gender.female')}</SegmentRadio>
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
            <FieldLegend className={FIELD_LABEL_CLASS} variant="label">
              {t('activity.title')}
            </FieldLegend>
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
            <FieldLegend className={FIELD_LABEL_CLASS} variant="label">
              {t('formula.title')}
            </FieldLegend>
            <RadioGroup
              className="flex flex-col gap-1.5"
              onValueChange={field.onChange}
              value={field.value}
            >
              {FORMULAS.map(({ key, value }) => (
                <OptionRadio key={value} value={value}>
                  <OptionDot />
                  <OptionText
                    description={t(`formula.${key}Description`)}
                    label={t(`formula.${key}`)}
                  />
                </OptionRadio>
              ))}
            </RadioGroup>
          </FieldSet>
        )}
      />
    </section>
  );
};

export default UserInputs;
