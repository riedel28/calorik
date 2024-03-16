import * as React from 'react';

import { UserDataProvider } from '@/context/UserDataContext';
import Result from '@/components/Result/Result';
import PersonalDataForm from '@/components/PersonalDataForm/PersonalDataForm';
import { getDictionary } from './dictionaries';

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang); // en

  return (
    <UserDataProvider>
      <PersonalDataForm dict={dict} />
      <Result dict={dict} />
    </UserDataProvider>
  );
}
