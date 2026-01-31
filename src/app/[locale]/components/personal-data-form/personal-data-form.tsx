'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Form } from '@/components/ui/form';
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
    if (hasLoadedData.current) {
      return;
    }

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
        <h2 className="font-semibold text-2xl text-foreground">{pageT('formSectionTitle')}</h2>
        <p className="text-muted-foreground text-sm">{pageT('formSectionSubtitle')}</p>
      </div>
      <Form {...form}>
        <form className="space-y-6" data-testid="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Controller
                control={form.control}
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
                        field.onChange(numericValue === '' ? undefined : Number(numericValue));
                      }}
                      type="number"
                      value={Number.isFinite(field.value) ? field.value : ''}
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
                control={form.control}
                name="weight"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{t('yourData.weight.title')}</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="h-12"
                      data-testid="weight"
                      id={field.name}
                      inputMode="numeric"
                      onChange={(event) => {
                        const numericValue = event.target.value.trim();
                        field.onChange(numericValue === '' ? undefined : Number(numericValue));
                      }}
                      type="number"
                      value={Number.isFinite(field.value) ? field.value : ''}
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
                control={form.control}
                name="height"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{t('yourData.height.title')}</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="h-12"
                      data-testid="height"
                      id={field.name}
                      inputMode="numeric"
                      onChange={(event) => {
                        const numericValue = event.target.value.trim();
                        field.onChange(numericValue === '' ? undefined : Number(numericValue));
                      }}
                      type="number"
                      value={Number.isFinite(field.value) ? field.value : ''}
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
              control={form.control}
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

            <Controller
              control={form.control}
              name="activityLevel"
              render={({ field, fieldState }) => {
                const selectedOption = activityLevelOptions.find(
                  (opt) => opt.value === field.value
                );
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
                          {selectedOption ? selectedOption.label : t('activity.title')}
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

            <Controller
              control={form.control}
              name="goal"
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">{t('goal.title')}</FieldLegend>
                  <RadioGroup
                    className="grid grid-cols-1 gap-3 md:grid-cols-3"
                    data-slot="radio-group"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {goalOptions.map((item) => (
                      <FieldLabel htmlFor={`${field.name}-${item.value}`} key={item.value}>
                        <Field data-invalid={fieldState.invalid} orientation="horizontal">
                          <div className="flex flex-1 flex-col gap-0.5">
                            <span className="font-medium text-sm">{item.label}</span>
                            {item.description && (
                              <FieldDescription className="text-muted-foreground text-xs">
                                {item.description}
                              </FieldDescription>
                            )}
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

            <Controller
              control={form.control}
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              className="h-12 w-full text-lg sm:w-auto"
              data-testid="submit-button"
              size="lg"
              type="submit"
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
