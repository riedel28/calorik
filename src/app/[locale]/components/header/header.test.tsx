import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AnchorHTMLAttributes } from 'react';
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
  Link: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href="/" {...props}>
      {children}
    </a>
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

    const trigger = screen.getByRole('button', { name: ENGLISH_REGEX });
    await user.click(trigger);

    expect(await screen.findByRole('menuitem', { name: ENGLISH_EXACT_REGEX })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: DEUTSCH_REGEX })).toBeInTheDocument();
    expect(await screen.findByRole('menuitem', { name: RUSSIAN_REGEX })).toBeInTheDocument();
  });

  test('marks the active menu item as highlighted for keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Header />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: ENGLISH_REGEX }));
    await screen.findByRole('menuitem', { name: DEUTSCH_REGEX });
    await user.keyboard('{ArrowDown}');

    const highlighted = document.querySelector('[data-highlighted]');
    expect(highlighted).not.toBeNull();
  });
});
