import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme={
        JSON.parse(localStorage.getItem("darkMode")) ? "dark" : "light"
      }
    >
      <App />
    </ThemeSwitcherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
