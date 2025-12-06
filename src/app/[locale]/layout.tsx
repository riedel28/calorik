import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import Header from '@/app/[locale]/components/header/header';
import { UserDataProvider } from '@/context/user-data-context';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Calorik',
  description: 'Calculate your daily caloric needs',
};

const isSupportedLocale = (value: string): value is (typeof routing.locales)[number] =>
  routing.locales.includes(value as (typeof routing.locales)[number]);

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !isSupportedLocale(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col bg-sky-50 dark:bg-sky-950 text-foreground">
        <Header />
        <main className="flex-1 pt-16">
          <div className="max-w-7xl px-4 py-4 mx-auto">
            <UserDataProvider>{children}</UserDataProvider>
          </div>
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
