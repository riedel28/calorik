import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  AppShell,
  Button,
  Grid,
  Group,
  Header,
  NumberInput,
  RadioGroup,
  Radio,
  Title,
  Text,
  Stack,
  Footer,
} from '@mantine/core';
import { FiMoon, FiSun } from 'react-icons/fi';
// import Header from 'components/Header/Header';
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
    <AppShell
      header={
        <Header height={48} p="sm">
          <Group position="right">
            <Text component="span">EN</Text>
            <Text component="span">RU</Text>
            <Text component="span">DE</Text>
            <ActionIcon>
              <FiMoon />
            </ActionIcon>
          </Group>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
    >
      <Grid
        style={{
          marginBottom: '2rem',
        }}
      >
        <Grid.Col
          sm={6}
          md={3}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title
            order={2}
            style={{
              marginBottom: '1rem',
            }}
          >
            Your data
          </Title>
          <Stack>
            <RadioGroup label="Gender" color="indigo" required>
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
            </RadioGroup>
            <NumberInput
              defaultValue={30}
              label="Age"
              required
              style={{
                maxWidth: 120,
              }}
            />
            <NumberInput
              defaultValue={180}
              label="Height"
              required
              style={{
                maxWidth: 120,
              }}
            />
            <NumberInput
              defaultValue={85}
              label="Weight"
              required
              style={{
                maxWidth: 120,
              }}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col
          sm={6}
          md={3}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title order={2}>Activity level</Title>
        </Grid.Col>
        <Grid.Col
          sm={6}
          md={3}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title order={2}>Your goal</Title>
        </Grid.Col>
        <Grid.Col
          sm={6}
          md={3}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Title order={2}>Formula</Title>
        </Grid.Col>
      </Grid>
      <Group position="center">
        <Button color="indigo" size="xl">
          Calculate
        </Button>
      </Group>
    </AppShell>
  );

  // return (
  //   <ThemeProvider>
  //     <UserDataProvider>
  //       <Header language={language} onLanguageSelect={changeLanguage} />
  //       <PersonalDataForm />
  //       <Result />
  //     </UserDataProvider>
  //   </ThemeProvider>
  // );
};

export default App;
