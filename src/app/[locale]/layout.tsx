import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import Header from '@/app/[locale]/components/header/header';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  description: 'Calculate your daily caloric needs',
  title: 'Calorik',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-[clamp(16px,4vw,40px)] pt-7 pb-14">
        <Header />
        <main>{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
