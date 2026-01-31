'use client';

import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import ReactCountryFlag from 'react-country-flag';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: 'en', label: 'English', countryCode: 'GB' },
    { code: 'de', label: 'Deutsch', countryCode: 'DE' },
    { code: 'ru', label: 'Русский', countryCode: 'RU' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={currentLanguage.label}
          className="flex items-center gap-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          title={currentLanguage.label}
          variant="ghost"
        >
          <ReactCountryFlag
            aria-hidden
            countryCode={currentLanguage.countryCode}
            style={{
              width: '1.25rem',
              height: '1rem',
              borderRadius: '2px',
            }}
            svg
            title={currentLanguage.label}
          />
          <span className="hidden font-medium text-sm sm:inline">{currentLanguage.label}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {languages.map((lang) => (
          <DropdownMenuItem
            asChild
            className={cn(
              'flex items-center gap-2',
              locale === lang.code && 'bg-accent text-accent-foreground'
            )}
            key={lang.code}
          >
            <Link
              className="flex flex-1 items-center gap-2"
              href={pathname || '/'}
              locale={lang.code}
              role="menuitem"
            >
              <ReactCountryFlag
                aria-hidden
                countryCode={lang.countryCode}
                style={{
                  width: '1.25rem',
                  height: '1rem',
                  borderRadius: '2px',
                }}
                svg
                title={lang.label}
              />
              <span className="text-sm">{lang.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
