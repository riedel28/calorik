import React from 'react';
import { useTranslation } from 'react-i18next';
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

import { useUserData } from '../../context/UserDataContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import validationSchema from './validationSchema';

const activityLevelOptions = [
  { value: 'no-exercise', label: 'activityLevel.noExercise' },
  { value: 'light', label: 'activityLevel.lightExercise' },
  { value: 'moderate', label: 'activityLevel.moderateExercise' },
  { value: 'heavy', label: 'activityLevel.heavyExercise' },
  {
    value: 'very-heavy',
    label: 'activityLevel.veryHeavyExercise',
  },
];

const goalOptions = [
  { value: 'cut', label: 'goal.cut' },
  { value: 'maintain', label: 'goal.maintain' },
  { value: 'gain', label: 'goal.gain' },
];

const formulaOptions = [
  {
    value: 'harris-benedict',
    label: 'formula.harrisBenedict',
  },
  { value: 'mifflin-st-jeor', label: 'formula.mifflinStJeor' },
];

const PersonalDataForm = () => {
  const { t } = useTranslation();

  const [persistentData, setPersistentData] = useLocalStorage('calorikData');
  const { setUserData } = useUserData();

  const form = useForm({
    initialValues: persistentData || {
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

  const handleSubmit = (values) => {
    setPersistentData(values);
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
            {t('yourData.title')}
          </Title>
          <Stack>
            <Radio.Group
              {...form.getInputProps('gender')}
              label={t('yourData.gender')}
              required
            >
              <Group mt="xs">
                <Radio
                  value="male"
                  label={t('yourData.gender.male')}
                  data-testid="gender-male"
                />
                <Radio value="female" label={t('yourData.gender.female')} />
              </Group>
            </Radio.Group>
            <NumberInput
              {...form.getInputProps('age')}
              defaultValue={30}
              label={t('yourData.age')}
              required
              error={t(form.errors?.age)}
              data-testid="age"
              maw={120}
            />

            <NumberInput
              {...form.getInputProps('height')}
              defaultValue={180}
              label={t('yourData.height')}
              error={t(form.errors?.height)}
              required
              data-testid="height"
              maw={120}
            />

            <NumberInput
              {...form.getInputProps('weight')}
              defaultValue={85}
              label={t('yourData.weight')}
              error={t(form.errors?.weight)}
              required
              data-testid="weight"
              maw={120}
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
            {t('activityLevel.title')}
          </Title>
          <Radio.Group
            {...form.getInputProps('activityLevel')}
            error={t(form.errors?.activityLevel)}
            required
            orientation="vertical"
          >
            <Group mt="xs">
              {activityLevelOptions.map((item) => (
                <Radio
                  key={item.value}
                  label={t(item.label)}
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
            {t('goal.title')}
          </Title>
          <Radio.Group
            {...form.getInputProps('goal')}
            error={t(form.errors?.goal)}
            required
            orientation="vertical"
          >
            <Group mt="xs">
              {goalOptions.map((item) => (
                <Radio
                  key={item.value}
                  label={t(item.label)}
                  value={item.value}
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
            {t('formula.title')}
          </Title>
          <Radio.Group
            {...form.getInputProps('formula')}
            error={t(form.errors?.formula)}
            required
            orientation="vertical"
          >
            <Group mt="xs">
              {formulaOptions.map((item) => (
                <Radio
                  key={item.value}
                  label={t(item.label)}
                  value={item.value}
                />
              ))}
            </Group>
          </Radio.Group>
        </Grid.Col>
      </Grid>
      <Group justify="center">
        <Button type="submit" size="xl" data-testid="submit-button">
          {t('calculate')}
        </Button>
      </Group>
    </Box>
  );
};

export default PersonalDataForm;
