'use client';

import ThemeToggle from '@/components/theme-toggle';
import LanguageSwitcher from '@/app/[locale]/components/language-switcher/language-switcher';

const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-end gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
