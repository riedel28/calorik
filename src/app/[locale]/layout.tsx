import * as React from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
  createTheme,
  Container,
} from '@mantine/core';

import '@mantine/core/styles.css';

import { UserDataProvider } from '@/context/UserDataContext';
import Header from '@/components/Header/Header';
import { routing } from '@/i18n/routing';

const theme = createTheme({
  defaultRadius: 'md',
  primaryColor: 'indigo',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Calorik',
  description: 'Calculate your daily caloric needs',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider theme={theme}>
            <AppShell
              padding="md"
              header={{ height: 60 }}
              footer={{ height: 80 }}
            >
              <AppShellHeader p="md">
                <Header />
              </AppShellHeader>
              <AppShellMain>
                <Container size="xl">
                  <UserDataProvider>{children}</UserDataProvider>
                </Container>
              </AppShellMain>
            </AppShell>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
