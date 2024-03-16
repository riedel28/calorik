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
import { useForm, yupResolver } from '@mantine/form';

import { useUserData } from '@/context/UserDataContext';
// import useLocalStorage from '@/hooks/useLocalStorage';
import validationSchema from './validationSchema';

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

  // const [persistentData, setPersistentData] = useLocalStorage({
  //   key: 'calorikData',
  // });
  const { setUserData } = useUserData();

  const form = useForm({
    initialValues: {
      gender: 'male',
      age: 35,
      height: 180,
      weight: 80,
      activityLevel: 'no-exercise',
      goal: 'cut',
      formula: 'harris-benedict',
    },
    validateInputOnChange: true,
    validate: yupResolver(validationSchema),
  });

  const handleSubmit = (values: any) => {
    // setPersistentData(values);
    setUserData(values);
  };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
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
            <Radio.Group
              {...form.getInputProps('gender')}
              label={dict.yourData.gender.title}
              required
            >
              <Group mt="xs">
                <Radio
                  value="male"
                  label={dict.yourData.gender.male}
                  data-testid="gender-male"
                />
                <Radio value="female" label={dict.yourData.gender.female} />
              </Group>
            </Radio.Group>
            <NumberInput
              {...form.getInputProps('age')}
              defaultValue={30}
              label={dict.yourData.age.title}
              required
              error={form.errors.age && dict.yourData.age.error}
              data-testid="age"
              maw={180}
            />

            <NumberInput
              {...form.getInputProps('height')}
              defaultValue={180}
              label={dict.yourData.height.title}
              error={form.errors.height && dict.yourData.height.error}
              required
              data-testid="height"
              maw={180}
            />

            <NumberInput
              {...form.getInputProps('weight')}
              defaultValue={85}
              label={dict.yourData.weight.title}
              error={form.errors.weight && dict.yourData.weight.error}
              required
              data-testid="weight"
              maw={180}
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
          <Radio.Group
            {...form.getInputProps('activityLevel')}
            error={form.errors?.activityLevel && dict.activity.error}
            required
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
          <Radio.Group
            {...form.getInputProps('goal')}
            error={form.errors?.goal && dict.goal.error}
            required
          >
            <Group mt="xs">
              {goalOptions.map((item) => (
                <Radio key={item.value} label={item.label} value={item.value} />
              ))}
            </Group>
          </Radio.Group>
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
          <Radio.Group
            {...form.getInputProps('formula')}
            error={form.errors?.formula && dict.formula.error}
            required
          >
            <Group mt="xs">
              {formulaOptions.map((item) => (
                <Radio key={item.value} label={item.label} value={item.value} />
              ))}
            </Group>
          </Radio.Group>
        </Grid.Col>
      </Grid>
      <Group justify="center">
        <Button type="submit" size="xl" data-testid="submit-button">
          {dict.calculate}
        </Button>
      </Group>
    </Box>
  );
};

export default PersonalDataForm;
