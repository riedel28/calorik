import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Group,
  Header as MantineHeader,
  Button,
  useMantineColorScheme,
} from '@mantine/core';
import { FiMoon, FiSun } from 'react-icons/fi';

import useLocalStorage from 'hooks/useLocalStorage';

const languages = ['en', 'ru', 'de'];

const Header = ({ onLanguageSelect, language, ...props }) => {
  const { i18n } = useTranslation(['translation']);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

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
    <MantineHeader height={56} p="xs" {...props}>
      <Group position="right" spacing="xs">
        {languages.map((lang) => (
          <Button
            key={lang}
            size="xs"
            color="indigo"
            variant={selectedLanguage === lang ? 'light' : 'subtle'}
            onClick={() => changeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
        <ActionIcon color="indigo" onClick={() => toggleColorScheme()}>
          {isDark ? <FiMoon /> : <FiSun />}
        </ActionIcon>
      </Group>
    </MantineHeader>
  );
};

export default Header;
