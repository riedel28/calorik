'use client';

import LanguageSwitcher from '@/app/[locale]/components/language-switcher/language-switcher';
import ThemeToggle from '@/components/theme-toggle';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background/80 px-4 backdrop-blur">
      <div className="container flex h-14 items-center justify-end gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
