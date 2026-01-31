'use client';

import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { ProjectionFormValues } from '../projection-form/projection-form';

type MessageKey = Parameters<ReturnType<typeof useTranslations>>[0];

const GoalSetting = () => {
  const t = useTranslations('goal');
  const { control, watch } = useFormContext<ProjectionFormValues>();
  const units = watch('units');

  const weightLabel = units === 'metric' ? t('goalWeight.title') : t('goalWeight.titleImperial');

  return (
    <section className="rounded-lg bg-background p-6 shadow-xs ring-1 ring-black/5 sm:p-8">
      <div className="mb-6 space-y-1">
        <h2 className="font-semibold text-2xl text-foreground">{t('title')}</h2>
      </div>

      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="goalWeight"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{weightLabel}</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className="h-12"
                data-testid="goal-weight"
                id={field.name}
                inputMode="numeric"
                onChange={(event) => {
                  const numericValue = event.target.value.trim();
                  field.onChange(numericValue === '' ? '' : numericValue);
                }}
                placeholder={t('goalWeight.placeholder')}
                type="number"
              />
              {fieldState.invalid && (
                <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                  {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                </FieldError>
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Controller
            control={control}
            name="daysUntilGoal"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('daysUntilGoal.title')}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="days-until-goal"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder={t('daysUntilGoal.placeholder')}
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                    {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="goalDate"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('goalDate.title')}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="goal-date"
                  id={field.name}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  type="date"
                />
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                    {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                  </FieldError>
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </section>
  );
};

export default GoalSetting;
