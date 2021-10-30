import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass';
import { Label, Radio, Input } from '@rebass/forms';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';

import { useTranslation } from 'react-i18next';

import Container from 'components/shared/Container';
import Column from 'components/shared/Column';
import Heading from 'components/shared/Heading';
import Button from 'components/shared/Button';
import useLocalStorage from 'hooks/useLocalStorage';
import validationSchema from 'validationSchema';

const coreData = [
  { id: 'age', description: 'Age' },
  { id: 'height', description: 'Height' },
  { id: 'weight', description: 'Weight' },
];

const activityLevelData = [
  { id: 'no-exercise', description: 'Little / No exercise' },
  { id: 'light', description: 'Light exercise (1–3 days per week)' },
  { id: 'moderate', description: 'Moderate exercise (3–5 days per week)' },
  { id: 'heavy', description: 'Heavy exercise (6–7 days per week)' },
  {
    id: 'very-heavy',
    description: 'Very heavy exercise (twice per day, extra heavy workouts)',
  },
];

const goalData = [
  { id: 'cut', description: 'Cut (-20%)' },
  { id: 'maintain', description: 'Maintain' },
  { id: 'gain', description: 'Gain (+15%)' },
];

const formulaeData = [
  {
    id: 'harris-benedict',
    description: 'The Original Harris-Benedict Equation',
  },
  { id: 'mifflin-st-jeor', description: 'The Mifflin St. Jeor Equation' },
];

const PersonalDataForm = ({ onSubmitData }) => {
  const { t } = useTranslation();
  const [persistentData, setPersistentData] = useLocalStorage('calorikData');
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: persistentData,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setPersistentData(getValues());
  }, [getValues, setPersistentData]);

  const onSubmit = (values) => {
    onSubmitData(values);
  };

  return (
    <Container>
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
        flexWrap="wrap"
        sx={{
          px: 2,
          paddingTop: 4,
          paddingBottom: 3,
          marginBottom: 4,
          borderTop: '1px solid rgba(51, 62, 238, 0.2)',
          borderBottom: '1px solid rgba(51, 62, 238, 0.2)',
        }}
      >
        <Column width={[1, 1 / 2, 1 / 5]}>
          <Heading>{t('Your data')}</Heading>
          <Box width={3 / 4} mb={3}>
            <Text fontWeight="bold" mb={2}>
              {t('Gender')}
            </Text>
            <Label mb={3}>
              <Radio
                value="male"
                {...register('gender')}
                sx={{
                  color: '#333eee',
                }}
              />
              {t('Male')}
            </Label>
            <Label mb={3}>
              <Radio
                value="female"
                {...register('gender')}
                sx={{
                  color: '#333eee',
                }}
              />
              {t('Female')}
            </Label>
          </Box>
          <Box width={3 / 4} mb={3}></Box>
          <Box width={3 / 4} mb={3}>
            {coreData.map(({ id, description }) => (
              <Box mb={3} key={id}>
                <Label htmlFor={id} fontWeight="bold" mb="1">
                  {t(description)}
                </Label>
                <Input
                  type="number"
                  min={0}
                  data-testid={id}
                  {...register(id)}
                  sx={{
                    border: '2px solid #333eee',
                    borderRadius: '5px',
                    padding: '8px 10px',
                    fontSize: 2,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                />
                {errors[id] ? (
                  <Text
                    sx={{
                      color: 'deeppink',
                      fontWeight: 'bold',
                    }}
                    py={1}
                  >
                    {t(errors[id].message)}
                  </Text>
                ) : null}
              </Box>
            ))}
          </Box>
        </Column>

        <Column width={[1, 1 / 2, 1 / 3]}>
          <Heading>{t('Activity Level')}</Heading>
          <Box mb={3}>
            {activityLevelData.map(({ id, description }) => (
              <Label key={id} mb={3}>
                <Radio
                  value={id}
                  {...register('activityLevel')}
                  sx={{
                    color: '#333eee',
                  }}
                />
                {t(description)}
              </Label>
            ))}
          </Box>
        </Column>

        <Column width={[1, 1 / 2, 1 / 5]}>
          <Heading>{t('Your goal')}</Heading>
          {goalData.map(({ id, description }) => (
            <Label key={id} mb={3}>
              <Radio
                value={id}
                {...register('goal')}
                sx={{
                  color: '#333eee',
                }}
              />
              {t(description)}
            </Label>
          ))}
        </Column>

        <Column width={[1, 1 / 2, 1 / 4]}>
          <Heading>{t('Formula')}</Heading>
          {formulaeData.map(({ id, description }) => (
            <Label key={id} mb={3}>
              <Radio
                value={id}
                {...register('formula')}
                sx={{
                  color: '#333eee',
                }}
              />
              {t(description)}
            </Label>
          ))}
        </Column>
      </Flex>

      <Flex justifyContent="center">
        <Button type="submit" onClick={handleSubmit(onSubmitData)}>
          {t('Calculate')}
        </Button>
      </Flex>

      <DevTool control={control} />
    </Container>
  );
};

PersonalDataForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};

export default PersonalDataForm;
