'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserData } from '@/context/user-data-context';

const personalDataFormSchema = z.object({
  gender: z.enum(['male', 'female'], {
    message: 'yourData.gender.error',
  }),
  age: z.number().min(0, 'yourData.age.error').max(120, 'yourData.age.error'),
  height: z.number().min(0, 'yourData.height.error').max(250, 'yourData.height.error'),
  weight: z.number().min(0, 'yourData.weight.error').max(300, 'yourData.weight.error'),
  activityLevel: z.enum(['no-exercise', 'light', 'moderate', 'heavy', 'very-heavy'], {
    message: 'activity.error',
  }),
  goal: z.enum(['cut', 'maintain', 'gain'], {
    message: 'goal.error',
  }),
  formula: z.enum(['harris-benedict', 'mifflin-st-jeor'], {
    message: 'formula.error',
  }),
});

export type PersonalDataFormValues = z.infer<typeof personalDataFormSchema>;

const STORAGE_KEY = 'calorikData';

const PersonalDataForm = () => {
  const t = useTranslations();
  const pageT = useTranslations('page');
  const { setUserData } = useUserData();

  const defaultValues: PersonalDataFormValues = {
    gender: 'male',
    age: 30,
    height: 180,
    weight: 80,
    activityLevel: 'no-exercise',
    goal: 'cut',
    formula: 'harris-benedict',
  };

  const activityLevelOptions = [
    {
      value: 'no-exercise',
      label: t('activity.noExercise'),
      description: t('activity.noExerciseDescription'),
    },
    {
      value: 'light',
      label: t('activity.lightExercise'),
      description: t('activity.lightExerciseDescription'),
    },
    {
      value: 'moderate',
      label: t('activity.moderateExercise'),
      description: t('activity.moderateExerciseDescription'),
    },
    {
      value: 'heavy',
      label: t('activity.heavyExercise'),
      description: t('activity.heavyExerciseDescription'),
    },
    {
      value: 'very-heavy',
      label: t('activity.veryHeavyExercise'),
      description: t('activity.veryHeavyExerciseDescription'),
    },
  ];

  const goalOptions = [
    {
      value: 'cut',
      label: t('goal.cut'),
      description: t('goal.cutDescription'),
    },
    {
      value: 'maintain',
      label: t('goal.maintain'),
      description: t('goal.maintainDescription'),
    },
    {
      value: 'gain',
      label: t('goal.gain'),
      description: t('goal.gainDescription'),
    },
  ];

  const formulaOptions = [
    { value: 'harris-benedict', label: 'Harris-Benedict' },
    { value: 'mifflin-st-jeor', label: 'Mifflin St. Jeor' },
  ];

  const form = useForm<PersonalDataFormValues>({
    resolver: zodResolver(personalDataFormSchema),
    defaultValues,
  });

  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (hasLoadedData.current) return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as PersonalDataFormValues;
        form.reset(saved);
      }
    } catch {
      form.reset(defaultValues);
    }

    hasLoadedData.current = true;
  }, [form]);

  function onSubmit(data: PersonalDataFormValues) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore persistence errors
    }

    setUserData(data);
  }

  type MessageKey = Parameters<typeof t>[0];

  return (
    <section className="rounded-lg bg-background p-6 shadow-xs ring-1 ring-black/5 backdrop-blur-md sm:p-8">
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-foreground">{pageT('formSectionTitle')}</h2>
        <p className="text-sm text-muted-foreground">{pageT('formSectionSubtitle')}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form" className="space-y-6">
          <FieldGroup className="gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{t('yourData.age.title')}</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      inputMode="numeric"
                      data-testid="age"
                      className="h-12"
                      aria-invalid={fieldState.invalid}
                      value={Number.isFinite(field.value) ? field.value : ''}
                      onChange={(event) => {
                        const numericValue = event.target.value.trim();
                        field.onChange(numericValue === '' ? undefined : Number(numericValue));
                      }}
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
                name="weight"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{t('yourData.weight.title')}</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      inputMode="numeric"
                      data-testid="weight"
                      className="h-12"
                      aria-invalid={fieldState.invalid}
                      value={Number.isFinite(field.value) ? field.value : ''}
                      onChange={(event) => {
                        const numericValue = event.target.value.trim();
                        field.onChange(numericValue === '' ? undefined : Number(numericValue));
                      }}
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
                name="height"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{t('yourData.height.title')}</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      inputMode="numeric"
                      data-testid="height"
                      className="h-12"
                      aria-invalid={fieldState.invalid}
                      value={Number.isFinite(field.value) ? field.value : ''}
                      onChange={(event) => {
                        const numericValue = event.target.value.trim();
                        field.onChange(numericValue === '' ? undefined : Number(numericValue));
                      }}
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
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">{t('yourData.gender.title')}</FieldLegend>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    data-slot="radio-group"
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <FieldLabel htmlFor={`${field.name}-male`}>
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation="horizontal"
                        className="min-h-12"
                      >
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">{t('yourData.gender.male')}</span>
                        </div>
                        <RadioGroupItem
                          value="male"
                          id={`${field.name}-male`}
                          data-testid="gender-male"
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor={`${field.name}-female`}>
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation="horizontal"
                        className="min-h-12"
                      >
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">{t('yourData.gender.female')}</span>
                        </div>
                        <RadioGroupItem
                          value="female"
                          id={`${field.name}-female`}
                          aria-invalid={fieldState.invalid}
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

            <Controller
              name="activityLevel"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">{t('activity.title')}</FieldLegend>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    data-slot="radio-group"
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {activityLevelOptions.map((item) => (
                      <FieldLabel key={item.value} htmlFor={`${field.name}-${item.value}`}>
                        <Field data-invalid={fieldState.invalid} orientation="horizontal">
                          <div className="flex flex-1 flex-col gap-0.5">
                            <span className="text-sm font-medium">{item.label}</span>
                            {item.description && (
                              <FieldDescription className="text-xs text-muted-foreground">
                                {item.description}
                              </FieldDescription>
                            )}
                          </div>
                          <RadioGroupItem
                            value={item.value}
                            id={`${field.name}-${item.value}`}
                            data-testid={`activity-level-${item.value}`}
                            aria-invalid={fieldState.invalid}
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

            <Controller
              name="goal"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">{t('goal.title')}</FieldLegend>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                    data-slot="radio-group"
                  >
                    {goalOptions.map((item) => (
                      <FieldLabel key={item.value} htmlFor={`${field.name}-${item.value}`}>
                        <Field data-invalid={fieldState.invalid} orientation="horizontal">
                          <div className="flex flex-1 flex-col gap-0.5">
                            <span className="text-sm font-medium">{item.label}</span>
                            {item.description && (
                              <FieldDescription className="text-xs text-muted-foreground">
                                {item.description}
                              </FieldDescription>
                            )}
                          </div>
                          <RadioGroupItem
                            value={item.value}
                            id={`${field.name}-${item.value}`}
                            aria-invalid={fieldState.invalid}
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

            <Controller
              name="formula"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">{t('formula.title')}</FieldLegend>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    data-slot="radio-group"
                  >
                    {formulaOptions.map((item) => (
                      <FieldLabel key={item.value} htmlFor={`${field.name}-${item.value}`}>
                        <Field
                          data-invalid={fieldState.invalid}
                          orientation="horizontal"
                          className="min-h-12"
                        >
                          <div className="flex flex-1 flex-col gap-0.5">
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          <RadioGroupItem
                            value={item.value}
                            id={`${field.name}-${item.value}`}
                            aria-invalid={fieldState.invalid}
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="submit"
              size="lg"
              data-testid="submit-button"
              className="w-full sm:w-auto h-12 text-lg"
            >
              {t('calculate')}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PersonalDataForm;
