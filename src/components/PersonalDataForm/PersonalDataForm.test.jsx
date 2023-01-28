import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { UserDataProvider } from '@context/UserDataContext';
import PersonalDataForm from './PersonalDataForm';

vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));

describe('PersonalDataForm', () => {
  test('should render PersonalDataForm component', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );
    const form = screen.getByTestId('form');

    expect(form).toBeInTheDocument();
  });

  test('should be able to enter an age', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );

    const ageInput = screen.getByTestId('age');
    fireEvent.change(ageInput, { target: { value: '35' } });

    expect(ageInput.value).toBe('35');
  });

  test('should be able to enter a gender', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );

    const radio = screen.getByTestId('gender-male');
    fireEvent.change(radio, { target: { value: 'male' } });

    expect(radio.value).toBe('male');
  });

  test('should be able to enter a weight', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );
    const weightInput = screen.getByTestId('weight');
    fireEvent.change(weightInput, { target: { value: '90' } });

    expect(weightInput.value).toBe('90');
  });

  test('should be able to enter a height', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );

    const heightInput = screen.getByTestId('weight');
    fireEvent.change(heightInput, { target: { value: '180' } });

    expect(heightInput.value).toBe('180');
  });

  test('should be able to enter an activity level', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );
    const radio = screen.getByTestId('activity-level-no-exercise');
    fireEvent.change(radio, { target: { value: 'no-exercise' } });

    expect(radio.value).toBe('no-exercise');
  });

  test('should be able to enter a goal', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );
    const radio = screen.getByLabelText(/cut/i);
    fireEvent.change(radio, { target: { value: 'cut' } });

    expect(radio.value).toBe('cut');
  });

  test('should be able to enter a formula', () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );
    const radio = screen.getByLabelText(/harris/i);
    fireEvent.change(radio, { target: { value: 'harris-benedict' } });

    expect(radio.value).toBe('harris-benedict');
  });

  test('should display error messages by entering incorrect data', async () => {
    const handleSubmit = vi.fn();
    render(
      <UserDataProvider>
        <PersonalDataForm onSubmitData={handleSubmit} />
      </UserDataProvider>
    );

    const ageInput = screen.getByTestId('age');
    const weightInput = screen.getByTestId('weight');
    const heightInput = screen.getByTestId('height');
    // const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(ageInput, { target: { value: '2000' } });
    fireEvent.change(weightInput, { target: { value: '-2000' } });
    fireEvent.change(heightInput, { target: { value: '2000' } });
    // fireEvent.click(submitButton);

    expect(screen.getByText('yourData.age.error')).toBeInTheDocument();
    expect(screen.getByText('yourData.height.error')).toBeInTheDocument();
    expect(screen.getByText('yourData.weight.error')).toBeInTheDocument();
  });
});
