'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { FiMoon, FiSun } from 'react-icons/fi';
import {
  ActionIcon,
  Group,
  Button,
  useMantineColorScheme,
} from '@mantine/core';

// import useLocalStorage from '../../hooks/useLocalStorage';

const languages = ['en', 'ru', 'de'];

const Header = ({ ...props }) => {
  const params = useParams();
  const router = useRouter();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // const [persistedLang, setPersistedLang] = useLocalStorage(
  //   'calorikLang',
  //   'en',
  // );
  // const [selectedLanguage, setLanguage] = useState(() => persistedLang || 'en');

  // useEffect(() => {
  //   if (!persistedLang) {
  //     return;
  //   }

  //   // i18n.changeLanguage(persistedLang);
  // }, [persistedLang, i18n]);

  // const handleChangeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   setLanguage(lang);
  //   setPersistedLang(lang);
  // };

  return (
    <header>
      <Group gap="md" justify="end">
        {languages.map((lang) => (
          <Button
            key={lang}
            size="xs"
            variant={params.lang === lang ? 'light' : 'subtle'}
            onClick={() => router.push(`/${lang}`)}
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
