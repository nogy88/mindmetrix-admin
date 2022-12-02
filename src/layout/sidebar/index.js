import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import CustomAntdIcon from "components/AntdIcon";
import { menuData } from "./menuData";

function SiderMenu() {
  return (
    <Menu mode="inline" defaultSelectedKeys={["1"]}>
      {menuData &&
        menuData.map((m, index) => {
          return (
            <Menu.SubMenu
              key={index}
              icon={CustomAntdIcon(m.icon, m.color)}
              title={<span style={{ color: m.color }}>{m.title}</span>}
            >
              {m.subMenu &&
                m.subMenu.map((sub) => (
                  <Menu.Item
                    key={sub.title}
                    icon={CustomAntdIcon(sub.icon, sub.color ?? m.color)}
                  >
                    <Link to={sub.link}>
                      {
                        <span style={{ color: sub.color ?? m.color }}>
                          {sub.title}
                        </span>
                      }
                    </Link>
                  </Menu.Item>
                ))}
            </Menu.SubMenu>
          );
        })}
    </Menu>
  );
}

export default SiderMenu;
