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
    { code: 'en', countryCode: 'GB', label: 'English' },
    { code: 'de', countryCode: 'DE', label: 'Deutsch' },
    { code: 'ru', countryCode: 'RU', label: 'Русский' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={currentLanguage.label}
            className="flex items-center gap-2 data-popup-open:bg-accent data-popup-open:text-accent-foreground"
            title={currentLanguage.label}
            variant="ghost"
          />
        }
      >
        <ReactCountryFlag
          aria-hidden
          countryCode={currentLanguage.countryCode}
          style={{
            borderRadius: '3px',
            height: '1rem',
            width: '1.25rem',
          }}
          svg
          title={currentLanguage.label}
        />
        <span className="hidden font-medium text-sm sm:inline">{currentLanguage.label}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 gap-4">
        {languages.map((lang) => (
          <DropdownMenuItem
            className={cn('flex items-center gap-2')}
            key={lang.code}
            render={
              <Link
                className="flex flex-1 items-center gap-2"
                href={pathname || '/'}
                locale={lang.code}
                role="menuitem"
              />
            }
          >
            <ReactCountryFlag
              aria-hidden
              countryCode={lang.countryCode}
              style={{
                borderRadius: '3px',
                height: '1rem',
                width: '1.25rem',
              }}
              svg
              title={lang.label}
            />
            <span className="text-sm">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
