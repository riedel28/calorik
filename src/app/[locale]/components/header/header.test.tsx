import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import Header from './header';
import { ThemeProvider } from '@/components/providers/theme-provider';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: { children: ReactNode }) => (
    <a href="/">{children}</a>
  ),
  usePathname: () => '/en',
}));

describe('Header', () => {
  test('shows language options in dropdown', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Header />
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('button', { name: /english/i });
    await user.click(trigger);

    expect(
      await screen.findByRole('link', { name: /^English$/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /^Deutsch$/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /^Русский$/i }),
    ).toBeInTheDocument();
  });
});
