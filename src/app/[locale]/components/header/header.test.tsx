import { render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes } from 'react';
import { vi } from 'vitest';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from './header';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    locale: _locale,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { locale?: string }) => (
    <a href="/" {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/en',
}));

describe('Header', () => {
  test('shows a link per language and marks the current one', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'Deutsch' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Русский' })).not.toHaveAttribute('aria-current');
  });
});
