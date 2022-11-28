import React from "react";
import { Layout, Divider, Avatar, Dropdown, Image } from "antd";
import { DownOutlined } from "@ant-design/icons";
import HamburgerMenu from "./HamburgerMenu";
import ProfileMenu from "./ProfileMenu";
import moment from "moment";
import "./index.css";
import pro3 from "assets/images/user (2).png";

const { Header } = Layout;
const NavBar = () => {
  const username = localStorage.getItem("username");
  console.log("username ", username);
  return (
    <div>
      <Header className="app-header">
        <HamburgerMenu />
        <div className="user-actions">
          <span>
            {/* {`Системийн огноо: ${moment().format("M.D.YYYY")}`} */}
            {`Системийн огноо: ${moment().format("M.D.YYYY")}`}
          </span>
          <Divider type="vertical" />

          {/* <ThemeSwitcher /> */}

          <Divider type="vertical" />
          <Dropdown overlay={<ProfileMenu />} trigger={["click", "hover"]}>
            <span
              style={{
                userSelect: "none",
                cursor: "pointer",
                background: "#fff",
                height: "100%",
                display: "inline-block",
                padding: "0 5px",
              }}
            >
              <Avatar
                shape="circle"
                icon={
                  <Image
                    preview={false}
                    alt=""
                    src={pro3}
                    height={30}
                    width={30}
                  />
                }
                style={{ marginRight: 5 }}
              />
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {username ?? "Admin"}
              </span>
              <DownOutlined style={{ marginLeft: 15 }} />
            </span>
          </Dropdown>
        </div>
      </Header>
    </div>
  );
};

export default NavBar;
