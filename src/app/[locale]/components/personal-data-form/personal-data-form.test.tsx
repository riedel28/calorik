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

    // Activity level is now a select dropdown
    const activitySelect = screen.getByTestId('activity-level-select');
    await user.click(activitySelect);

    // Wait for dropdown to open and find the option
    const activityOption = await screen.findByTestId('activity-level-light');
    await user.click(activityOption);

    // Wait for dropdown to close
    await screen.findByTestId('activity-level-select');

    // Find goal option by testid or label text
    const goalOption = screen.getByRole('radio', {
      name: new RegExp(messages.goal.maintain, 'i'),
    });
    await user.click(goalOption);

    expect(goalOption).toHaveAttribute('aria-checked', 'true');

    // Formula options use direct label text, not translation keys
    const formulaOption = screen.getByRole('radio', {
      name: 'Mifflin St. Jeor',
    });
    await user.click(formulaOption);

    expect(formulaOption).toHaveAttribute('aria-checked', 'true');
  });
});
