import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", fontWeight: "500" }}>
      <div style={{ fontSize: "14px", fontWeight: "500" }}>
        Powered by{" "}
        <a target="_blank" rel="noreferrer" href="https://tanasoft.mn/">
          Tanasoft
        </a>{" "}
        {new Date().getFullYear()}
      </div>
    </Footer>
  );
};

export default AppFooter;
