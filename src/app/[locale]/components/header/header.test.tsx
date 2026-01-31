import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { vi } from 'vitest';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from './header';

const ENGLISH_REGEX = /english/i;
const ENGLISH_EXACT_REGEX = /^English$/i;
const DEUTSCH_REGEX = /^Deutsch$/i;
const RUSSIAN_REGEX = /^Русский$/i;

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
  usePathname: () => '/en',
}));

describe('Header', () => {
  test('shows language options in dropdown', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Header />
      </ThemeProvider>
    );

    const trigger = screen.getByRole('button', { name: ENGLISH_REGEX });
    await user.click(trigger);

    expect(await screen.findByRole('link', { name: ENGLISH_EXACT_REGEX })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: DEUTSCH_REGEX })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: RUSSIAN_REGEX })).toBeInTheDocument();
  });
});
