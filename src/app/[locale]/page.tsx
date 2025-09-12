import * as React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import Result from '@/components/Result/Result';
import PersonalDataForm from '@/components/PersonalDataForm/PersonalDataForm';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <>
      <PersonalDataForm />
      <Result />
    </>
  );
}
