import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  RadioGroup,
  Radio,
  Title,
  Stack,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import useLocalStorage from 'hooks/useLocalStorage';
import validationSchema from 'validationSchema';

import { useUserData } from 'context/UserDataContext';

const activityLevelOptions = [
  { value: 'no-exercise', label: 'Little / No exercise' },
  { value: 'light', label: 'Light exercise (1–3 days per week)' },
  { value: 'moderate', label: 'Moderate exercise (3–5 days per week)' },
  { value: 'heavy', label: 'Heavy exercise (6–7 days per week)' },
  {
    value: 'very-heavy',
    label: 'Very heavy exercise (twice per day, extra heavy workouts)',
  },
];

const goalOptions = [
  { value: 'cut', label: 'Cut (-20%)' },
  { value: 'maintain', label: 'Maintain' },
  { value: 'gain', label: 'Gain (+15%)' },
];

const formulaOptions = [
  {
    value: 'harris-benedict',
    label: 'The Original Harris-Benedict Equation',
  },
  { value: 'mifflin-st-jeor', label: 'The Mifflin St. Jeor Equation' },
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
    schema: yupResolver(validationSchema),
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
            {t('Your data')}
          </Title>
          <Stack>
            <RadioGroup
              {...form.getInputProps('gender')}
              label={t('Gender')}
              color="indigo"
              required
            >
              <Radio value="male" label={t('Male')} />
              <Radio value="female" label={t('Female')} />
            </RadioGroup>
            <NumberInput
              {...form.getInputProps('age')}
              defaultValue={30}
              label={t('Age')}
              required
              style={{
                maxWidth: 120,
              }}
              data-testid="age"
            />
            <NumberInput
              {...form.getInputProps('height')}
              defaultValue={180}
              label={t('Height')}
              required
              style={{
                maxWidth: 120,
              }}
              data-testid="height"
            />
            <NumberInput
              {...form.getInputProps('weight')}
              defaultValue={85}
              label={t('Weight')}
              required
              style={{
                maxWidth: 120,
              }}
              data-testid="weight"
            />
          </Stack>
        </Grid.Col>
        <Grid.Col
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
            {t('Activity Level')}
          </Title>
          <RadioGroup
            {...form.getInputProps('activityLevel')}
            required
            orientation="vertical"
            color="indigo"
          >
            {activityLevelOptions.map((item) => (
              <Radio
                key={item.value}
                label={t(item.label)}
                value={item.value}
              />
            ))}
          </RadioGroup>
        </Grid.Col>
        <Grid.Col
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
            {t('Your goal')}
          </Title>
          <RadioGroup
            {...form.getInputProps('goal')}
            required
            orientation="vertical"
            color="indigo"
          >
            {goalOptions.map((item) => (
              <Radio
                key={item.value}
                label={t(item.label)}
                value={item.value}
              />
            ))}
          </RadioGroup>
        </Grid.Col>
        <Grid.Col
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
            {t('Formula')}
          </Title>
          <RadioGroup
            {...form.getInputProps('formula')}
            required
            orientation="vertical"
            color="indigo"
          >
            {formulaOptions.map((item) => (
              <Radio
                key={item.value}
                label={t(item.label)}
                value={item.value}
              />
            ))}
          </RadioGroup>
        </Grid.Col>
      </Grid>
      <Group position="center">
        <Button
          type="submit"
          size="xl"
          color="indigo"
          data-testid="submit-button"
        >
          {t('Calculate')}
        </Button>
      </Group>
    </Box>
  );
};

export default PersonalDataForm;
