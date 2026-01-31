'use client';

import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { ProjectionFormValues } from '../projection-form/projection-form';

type MessageKey = Parameters<ReturnType<typeof useTranslations>>[0];

const UserInputs = () => {
  const t = useTranslations();
  const pageT = useTranslations('page');
  const { control, watch } = useFormContext<ProjectionFormValues>();
  const activityLevel = watch('activityLevel');
  const units = watch('units');

  const activityLevelOptions = [
    {
      value: 'none',
      label: t('activity.none'),
      description: t('activity.noneDescription'),
    },
    {
      value: 'low',
      label: t('activity.low'),
      description: t('activity.lowDescription'),
    },
    {
      value: 'moderate',
      label: t('activity.moderate'),
      description: t('activity.moderateDescription'),
    },
    {
      value: 'active',
      label: t('activity.active'),
      description: t('activity.activeDescription'),
    },
    {
      value: 'veryActive',
      label: t('activity.veryActive'),
      description: t('activity.veryActiveDescription'),
    },
    {
      value: 'custom',
      label: t('activity.custom'),
      description: t('activity.customDescription'),
    },
  ];

  const formulaOptions = [
    { value: 'katch-mcardle', label: t('formula.katchMcArdle') },
    { value: 'mifflin-st-jeor', label: t('formula.mifflinStJeor') },
  ];

  const weightLabel =
    units === 'metric' ? t('yourData.weight.title') : t('yourData.weight.titleImperial');
  const heightLabel =
    units === 'metric' ? t('yourData.height.title') : t('yourData.height.titleImperial');

  return (
    <section className="rounded-lg bg-background p-6 shadow-xs ring-1 ring-black/5 sm:p-8">
      <div className="mb-6 space-y-1">
        <h2 className="font-semibold text-2xl text-foreground">{pageT('formSectionTitle')}</h2>
        <p className="text-muted-foreground text-sm">{pageT('formSectionSubtitle')}</p>
      </div>

      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend variant="label">{t('yourData.gender.title')}</FieldLegend>
              <RadioGroup
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                data-slot="radio-group"
                onValueChange={field.onChange}
                value={field.value}
              >
                <FieldLabel htmlFor={`${field.name}-male`}>
                  <Field
                    className="min-h-12"
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                  >
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="font-medium text-sm">{t('yourData.gender.male')}</span>
                    </div>
                    <RadioGroupItem
                      aria-invalid={fieldState.invalid}
                      data-testid="gender-male"
                      id={`${field.name}-male`}
                      value="male"
                    />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor={`${field.name}-female`}>
                  <Field
                    className="min-h-12"
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                  >
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="font-medium text-sm">{t('yourData.gender.female')}</span>
                    </div>
                    <RadioGroupItem
                      aria-invalid={fieldState.invalid}
                      id={`${field.name}-female`}
                      value="female"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              {fieldState.invalid && (
                <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                  {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                </FieldError>
              )}
            </FieldSet>
          )}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Controller
            control={control}
            name="height"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{heightLabel}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="height"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder={t('yourData.height.placeholder')}
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
            name="weight"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{weightLabel}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="weight"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder={t('yourData.weight.placeholder')}
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
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Controller
            control={control}
            name="age"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('yourData.age.title')}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="age"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder={t('yourData.age.placeholder')}
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
            name="bodyFat"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('yourData.bodyFat.title')}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="body-fat"
                  id={field.name}
                  inputMode="numeric"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder={t('yourData.bodyFat.placeholder')}
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
        </div>

        <Controller
          control={control}
          name="activityLevel"
          render={({ field, fieldState }) => {
            const selectedOption = activityLevelOptions.find((opt) => opt.value === field.value);
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('activity.title')}</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className="h-12"
                    data-testid="activity-level-select"
                    id={field.name}
                  >
                    <SelectValue>
                      {selectedOption ? selectedOption.label : t('activity.placeholder')}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner>
                      <SelectPopup>
                        <SelectList>
                          {activityLevelOptions.map((item) => (
                            <SelectItem
                              data-testid={`activity-level-${item.value}`}
                              key={item.value}
                              value={item.value}
                            >
                              <div className="flex flex-col items-start py-0.5">
                                <span>{item.label}</span>
                                {item.description && (
                                  <span className="mt-0.5 text-muted-foreground text-xs">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectList>
                      </SelectPopup>
                    </SelectPositioner>
                  </SelectPortal>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                    {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                  </FieldError>
                )}
              </Field>
            );
          }}
        />

        {activityLevel === 'custom' && (
          <Controller
            control={control}
            name="customMultiplier"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t('activity.customMultiplier.title')}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                  data-testid="custom-multiplier"
                  id={field.name}
                  inputMode="decimal"
                  onChange={(event) => {
                    const numericValue = event.target.value.trim();
                    field.onChange(numericValue === '' ? '' : numericValue);
                  }}
                  placeholder={t('activity.customMultiplier.placeholder')}
                  step="0.01"
                  type="number"
                />
                <FieldDescription>{t('activity.customMultiplier.description')}</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                    {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                  </FieldError>
                )}
              </Field>
            )}
          />
        )}

        <Controller
          control={control}
          name="formula"
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend variant="label">{t('formula.title')}</FieldLegend>
              <RadioGroup
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
                data-slot="radio-group"
                onValueChange={field.onChange}
                value={field.value}
              >
                {formulaOptions.map((item) => (
                  <FieldLabel htmlFor={`${field.name}-${item.value}`} key={item.value}>
                    <Field
                      className="min-h-12"
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                    >
                      <div className="flex flex-1 flex-col gap-0.5">
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <RadioGroupItem
                        aria-invalid={fieldState.invalid}
                        id={`${field.name}-${item.value}`}
                        value={item.value}
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              {fieldState.invalid && (
                <FieldError errors={fieldState.error ? [fieldState.error] : []}>
                  {fieldState.error?.message && t(fieldState.error.message as MessageKey)}
                </FieldError>
              )}
            </FieldSet>
          )}
        />
      </FieldGroup>
    </section>
  );
};

export default UserInputs;
