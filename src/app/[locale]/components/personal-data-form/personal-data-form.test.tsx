import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import { UserDataProvider } from '@/context/user-data-context';
import messages from '../../../../../messages/en.json';
import PersonalDataForm from './personal-data-form';

const renderForm = () =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <UserDataProvider>
        <PersonalDataForm />
      </UserDataProvider>
    </NextIntlClientProvider>,
  );

describe('PersonalDataForm', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders the form', () => {
    renderForm();
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  test('allows entering numeric values', () => {
    renderForm();

    const ageInput = screen.getByTestId('age') as HTMLInputElement;
    fireEvent.input(ageInput, { target: { value: '35' } });

    expect(ageInput.value).toBe('35');

    const weightInput = screen.getByTestId('weight') as HTMLInputElement;
    fireEvent.input(weightInput, { target: { value: '90' } });

    expect(weightInput.value).toBe('90');

    const heightInput = screen.getByTestId('height') as HTMLInputElement;
    fireEvent.input(heightInput, { target: { value: '180' } });

    expect(heightInput.value).toBe('180');
  });

  test('allows selecting radio options', async () => {
    const user = userEvent.setup();
    renderForm();

    const maleOption = screen.getByTestId('gender-male');
    await user.click(maleOption);

    expect(maleOption).toHaveAttribute('aria-checked', 'true');

    const activityOption = screen.getByTestId('activity-level-light');
    await user.click(activityOption);

    expect(activityOption).toHaveAttribute('aria-checked', 'true');

    const goalOption = screen.getByRole('radio', {
      name: messages.goal.maintain,
    });
    await user.click(goalOption);

    expect(goalOption).toHaveAttribute('aria-checked', 'true');

    const formulaOption = screen.getByRole('radio', {
      name: messages.formula.mifflinStJeor,
    });
    await user.click(formulaOption);

    expect(formulaOption).toHaveAttribute('aria-checked', 'true');
  });
});
