'use client';

import LanguageSwitcher from '@/app/[locale]/components/language-switcher/language-switcher';
import ThemeToggle from '@/components/theme-toggle';

const Header = () => (
  <header className="fixed top-0 right-0 left-0 z-50 border-border/60 border-b bg-background/85 px-4 backdrop-blur sm:px-6">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
      <span className="select-none font-display font-semibold text-base text-foreground tracking-tight">
        calorik
        <span aria-hidden="true" className="text-primary">
          .
        </span>
      </span>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;
