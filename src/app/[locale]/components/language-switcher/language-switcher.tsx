'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LANGUAGE_NAMES: Record<string, string> = {
  de: 'Deutsch',
  en: 'English',
  ru: 'Русский',
};

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label="Language" className="flex gap-0.5 rounded-lg border bg-card p-1">
      {routing.locales.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            aria-current={isActive ? 'true' : undefined}
            aria-label={LANGUAGE_NAMES[code]}
            className={cn(
              'flex h-9 min-w-12 items-center justify-center rounded-[9px] px-3 font-bold text-[13px] uppercase transition-colors focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary',
            )}
            href={pathname || '/'}
            key={code}
            lang={code}
            locale={code}
          >
            {code}
          </Link>
        );
      })}
    </nav>
  );
};

export default LanguageSwitcher;
