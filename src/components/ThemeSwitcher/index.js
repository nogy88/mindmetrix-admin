import React, { useState, useEffect } from "react";
import { CustomButton } from "components";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { SettingOutlined } from "@ant-design/icons";
import magicStick from "assets/images/magic_stick.png";

function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { switcher, themes } = useThemeSwitcher();

  const switchTheme = () => {
    setIsDarkMode(!isDarkMode);
    switcher({ theme: !isDarkMode ? themes.dark : themes.light });
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
    // <Switch
    //   checkedChildren={"🌜"}
    //   unCheckedChildren={"🌞"}
    //   checked={isDarkMode}
    //   onChange={switchTheme}
    // />
    <div
      style={{
        position: "fixed",
        bottom: 50,
        right: 30,
        zIndex: 100,
        backgroundColor: "#fff",
        borderRadius: "50px",
        height: "40px",
        width: "40px",
        boxShadow: "0px 4px 10px 5px #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={switchTheme}
    >
      <img
        alt=""
        src={magicStick}
        height="20px"
        style={{
          "&:hover": {
            background: "red",
          },
        }}
      />
    </div>
    // <SettingOutlined
    //   style={{
    //     padding: "8px",
    //     borderRadius: "8px",
    //     border: "1px solid #ccc",
    //   }}
    //   color="#000"
    //   onClick={switchTheme}
    // />
  );
}

export default ThemeSwitcher;
