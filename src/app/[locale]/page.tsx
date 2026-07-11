import { getTranslations, setRequestLocale } from 'next-intl/server';

import ProjectionForm from '@/app/[locale]/components/projection-form/projection-form';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'page' });

  return (
    <div className="space-y-6 md:space-y-6">
      <div className="animate-fade-up space-y-2">
        <h1 className="font-display font-semibold text-2xl text-foreground tracking-tight md:text-3xl">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">{t('subtitle')}</p>
      </div>
      <ProjectionForm />
    </div>
  );
}
