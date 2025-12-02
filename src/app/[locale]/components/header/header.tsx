'use client';

import LanguageSwitcher from '@/app/[locale]/components/language-switcher/language-switcher';
import ThemeToggle from '@/components/theme-toggle';

const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur fixed top-0 left-0 right-0 z-50 px-4">
      <div className="container flex h-14 items-center justify-end gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
