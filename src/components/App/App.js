import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Header from 'components/Header/Header';
import PersonalDataForm from 'components/PersonalDataForm/PersonalDataForm';
import Result from 'components/Result/Result';

import ThemeProvider from 'ThemeProvider';
import { UserDataProvider } from 'context/UserDataContext';
import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  const [persistedLang, setPersistedLang] = useLocalStorage(
    'calorikLang',
    'en'
  );
  const [language, setLanguage] = useState(() => persistedLang || 'en');
  const { i18n } = useTranslation(['translation']);

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
    <ThemeProvider>
      <UserDataProvider>
        <Header language={language} onLanguageSelect={changeLanguage} />
        <PersonalDataForm />
        <Result />
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default App;
