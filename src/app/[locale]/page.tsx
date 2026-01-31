import { setRequestLocale } from 'next-intl/server';

import ProjectionForm from '@/app/[locale]/components/projection-form/projection-form';
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
      <ProjectionForm />
    </div>
  );
}
