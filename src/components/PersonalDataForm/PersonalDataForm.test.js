import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import PersonalDataForm from './PersonalDataForm';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));

describe('PersonalDataForm', () => {
  test('should render PersonalDataForm component', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const form = getByTestId('form');

    expect(form).toBeInTheDocument();
  });

  test('should be able to enter an age', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const ageInput = getByTestId('age');
    fireEvent.change(ageInput, { target: { value: '35' } });

    expect(ageInput.value).toBe('35');
  });

  test('should be able to enter a gender', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );

    const radio = getByLabelText('Male');
    fireEvent.change(radio, { target: { value: 'male' } });

    expect(radio.value).toBe('male');
  });

  test('should be able to enter a weight', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const weightInput = getByTestId('weight');
    fireEvent.change(weightInput, { target: { value: '90' } });

    expect(weightInput.value).toBe('90');
  });

  test('should be able to enter a height', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const heightInput = getByTestId('weight');
    fireEvent.change(heightInput, { target: { value: '180' } });

    expect(heightInput.value).toBe('180');
  });

  test('should be able to enter an activity level', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const radio = getByLabelText(/no exercise/i);
    fireEvent.change(radio, { target: { value: 'no-exercise' } });

    expect(radio.value).toBe('no-exercise');
  });

  test('should be able to enter a goal', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const radio = getByLabelText(/cut/i);
    fireEvent.change(radio, { target: { value: 'cut' } });

    expect(radio.value).toBe('cut');
  });

  test('should be able to enter a formula', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const radio = getByLabelText(/harris/i);
    fireEvent.change(radio, { target: { value: 'harris-benedict' } });

    expect(radio.value).toBe('harris-benedict');
  });

  test('should submit the form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );

    const ageInput = getByTestId('age');
    const heightInput = getByTestId('height');
    const weightInput = getByTestId('weight');
    const activityLevelInput = getByLabelText(/no exercise/i);
    const goalInput = getByLabelText(/cut/i);
    const formulaInput = getByLabelText(/harris/i);
    const submitButton = getByTestId('submit-button');

    await waitFor(() => {
      fireEvent.change(ageInput, { target: { value: '35' } });
    });

    await waitFor(() => {
      fireEvent.change(heightInput, { target: { value: '180' } });
    });

    await waitFor(() => {
      fireEvent.change(weightInput, { target: { value: '90' } });
    });

    await waitFor(() => {
      fireEvent.change(activityLevelInput, {
        target: { value: 'no-exercise' },
      });
    });

    await waitFor(() => {
      fireEvent.change(goalInput, { target: { value: 'cut' } });
    });

    await waitFor(() => {
      fireEvent.change(formulaInput, { target: { value: 'harris-benedict' } });
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(handleSubmit).toBeCalled();
  });

  test('should display error messages by entering incorrect data', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId, getByText } = render(
      <PersonalDataForm onSubmitData={handleSubmit} />
    );
    const ageInput = getByTestId('age');
    const weightInput = getByTestId('weight');
    const heightInput = getByTestId('height');
    const submitButton = getByTestId('submit-button');

    await waitFor(() => {
      fireEvent.change(ageInput, { target: { value: '2000' } });
    });

    await waitFor(() => {
      fireEvent.change(weightInput, { target: { value: '-2000' } });
    });

    await waitFor(() => {
      fireEvent.change(heightInput, { target: { value: '2000' } });
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(getByText('Please enter valid age')).toBeInTheDocument();
    expect(getByText('Please enter valid height')).toBeInTheDocument();
    expect(getByText('Please enter valid weight')).toBeInTheDocument();
  });
});
