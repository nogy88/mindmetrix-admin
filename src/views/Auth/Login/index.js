import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { authRequest } from "api";
import { auth } from "api/endpoints";
import bigLogoPath from "assets/images/logofull.svg";

import AuthWrapper from "../AuthWrapper";

import { Row, Input, Form, Button, message, Checkbox, Space } from "antd";
import MenuLogo from "components/MenuLogo";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const login = async (btoaAuth) => {
    setLoading(true);
    await authRequest(auth.signin, btoaAuth)
      .then(async (res) => {
        const data = await res.data;
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/");
        message.success("Амжилттай нэвтэрлээ.");
        // message.success(
        //   `Сайн байна уу? ${
        //     JSON.parse(localStorage.getItem("data"))["username"]
        //   }`
        // );
      })
      .catch((err) => {
        message.error("Нүүц үг эсвэл нэвтрэх нэр буруу байна.");
      })
      .finally(() => {
        setLoading(false);
      });
    navigate("/");
  };

  const onFinish = async (values) => {
    if (values.remember) {
      localStorage.setItem("username", values.username);
      localStorage.setItem("remember", values.remember);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("remember");
    }

    const { username, password } = values;
    // const btoaAuth = window.btoa(username + ":" + password);
    var btoaAuth = window.btoa(
      unescape(encodeURIComponent(username + ":" + password))
    );

    try {
      await login(btoaAuth);
    } catch (error) {
      message.error(error.Message);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      navigate("/");
    } else {
      form.resetFields();
      const userName = localStorage.getItem("username");
      const remember = localStorage.getItem("remember");
      if (userName && remember) {
        form.setFieldsValue({ username: userName });
      }
      form.setFieldsValue({ remember: remember });
    } // eslint-disable-next-line
  }, []);
  return (
    <Row className="App">
      <AuthWrapper>
        <Row
          style={{
            backgroundColor: "#fff", //233044
            padding: "30px",
            borderRadius: "30px",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            border: "solid 3px #EEF3FE",
          }}
        >
          <Form
            onFinish={onFinish}
            style={{ width: "300px" }}
            size="large"
            form={form}
          >
            {/* <Form.Item style={{ textAlign: "center" }}>
              <Image
                src={logoSrc}
                style={{ padding: "0 20px" }}
                preview={false}
              />
            </Form.Item> */}

            <MenuLogo src={bigLogoPath} style={{ marginBottom: "30px" }} />

            <Form.Item
              name="username"
              hasFeedback
              rules={[{ required: true, message: "Нэвтрэх нэрээ оруулна уу!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Нэвтрэх нэр" />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="password"
              rules={[{ required: true, message: "Нууц үгээ оруулна уу!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Нууц үг" />
            </Form.Item>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Намайг сана</Checkbox>
              </Form.Item>
              <Form.Item name="password-reset">
                <Link to="/forgot-password">Нууц үг сэргээх</Link>
              </Form.Item>
            </Space>
            <Form.Item style={{ margin: "0" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  padding: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? <LoadingOutlined /> : <div>Нэвтрэх</div>}
              </Button>
            </Form.Item>
            {/* <div>dasd</div> */}
          </Form>
        </Row>
      </AuthWrapper>
    </Row>
  );
};

export default LoginPage;
