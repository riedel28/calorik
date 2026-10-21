import { Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

const manrope = Manrope({
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  variable: '--font-manrope',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} min-h-screen bg-background font-sans antialiased`}>
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
