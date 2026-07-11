import { Onest } from 'next/font/google';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

const onest = Onest({
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  variable: '--font-onest',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${onest.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
