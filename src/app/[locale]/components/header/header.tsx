'use client';

import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/app/[locale]/components/language-switcher/language-switcher';
import ThemeToggle from '@/components/theme-toggle';

const Header = () => {
  const t = useTranslations('page');

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <svg
            aria-hidden="true"
            fill="none"
            height="22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M12 3c2.5 3.2 5 6 5 9.5A5 5 0 0 1 7 12.5C7 10 8.5 8.5 9.5 7c.4 1.6 1.3 2.6 2.5 3 0-2.4 0-4.6 0-7z" />
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold text-[22px] tracking-[-0.01em]">{t('title')}</h1>
          <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
