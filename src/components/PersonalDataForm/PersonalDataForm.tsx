'use client';

import React from 'react';
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
import { DevTool } from '@hookform/devtools';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserData } from '@/context/UserDataContext';

import { useLocalStorage } from '@mantine/hooks';

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

const PersonalDataForm = ({ dict }: { dict: any }) => {
  const activityLevelOptions = [
    { value: 'no-exercise', label: dict.activity.noExercise },
    { value: 'light', label: dict.activity.lightExercise },
    { value: 'moderate', label: dict.activity.moderateExercise },
    { value: 'heavy', label: dict.activity.heavyExercise },
    {
      value: 'very-heavy',
      label: dict.activity.veryHeavyExercise,
    },
  ];

  const goalOptions = [
    { value: 'cut', label: dict.goal.cut },
    { value: 'maintain', label: dict.goal.maintain },
    { value: 'gain', label: dict.goal.gain },
  ];

  const formulaOptions = [
    {
      value: 'harris-benedict',
      label: dict.formula.harrisBenedict,
    },
    { value: 'mifflin-st-jeor', label: dict.formula.mifflinStJeor },
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

  const [persistentData, setPersistentData] =
    useLocalStorage<PersonalDataFormValues>({
      key: 'calorikData',
      defaultValue: defaultValues,
    });
  const { setUserData } = useUserData();

  const form = useForm<PersonalDataFormValues>({
    defaultValues: defaultValues || persistentData,
    resolver: zodResolver(personalDataFormSchema),
  });

  const handleSubmit = (values: PersonalDataFormValues) => {
    setPersistentData(values);
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
              {dict.yourData.title}
            </Title>
            <Stack>
              <Controller
                control={form.control}
                name="gender"
                render={({ field, fieldState }) => (
                  <Radio.Group
                    label={dict.yourData.gender.title}
                    value={field.value}
                    onChange={field.onChange}
                    required
                    error={fieldState.error && dict.yourData.gender.error}
                  >
                    <Group mt="xs">
                      <Radio
                        value="male"
                        label={dict.yourData.gender.male}
                        data-testid="gender-male"
                      />
                      <Radio
                        value="female"
                        label={dict.yourData.gender.female}
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
                    label={dict.yourData.age.title}
                    required
                    error={fieldState.error && dict.yourData.age.error}
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
                    label={dict.yourData.height.title}
                    required
                    error={fieldState.error && dict.yourData.height.error}
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
                    label={dict.yourData.weight.title}
                    required
                    error={fieldState.error && dict.yourData.weight.error}
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
              {dict.activity.title}
            </Title>
            <Controller
              control={form.control}
              name="activityLevel"
              render={({ field, fieldState }) => (
                <Radio.Group
                  label={dict.activity.title}
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={fieldState.error && dict.activity.error}
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
              {dict.goal.title}
            </Title>

            <Controller
              control={form.control}
              name="goal"
              render={({ field, fieldState }) => (
                <Radio.Group
                  label={dict.goal.title}
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={fieldState.error && dict.goal.error}
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
              {dict.formula.title}
            </Title>
            <Controller
              control={form.control}
              name="formula"
              render={({ field, fieldState }) => (
                <Radio.Group
                  label={dict.formula.title}
                  value={field.value}
                  onChange={field.onChange}
                  required
                  error={fieldState.error && dict.formula.error}
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
            {dict.calculate}
          </Button>
        </Group>
      </Box>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={form.control} />
      )}
    </>
  );
};

export default PersonalDataForm;
