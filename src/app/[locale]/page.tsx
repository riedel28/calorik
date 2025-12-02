import { setRequestLocale } from 'next-intl/server';
import PersonalDataForm from '@/app/[locale]/components/personal-data-form/personal-data-form';

import Result from '@/app/[locale]/components/result/result';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="space-y-10 md:space-y-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <PersonalDataForm />
        <Result />
      </div>
    </div>
  );
}
