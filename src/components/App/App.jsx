import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppShell,
  Container,
  MantineProvider,
  createTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';
import Header from '@components/Header/Header';
import PersonalDataForm from '@components/PersonalDataForm/PersonalDataForm';
import Result from '@components/Result/Result';
import { UserDataProvider } from '@context/UserDataContext';
import useLocalStorage from '@hooks/useLocalStorage';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const App = () => {
  const { i18n } = useTranslation(['translation']);

  const [persistedLang, setPersistedLang] = useLocalStorage(
    'calorikLang',
    'en'
  );
  const [selectedLanguage, setLanguage] = useState(() => persistedLang || 'en');

  useEffect(() => {
    if (!persistedLang) {
      return;
    }

    i18n.changeLanguage(persistedLang);
  }, [persistedLang, i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setPersistedLang(lang);
  };

  return (
    <MantineProvider theme={theme}>
      <UserDataProvider>
        <AppShell padding="md" header={{ height: 60 }} footer={{ height: 60 }}>
          <AppShell.Header height={56} p="md">
            <Header />
          </AppShell.Header>
          <AppShell.Main>
            <Container size="lg">
              <PersonalDataForm />
            </Container>
          </AppShell.Main>
          <AppShell.Footer p="md">
            <Result />
          </AppShell.Footer>
        </AppShell>
      </UserDataProvider>
    </MantineProvider>
  );
};

export default App;
