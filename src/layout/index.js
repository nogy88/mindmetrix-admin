import React, { useEffect } from "react";
import { Layout } from "antd";
import NavBar from "./navbar";
import SiderMenu from "./sidebar";
import AppFooter from "./footer";
import { useNavigate } from "react-router-dom";
import { App } from "context/AppContext";
import { Link } from "react-router-dom";
import Content from "./content";
import { auth } from "api/endpoints";
import MenuLogo from "components/MenuLogo";
import bigLogoPath from "assets/images/logofull.svg";
import smallLogoPath from "assets/images/logosmall.svg";

// import { AppStore } from "context/AppContext";
// import { auth } from "api/endpoints";

const { Sider } = Layout;

function AppLayout() {
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = App();

  useEffect(() => {
    const user = localStorage.getItem("data");
    if (!user) {
      navigate("/login");
    }
    // const updateInfo = localStorage.getItem("updateInfo");
    // if (!updateInfo) {
    //   localStorage.setItem("updateInfo", "show");
    // }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     // message.info("Таны токены хугацаа дууссан байна. Та дахин нэвтэрнэ үү!");
  //     navigate(auth.login);
  //     // message.info("Системээс гарлаа.");
  //   }
  //   // eslint-disable-next-line
  // }, [user]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <LoadingBar color="#1890ff" shadow={true} height="3px" /> */}
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={() => {
          toggleCollapsed();
        }}
        width={260}
        style={{
          // background: "linear-gradient(to right, #3B4252, #5E81AC)",
          backgroundColor: "#fff",
          borderRight: "solid 3px #EEF3FE",
        }}
      >
        <Link to="/" target="_top">
          {/* <MenuLogo
           src={!collapsed ? bigLogoPath : smallLogoPath}
            style={{ padding: "20px 40px" }}
          />  */}
          <MenuLogo
            src={!collapsed ? bigLogoPath : smallLogoPath}
            style={{ padding: !collapsed ? "20px 25px" : "10px 20px" }}
          />
        </Link>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavBar />
        <Content />
        <AppFooter />
      </Layout>
      {/* <UpdateInfoModal /> */}
    </Layout>
  );
}

export default AppLayout;
