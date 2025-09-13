'use client';

import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <header>
      <Group gap="md" justify="end">
        <LanguageSwitcher />
        <ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
          {isDark ? <FiMoon /> : <FiSun />}
        </ActionIcon>
      </Group>
    </header>
  );
};

export default Header;
