import React from 'react';
import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import Header from './Header';

vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('Header', () => {
  test('should render Header component', async () => {
    render(
      <ColorSchemeProvider>
        <MantineProvider>
          <Header />
        </MantineProvider>
      </ColorSchemeProvider>
    );

    expect(screen.getByText(/en/i)).toBeInTheDocument();
    expect(screen.getByText(/ru/i)).toBeInTheDocument();
    expect(screen.getByText(/de/i)).toBeInTheDocument();
  });
});
