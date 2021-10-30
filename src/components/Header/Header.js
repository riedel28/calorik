import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useColorMode } from 'theme-ui';

const locales = ['en', 'ru', 'de'];

const Header = ({ onLanguageSelect, language }) => {
  const [activeItem, setActiveItem] = useState(language);
  const [colorMode, setColorMode] = useColorMode();

  const handleChangeLanguage = (locale) => {
    setActiveItem(locale);
    onLanguageSelect(locale);
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: 2,
      }}
    >
      <Flex p={2}>
        <Flex w={1 / 3} ml="auto">
          {locales.map((locale) => (
            <Text
              key={locale}
              active={activeItem === locale}
              onClick={() => handleChangeLanguage(locale)}
              mr={1}
              sx={{
                px: 2,
                py: 1,
                textDecoration: 'none',
                fontWeight: activeItem === locale ? 'bold' : 'normal',
                ':hover': {
                  cursor: 'pointer',
                  color: '#333eee',
                },
              }}
            >
              {locale.toUpperCase()}
            </Text>
          ))}
          <Text
            onClick={() => {
              setColorMode(colorMode === 'default' ? 'dark' : 'default');
            }}
            sx={{
              px: 2,
              py: 1,
              marginLeft: 2,
              textDecoration: 'none',
              ':hover': {
                cursor: 'pointer',
              },
            }}
          >
            <Text
              sx={{
                ':hover': {
                  cursor: 'pointer',
                  color: '#333eee',
                },
              }}
            >
              {colorMode === 'default' ? <FiMoon /> : <FiSun />}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
