import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'ru'],

  // Always prefix the locale (matches [locale] segment)
  localePrefix: 'always',

  // Used when no locale matches
  defaultLocale: 'en',
});
