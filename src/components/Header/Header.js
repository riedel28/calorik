import React, { useState } from "react";
import { Menu, Divider } from "semantic-ui-react";

const locales = ["en", "ru", "de"];

const Header = ({ onLanguageSelect, language }) => {
  const [activeItem, setActiveItem] = useState(language);

  return (
    <>
      <header>
        <Menu text secondary style={{ margin: "5px 0px" }}>
          <Menu.Menu position="right">
            {locales.map((locale) => (
              <Menu.Item
                key={locale}
                active={activeItem === locale}
                onClick={() => {
                  setActiveItem(locale);
                  onLanguageSelect(locale);
                }}
              >
                {locale.toUpperCase()}
              </Menu.Item>
            ))}
          </Menu.Menu>
        </Menu>
      </header>
      <Divider />
    </>
  );
};

export default Header;
