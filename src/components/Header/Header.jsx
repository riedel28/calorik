'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMoon, FiSun } from 'react-icons/fi';
import {
  ActionIcon,
  Group,
  Button,
  useMantineColorScheme,
} from '@mantine/core';

import useLocalStorage from '../../hooks/useLocalStorage';

const languages = ['en', 'ru', 'de'];

const Header = ({ onLanguageSelect, language, ...props }) => {
  const { i18n } = useTranslation(['translation']);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [persistedLang, setPersistedLang] = useLocalStorage(
    'calorikLang',
    'en',
  );
  const [selectedLanguage, setLanguage] = useState(() => persistedLang || 'en');

  useEffect(() => {
    if (!persistedLang) {
      return;
    }

    // i18n.changeLanguage(persistedLang);
  }, [persistedLang, i18n]);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setPersistedLang(lang);
  };

  return (
    <header {...props}>
      <Group gap="md" justify="end">
        {languages.map((lang) => (
          <Button
            key={lang}
            size="xs"
            variant={selectedLanguage === lang ? 'light' : 'subtle'}
            onClick={() => handleChangeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
        <ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
          {isDark ? <FiMoon /> : <FiSun />}
        </ActionIcon>
      </Group>
    </header>
  );
};

export default Header;
