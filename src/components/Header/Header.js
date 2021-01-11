import React, { useState } from "react";
import { Menu, Divider } from "semantic-ui-react";

const locales = ["En", "Ru", "De"];

const Header = () => {
  const [activeItem, setActiveItem] = useState("En");

  return (
    <>
      <header>
        <Menu text secondary style={{ margin: "5px 0px" }}>
          <Menu.Menu position="right">
            {locales.map((l) => (
              <Menu.Item
                key={l}
                active={activeItem === l}
                onClick={() => setActiveItem(l)}
              >
                {l}
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
