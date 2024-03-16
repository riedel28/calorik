import * as React from 'react';
import type { Metadata } from 'next';

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

const theme = createTheme({
  defaultRadius: 'md',
  primaryColor: 'indigo',
});

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
