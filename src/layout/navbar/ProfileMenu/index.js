import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Modal, message } from "antd";
import {
  PoweroffOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
} from "@ant-design/icons";

import "./style.css";
// import { Auth } from "context/AuthContext";

// import { app } from "api/endpoints";

const logoutMenuStyle = {
  background: "#7a8994",
  color: "#fff",
  margin: 0,
  padding: 0,
};

const menuContainerStyle = {
  position: "relative",
  display: "block",
  height: "100%",
  boxShadow: "1px 6px 5px #ccc",
  color: "#7a8994",
};

const ProfileMenu = () => {
  const navigate = useNavigate();
  // const { logout } = Auth();

  const logout = async () => {
    localStorage.removeItem("data");
    message.info("Системээс гарлаа.");
  };

  const onLogout = (history) => {
    const logoutModal = Modal.confirm({
      title: "Системээс гарах",
      content: "Та системээс гарах бол ОК товчыг дарна уу!",
      okText: "ОК",
      cancelText: "Цуцлах",
      icon: <LogoutOutlined />,
      onCancel: () => {},
      onOk: async () => {
        logoutModal.update({
          okButtonProps: { disabled: true },
          cancelButtonProps: { disabled: true },
        });
        logout();
        navigate("/login");
      },
    });
  };

  return (
    <div style={menuContainerStyle}>
      <span className="arrow-top" />
      <Menu style={{ paddingBottom: 0, marginBottom: 0, position: "relative" }}>
        <Menu.Item key={"profile"} icon={<UserOutlined />}>
          {/* <Link to={app.profile}>{"Профайл"}</Link> */}
          Профайл
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={"password"} icon={<LockOutlined />}>
          {/* <Link to={app.password}>{"Нууц үг солих"}</Link> */}
          Нууц үг солих
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="logout"
          onClick={() => {
            onLogout(navigate);
          }}
          style={logoutMenuStyle}
        >
          <span className="logout-btn">
            {"Гарах"}
            <PoweroffOutlined />
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
