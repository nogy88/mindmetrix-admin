import { Layout, Row, Col } from "antd";
import { MenuLogo } from "components";
import bigLogoPath from "assets/images/logo.png";
import logoSmall from "assets/images/logoSmall.png";

const AuthWrapper = ({ children }) => (
  <Layout
    style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <MenuLogo
      src={bigLogoPath}
      style={{
        position: "absolute",
        left: "150px",
        height: "45px",
      }}
    />

    <img
      alt=""
      src={logoSmall}
      style={{
        height: "500px",
        objectFit: "contain",
        position: "absolute",
        bottom: "-10px",
        right: "-110px",
      }}
      height="45px"
    />

    <Row
      justify="space-between"
      align="middle"
      style={{
        width: "100%",
        height: "50px",
        position: "absolute",
        bottom: "0",
        left: "0",
        padding: "0 40px",
        bg: "#fff",
        border: "2px solid #EEF3FE",
        backgroundColor: "#fff",
        zIndex: "1",
      }}
    >
      <Row align="middle">
        <Col style={{ fontSize: "14px", fontWeight: "500" }}>
          All rights reserved © Optimal N Max LLC
        </Col>
      </Row>
      <Col style={{ fontSize: "14px", fontWeight: "500" }}>
        Powered by{" "}
        <a target="_blank" rel="noreferrer" href="https://tanasoft.mn/">
          Tanasoft
        </a>{" "}
        {new Date().getFullYear()}
      </Col>
    </Row>
    <Row justify="center" align="middle">
      <Col>{children}</Col>
    </Row>
  </Layout>
);

export default AuthWrapper;
