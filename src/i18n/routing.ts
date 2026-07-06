import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'en',

  // Always prefix the locale (matches [locale] segment)
  localePrefix: 'always',
  // A list of all locales that are supported
  locales: ['en', 'de', 'ru'],
});
