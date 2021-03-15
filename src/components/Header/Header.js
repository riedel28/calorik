import React, { useState } from 'react';
import { Flex, Box, Link, Text } from 'rebass';

const locales = ['en', 'ru', 'de'];

const Header = ({ onLanguageSelect, language }) => {
  const [activeItem, setActiveItem] = useState(language);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: 2,
      }}
    >
      <Flex p={2}>
        <Flex w={1 / 3} color="white" ml="auto">
          {locales.map((locale) => (
            <Link
              key={locale}
              href="#!"
              active={activeItem === locale}
              onClick={() => {
                setActiveItem(locale);
                onLanguageSelect(locale);
              }}
              variant="nav"
              mr={1}
              sx={{
                px: 2,
                py: 1,
                color: 'black',
                textDecoration: 'none',
                ':hover': {
                  color: '#333eee',
                  fontWeight: 'bold',
                },
              }}
            >
              <Text fontWeight={activeItem === locale ? 'bold' : ''}>
                {locale.toUpperCase()}
              </Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
