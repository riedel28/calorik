import React from 'react';
import { MantineProvider } from '@mantine/core';
import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: { children: React.ReactNode }) => (
    <a href="/">{children}</a>
  ),
  usePathname: () => '/en',
  useRouter: () => ({ replace: vi.fn() }),
  redirect: vi.fn(),
}));

describe('Header', () => {
  test('should render Header component', async () => {
    render(
      <MantineProvider>
        <Header />
      </MantineProvider>,
    );

    expect(screen.getByText(/EN/)).toBeInTheDocument();
    expect(screen.getByText(/RU/)).toBeInTheDocument();
    expect(screen.getByText(/DE/)).toBeInTheDocument();
  });
});
