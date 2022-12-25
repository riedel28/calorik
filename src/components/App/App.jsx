import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppShell,
  Container,
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';

import { UserDataProvider } from 'context/UserDataContext';
import Header from 'components/Header/Header';
import PersonalDataForm from 'components/PersonalDataForm/PersonalDataForm';
import Result from 'components/Result/Result';

import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  const { i18n } = useTranslation(['translation']);

  const [colorScheme, setColorScheme] = useState('light');

  const [persistedLang, setPersistedLang] = useLocalStorage(
    'calorikLang',
    'en'
  );
  const [selectedLanguage, setLanguage] = useState(() => persistedLang || 'en');

  const handleToggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={handleToggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontSizes: {
            xs: 14,
            sm: 14,
            md: 14,
            lg: 14,
            xl: 14,
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <UserDataProvider>
          <AppShell
            header={
              <Header
                onLanguageSelect={changeLanguage}
                language={selectedLanguage}
              />
            }
            footer={<Result />}
          >
            <Container size="lg">
              <PersonalDataForm />
            </Container>
          </AppShell>
        </UserDataProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
