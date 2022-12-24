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

import useLocalStorage from 'hooks/useLocalStorage';
import validationSchema from 'components/PersonalDataForm/validationSchema';

import { useUserData } from 'context/UserDataContext';

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
      <Grid
        style={{
          marginBottom: '2rem',
        }}
      >
        <Grid.Col
          xs={6}
          sm={6}
          md={3}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title
            order={2}
            style={{
              marginBottom: '1rem',
            }}
          >
            {t('yourData.title')}
          </Title>
          <Stack>
            <Radio.Group
              {...form.getInputProps('gender')}
              label={t('yourData.gender')}
              color="blue"
              required
            >
              <Radio
                value="male"
                label={t('yourData.gender.male')}
                data-testid="gender-male"
              />
              <Radio value="female" label={t('yourData.gender.female')} />
            </Radio.Group>
            <NumberInput
              {...form.getInputProps('age')}
              defaultValue={30}
              label={t('yourData.age')}
              required
              error={t(form.errors?.age)}
              style={{
                maxWidth: 120,
              }}
              data-testid="age"
            />

            <NumberInput
              {...form.getInputProps('height')}
              defaultValue={180}
              label={t('yourData.height')}
              error={t(form.errors?.height)}
              required
              style={{
                maxWidth: 120,
              }}
              data-testid="height"
            />

            <NumberInput
              {...form.getInputProps('weight')}
              defaultValue={85}
              label={t('yourData.weight')}
              error={t(form.errors?.weight)}
              required
              style={{
                maxWidth: 120,
              }}
              data-testid="weight"
            />
          </Stack>
        </Grid.Col>
        <Grid.Col
          xs={6}
          sm={6}
          md={4}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title
            order={2}
            style={{
              marginBottom: '1rem',
            }}
          >
            {t('activityLevel.title')}
          </Title>
          <Radio.Group
            {...form.getInputProps('activityLevel')}
            error={t(form.errors?.activityLevel)}
            required
            orientation="vertical"
            color="blue"
          >
            {activityLevelOptions.map((item) => (
              <Radio
                key={item.value}
                label={t(item.label)}
                value={item.value}
                data-testid={`activity-level-${item.value}`}
              />
            ))}
          </Radio.Group>
        </Grid.Col>
        <Grid.Col
          xs={6}
          sm={6}
          md={2}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title
            order={2}
            style={{
              marginBottom: '1rem',
            }}
          >
            {t('goal.title')}
          </Title>
          <Radio.Group
            {...form.getInputProps('goal')}
            error={t(form.errors?.goal)}
            required
            orientation="vertical"
            color="blue"
          >
            {goalOptions.map((item) => (
              <Radio
                key={item.value}
                label={t(item.label)}
                value={item.value}
              />
            ))}
          </Radio.Group>
        </Grid.Col>
        <Grid.Col
          xs={6}
          sm={6}
          md={3}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title
            order={2}
            style={{
              marginBottom: '1rem',
            }}
          >
            {t('formula.title')}
          </Title>
          <Radio.Group
            {...form.getInputProps('formula')}
            error={t(form.errors?.formula)}
            required
            orientation="vertical"
            color="blue"
          >
            {formulaOptions.map((item) => (
              <Radio
                key={item.value}
                label={t(item.label)}
                value={item.value}
              />
            ))}
          </Radio.Group>
        </Grid.Col>
      </Grid>
      <Group position="center">
        <Button
          type="submit"
          size="xl"
          color="blue"
          data-testid="submit-button"
          sx={{
            fontSize: 16,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          {t('calculate')}
        </Button>
      </Group>
    </Box>
  );
};

export default PersonalDataForm;
