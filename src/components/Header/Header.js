import React, { useState } from "react";
import { Flex, Box, Link, Text } from "rebass";

const locales = ["en", "ru", "de"];

const Header = ({ onLanguageSelect, language }) => {
  const [activeItem, setActiveItem] = useState(language);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Flex p={3} mb={2}>
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
                px: 1,
                py: 1,
                color: "black",
                textDecoration: "none",
              }}
            >
              <Text fontWeight={activeItem === locale ? "bold" : ""}>
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
