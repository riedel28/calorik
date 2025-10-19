'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserData } from '@/context/user-data-context';

const personalDataFormSchema = z.object({
  gender: z.enum(['male', 'female'], 'yourData.gender.error'),
  age: z
    .number('yourData.age.error')
    .min(0, 'yourData.age.error')
    .max(120, 'yourData.age.error'),
  height: z
    .number('yourData.height.error')
    .min(0, 'yourData.height.error')
    .max(250, 'yourData.height.error'),
  weight: z
    .number('yourData.weight.error')
    .min(0, 'yourData.weight.error')
    .max(300, 'yourData.weight.error'),
  activityLevel: z.enum(
    ['no-exercise', 'light', 'moderate', 'heavy', 'very-heavy'],
    'activity.error'
  ),
  goal: z.enum(['cut', 'maintain', 'gain'], 'goal.error'),
  formula: z.enum(['harris-benedict', 'mifflin-st-jeor'], 'formula.error')
});

export type PersonalDataFormValues = z.infer<typeof personalDataFormSchema>;

const PersonalDataForm = () => {
  const t = useTranslations();
  const pageT = useTranslations('page');
  const STORAGE_KEY = 'calorikData';
  const { setUserData } = useUserData();

  const defaultValues: PersonalDataFormValues = {
    gender: 'male',
    age: 30,
    height: 180,
    weight: 80,
    activityLevel: 'no-exercise',
    goal: 'cut',
    formula: 'harris-benedict'
  };

  const activityLevelOptions = [
    { value: 'no-exercise', label: t('activity.noExercise') },
    { value: 'light', label: t('activity.lightExercise') },
    { value: 'moderate', label: t('activity.moderateExercise') },
    { value: 'heavy', label: t('activity.heavyExercise') },
    { value: 'very-heavy', label: t('activity.veryHeavyExercise') }
  ];

  const goalOptions = [
    { value: 'cut', label: t('goal.cut') },
    { value: 'maintain', label: t('goal.maintain') },
    { value: 'gain', label: t('goal.gain') }
  ];

  const formulaOptions = [
    { value: 'harris-benedict', label: t('formula.harrisBenedict') },
    { value: 'mifflin-st-jeor', label: t('formula.mifflinStJeor') }
  ];

  const form = useForm<PersonalDataFormValues>({
    defaultValues,
    resolver: zodResolver(personalDataFormSchema)
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

  const handleSubmit = (values: PersonalDataFormValues) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore persistence errors
    }

    setUserData(values);
  };

  type MessageKey = Parameters<typeof t>[0];

  const renderError = (message?: string) =>
    message ? <FormMessage>{t(message as MessageKey)}</FormMessage> : null;

  return (
    <section className="rounded-3xl bg-white/90 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:p-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          {pageT('formSectionTitle')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {pageT('formSectionSubtitle')}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          data-testid="form"
          className="space-y-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="age"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('yourData.age.title')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      data-testid="age"
                      className="h-12"
                      value={Number.isFinite(field.value) ? field.value : ''}
                      onChange={event => {
                        const numericValue = event.target.value.trim();
                        field.onChange(
                          numericValue === '' ? undefined : Number(numericValue)
                        );
                      }}
                    />
                  </FormControl>
                  {renderError(fieldState.error?.message)}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('yourData.gender.title')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-2 gap-3"
                    >
                      <RadioGroupItem value="male" data-testid="gender-male">
                        {t('yourData.gender.male')}
                      </RadioGroupItem>
                      <RadioGroupItem value="female">
                        {t('yourData.gender.female')}
                      </RadioGroupItem>
                    </RadioGroup>
                  </FormControl>
                  {renderError(fieldState.error?.message)}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('yourData.weight.title')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      data-testid="weight"
                      className="h-12"
                      value={Number.isFinite(field.value) ? field.value : ''}
                      onChange={event => {
                        const numericValue = event.target.value.trim();
                        field.onChange(
                          numericValue === '' ? undefined : Number(numericValue)
                        );
                      }}
                    />
                  </FormControl>
                  {renderError(fieldState.error?.message)}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('yourData.height.title')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      data-testid="height"
                      className="h-12"
                      value={Number.isFinite(field.value) ? field.value : ''}
                      onChange={event => {
                        const numericValue = event.target.value.trim();
                        field.onChange(
                          numericValue === '' ? undefined : Number(numericValue)
                        );
                      }}
                    />
                  </FormControl>
                  {renderError(fieldState.error?.message)}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('activity.title')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid gap-3"
                  >
                    {activityLevelOptions.map(item => (
                      <RadioGroupItem
                        key={item.value}
                        value={item.value}
                        data-testid={`activity-level-${item.value}`}
                        className="justify-start text-left"
                      >
                        {item.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                {renderError(fieldState.error?.message)}
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-1">
            <FormField
              control={form.control}
              name="goal"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('goal.title')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid gap-3 md:grid-cols-3"
                    >
                      {goalOptions.map(item => (
                        <RadioGroupItem key={item.value} value={item.value}>
                          {item.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {renderError(fieldState.error?.message)}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formula"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('formula.title')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid gap-3"
                    >
                      {formulaOptions.map(item => (
                        <RadioGroupItem key={item.value} value={item.value}>
                          {item.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {renderError(fieldState.error?.message)}
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="submit"
              size="lg"
              data-testid="submit-button"
              className="w-full sm:w-auto sm:px-10"
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
