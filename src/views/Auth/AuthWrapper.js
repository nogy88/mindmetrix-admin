import { Layout, Row, Col } from "antd";

const AuthWrapper = ({ children }) => (
  <Layout
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    }}
  >
    <Row justify="center" align="center" style={{ height: "100%" }}>
      <Row
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        justify="center"
        align="center"
      >
        <Col>{children}</Col>
      </Row>
    </Row>
  </Layout>
);

export default AuthWrapper;
