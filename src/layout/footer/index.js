import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", fontWeight: "500" }}>
      <a target="_blank" rel="noreferrer" href="https://tanasoft.mn/">
        Tanasoft
      </a>{" "}
      ©{new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
