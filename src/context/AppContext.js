import React, { useState, createContext, useContext } from "react";
import { message } from "antd";

const AppContext = createContext();

export const AppStore = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [statusCode, setStatusCode] = useState(200);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const logout = async () => {
    localStorage.removeItem("data");
    console.log("LOGOUT");
    message.info("Системээс гарлаа.");
  };

  return (
    <AppContext.Provider
      value={{ collapsed, toggleCollapsed, statusCode, setStatusCode, logout }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const App = () => useContext(AppContext);
