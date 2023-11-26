import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppShell,
  Container,
  MantineProvider,
  createTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';
import Header from '../Header/Header';
import PersonalDataForm from '../PersonalDataForm/PersonalDataForm';
import Result from '../Result/Result';
import { UserDataProvider } from '../../context/UserDataContext';
import useLocalStorage from '../../hooks/useLocalStorage';

const theme = createTheme({
  /** Put your mantine theme override here */
  defaultRadius: 'md',
  primaryColor: 'indigo',
});

const App = () => {
  const { i18n } = useTranslation(['translation']);

  const [persistedLang] = useLocalStorage('calorikLang', 'en');

  useEffect(() => {
    if (!persistedLang) {
      return;
    }

    // i18n.changeLanguage(persistedLang);
  }, [persistedLang, i18n]);

  return (
    <MantineProvider theme={theme}>
      <UserDataProvider>
        <AppShell padding="md" header={{ height: 60 }} footer={{ height: 80 }}>
          <AppShell.Header height={56} p="md">
            <Header />
          </AppShell.Header>
          <AppShell.Main>
            <Container size="xl">
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
