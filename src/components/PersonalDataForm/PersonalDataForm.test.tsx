import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import { UserDataProvider } from '@/context/UserDataContext';
import PersonalDataForm from './PersonalDataForm';

import dict from '@/dictionaries/en.json';

describe('PersonalDataForm', () => {
  test('should render PersonalDataForm component', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );
    const form = screen.getByTestId('form');

    expect(form).toBeInTheDocument();
  });

  test('should be able to enter an age', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );

    const ageInput = screen.getByTestId('age') as HTMLInputElement;
    fireEvent.change(ageInput, { target: { value: '35' } });

    expect(ageInput.value).toBe('35');
  });

  test('should be able to enter a gender', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );

    const radio = screen.getByTestId('gender-male') as HTMLInputElement;
    fireEvent.change(radio, { target: { value: 'male' } });

    expect(radio.value).toBe('male');
  });

  test('should be able to enter a weight', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );
    const weightInput = screen.getByTestId('weight') as HTMLInputElement; // Assert the type as HTMLInputElement
    fireEvent.change(weightInput, { target: { value: '90' } });

    expect(weightInput.value).toBe('90');
  });

  test('should be able to enter a height', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );

    const heightInput = screen.getByTestId('weight') as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '180' } });

    expect(heightInput.value).toBe('180');
  });

  test('should be able to enter an activity level', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );
    const radio = screen.getByTestId(
      'activity-level-no-exercise',
    ) as HTMLInputElement; // Assert the type as HTMLInputElement
    fireEvent.change(radio, { target: { value: 'no-exercise' } });

    expect(radio.value).toBe('no-exercise');
  });

  test('should be able to enter a goal', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );
    const radio = screen.getByLabelText(/cut/i) as HTMLInputElement;
    fireEvent.change(radio, { target: { value: 'cut' } });

    expect(radio.value).toBe('cut');
  });

  test('should be able to enter a formula', () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );
    const radio = screen.getByLabelText(/harris/i) as HTMLInputElement; // Assert the type as HTMLInputElement
    fireEvent.change(radio, { target: { value: 'harris-benedict' } });

    expect(radio.value).toBe('harris-benedict');
  });

  test.skip('should display error messages by entering incorrect data', async () => {
    render(
      <MantineProvider>
        <UserDataProvider>
          <PersonalDataForm dict={dict} />
        </UserDataProvider>
      </MantineProvider>,
    );

    const ageInput = screen.getByTestId('age');
    const weightInput = screen.getByTestId('weight');
    const heightInput = screen.getByTestId('height');

    fireEvent.change(ageInput, { target: { value: '2000' } });
    fireEvent.change(weightInput, { target: { value: '-2000' } });
    fireEvent.change(heightInput, { target: { value: '2000' } });

    expect(screen.getByText(dict.yourData.age.error)).toBeInTheDocument();
    expect(screen.getByText(dict.yourData.weight.error)).toBeInTheDocument();
    expect(screen.getByText(dict.yourData.height.error)).toBeInTheDocument();
  });
});
