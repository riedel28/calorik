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

const languages = ['en', 'ru', 'de'];

const Header = ({ ...props }) => {
  const params = useParams();
  const router = useRouter();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

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
