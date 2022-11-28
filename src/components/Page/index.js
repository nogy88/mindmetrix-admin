import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Layout, Button } from "antd";
import { AntdIcon } from "components";

const { Content } = Layout;
const Page = ({ children, breadcrumb, ...props }) => {
  return (
    <div style={{ height: "100%", paddingBottom: "40px" }}>
      {breadcrumb && (
        <Breadcrumb
          style={{ margin: "16px 10px" }}
          separator={AntdIcon("CaretRightOutlined")}
        >
          <Breadcrumb.Item>
            <Link to={"/"}>
              <Button icon={AntdIcon("HomeFilled")} type="link" />
            </Link>
          </Breadcrumb.Item>
          {breadcrumb.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                {item.href ? (
                  <Link to={item.href}>
                    <Button icon={AntdIcon(item.icon)} type="link">
                      {item.text}
                    </Button>
                  </Link>
                ) : (
                  <Button icon={AntdIcon(item.icon)} disabled>
                    {item.text}
                  </Button>
                )}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )}
      <Content
        style={{ padding: "20px", minHeight: "280px", backgroundColor: "#fff" }}
      >
        {children}
      </Content>
    </div>
  );
};

export default Page;
