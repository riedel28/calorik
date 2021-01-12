import React, { useState } from "react";
import { Menu, Divider } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const locales = ["En", "Ru", "De"];

const Header = () => {
  const [activeItem, setActiveItem] = useState("En");

  const { i18n } = useTranslation(["translation", "welcome"]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

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
                  changeLanguage(locale.toLowerCase());
                }}
              >
                {locale}
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
