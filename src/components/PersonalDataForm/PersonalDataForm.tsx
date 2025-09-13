'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Radio,
  Title,
  Stack,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { useUserData } from '@/context/UserDataContext';
// We avoid useLocalStorage to prevent render loops in StrictMode

const personalDataFormSchema = z.object({
  gender: z.enum(['male', 'female']),
  age: z
    .number()
    .min(0, 'yourData.age.error')
    .max(120, 'yourData.age.error')
    .max(120),
  height: z.number().min(0).max(250),
  weight: z.number().min(0).max(300),
  activityLevel: z.enum([
    'no-exercise',
    'light',
    'moderate',
    'heavy',
    'very-heavy',
  ]),
  goal: z.enum(['cut', 'maintain', 'gain']),
  formula: z.enum(['harris-benedict', 'mifflin-st-jeor']),
});

export type PersonalDataFormValues = z.infer<typeof personalDataFormSchema>;

const PersonalDataForm = () => {
  const t = useTranslations();

  const activityLevelOptions = [
    { value: 'no-exercise', label: t('activity.noExercise') },
    { value: 'light', label: t('activity.lightExercise') },
    { value: 'moderate', label: t('activity.moderateExercise') },
    { value: 'heavy', label: t('activity.heavyExercise') },
    {
      value: 'very-heavy',
      label: t('activity.veryHeavyExercise'),
    },
  ];

  const goalOptions = [
    { value: 'cut', label: t('goal.cut') },
    { value: 'maintain', label: t('goal.maintain') },
    { value: 'gain', label: t('goal.gain') },
  ];

  const formulaOptions = [
    {
      value: 'harris-benedict',
      label: t('formula.harrisBenedict'),
    },
    { value: 'mifflin-st-jeor', label: t('formula.mifflinStJeor') },
  ];

  const defaultValues = {
    gender: 'male',
    age: 30,
    height: 180,
    weight: 80,
    activityLevel: 'no-exercise',
    goal: 'cut',
    formula: 'harris-benedict',
  } satisfies PersonalDataFormValues;

  const STORAGE_KEY = 'calorikData';
  const { setUserData } = useUserData();

  const form = useForm<PersonalDataFormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(personalDataFormSchema),
  });

  // Load persisted data once after mount
  const hasLoadedData = useRef(false);
  useEffect(() => {
    if (hasLoadedData.current) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as PersonalDataFormValues;
        form.reset(saved);
      } else {
        form.reset(defaultValues);
      }
    } catch {
      form.reset(defaultValues);
    }
    hasLoadedData.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: PersonalDataFormValues) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch (e) {
      // ignore persistence errors (private mode, etc.)
    }
    setUserData(values);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        data-testid="form"
      >
        <Grid mb="xl">
          <Grid.Col
            span={{
              base: 12,
              xs: 6,
              sm: 6,
              md: 3,
            }}
          >
            <Title order={2} mb="md">
              {t('yourData.title')}
            </Title>
            <Stack>
              <Controller
                control={form.control}
                name="gender"
                render={({ field, fieldState }) => (
                  <Radio.Group
                    label={t('yourData.gender.title')}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    error={fieldState.error && t('yourData.gender.error')}
                  >
                    <Group mt="xs">
                      <Radio
                        value="male"
                        label={t('yourData.gender.male')}
                        data-testid="gender-male"
                      />
                      <Radio
                        value="female"
                        label={t('yourData.gender.female')}
                      />
                    </Group>
                  </Radio.Group>
                )}
              />

              <Controller
                control={form.control}
                name="age"
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    label={t('yourData.age.title')}
                    required
                    error={fieldState.error && t('yourData.age.error')}
                    data-testid="age"
                    maw={180}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="height"
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    label={t('yourData.height.title')}
                    required
                    error={fieldState.error && t('yourData.height.error')}
                    data-testid="height"
                    maw={180}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="weight"
                render={({ field, fieldState }) => (
                  <NumberInput
                    {...field}
                    label={t('yourData.weight.title')}
                    required
                    error={fieldState.error && t('yourData.weight.error')}
                    data-testid="weight"
                    maw={180}
                  />
                )}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              xs: 6,
              sm: 6,
              md: 3,
            }}
          >
            <Title order={2} mb="md">
              {t('activity.title')}
            </Title>
            <Controller
              control={form.control}
              name="activityLevel"
              render={({ field, fieldState }) => (
                <Radio.Group
                  label={t('activity.title')}
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={fieldState.error && t('activity.error')}
                >
                  <Group mt="xs">
                    {activityLevelOptions.map((item) => (
                      <Radio
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        data-testid={`activity-level-${item.value}`}
                      />
                    ))}
                  </Group>
                </Radio.Group>
              )}
            />
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              xs: 6,
              sm: 6,
              md: 3,
            }}
          >
            <Title order={2} mb="md">
              {t('goal.title')}
            </Title>

            <Controller
              control={form.control}
              name="goal"
              render={({ field, fieldState }) => (
                <Radio.Group
                  label={t('goal.title')}
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={fieldState.error && t('goal.error')}
                >
                  <Stack mt="xs">
                    {goalOptions.map((item) => (
                      <Radio
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Stack>
                </Radio.Group>
              )}
            />
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              xs: 6,
              sm: 6,
              md: 3,
            }}
          >
            <Title order={2} mb="md">
              {t('formula.title')}
            </Title>
            <Controller
              control={form.control}
              name="formula"
              render={({ field, fieldState }) => (
                <Radio.Group
                  label={t('formula.title')}
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={fieldState.error && t('formula.error')}
                >
                  <Group mt="xs">
                    {formulaOptions.map((item) => (
                      <Radio
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Group>
                </Radio.Group>
              )}
            />
          </Grid.Col>
        </Grid>
        <Group justify="center">
          <Button type="submit" size="xl" data-testid="submit-button">
            {t('calculate')}
          </Button>
        </Group>
      </Box>
    </>
  );
};

export default PersonalDataForm;
