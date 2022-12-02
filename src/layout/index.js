import React, { useEffect } from "react";
import { Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { App } from "context/AppContext";
import { MenuLogo } from "components";
import NavBar from "./navbar";
import SiderMenu from "./sidebar";
import AppFooter from "./footer";
import Content from "./content";
import bigLogoPath from "assets/images/logo.png";
import smallLogoPath from "assets/images/logosmall.svg";

const { Sider } = Layout;

function AppLayout() {
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = App();
  const user = localStorage.getItem("data");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user) {
      // message.info("Таны токены хугацаа дууссан байна. Та дахин нэвтэрнэ үү!");
      navigate("/login");
      console.log("...........REFRESHING...........");
      // message.info("Системээс гарлаа.");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LoadingBar color="#1890ff" shadow={true} height="3px" />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          toggleCollapsed();
        }}
        width={260}
      >
        <Link to="/" target="_top">
          <MenuLogo
            src={!collapsed ? bigLogoPath : smallLogoPath}
            style={{
              padding: !collapsed ? "20px 25px" : "10px 20px",
              width: "100%",
            }}
          />
        </Link>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavBar />
        <Content />
        <AppFooter />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
