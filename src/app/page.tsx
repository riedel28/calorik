import { redirect } from 'next/navigation';

export default async function RootPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!locale) {
    redirect('/en');
  }

  redirect(`/${locale}`);
}
