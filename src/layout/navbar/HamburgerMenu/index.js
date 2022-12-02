import React from "react";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { App } from "context/AppContext";

const HamburgerMenu = () => {
  const { collapsed, toggleCollapsed } = App();
  return (
    <Button
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      type="link"
      onClick={() => toggleCollapsed()}
    />
  );
};

export default HamburgerMenu;
