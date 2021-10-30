import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Header from 'components/Header/Header';
import PersonalDataForm from 'components/PersonalDataForm/PersonalDataForm';
import Result from 'components/Result/Result';

import ThemeProvider from 'ThemeProvider';
import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  const [userData, setUserData] = useState({});
  const [persistedLang, setPersistedLang] = useLocalStorage(
    'calorikLang',
    'en'
  );
  const [language, setLanguage] = useState(() => persistedLang || 'en');
  const { i18n } = useTranslation(['translation']);

  useEffect(() => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [userData]);

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
      <Header language={language} onLanguageSelect={changeLanguage} />
      <PersonalDataForm onSubmitData={setUserData} />
      <Result data={userData} />
    </ThemeProvider>
  );
};

export default App;
