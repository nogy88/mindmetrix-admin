import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, message } from "antd";
import { menuData } from "./menuData";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AntdIcon from "components/AntdIcon";

const items = [
  { key: "1", label: "Invoices", path: "/admin/invoices" },
  { key: "2", label: "Service Details", path: "/admin/service-details" },
  {
    key: "3",
    label: "Service Contract Details",
    path: "/admin/service-contract-details",
  },
  { key: "4", label: "Cost Centers", path: "/admin/cost-centers" },
  { key: "5", label: "Clients", path: "/admin/clients" },
  { key: "6", label: "Vendors", path: "/admin/vendors" },
];

// const items2 = menuData.map((el, index) => {
//   return {
//     key: el.title,
//     icon: CustomAntdIcon(el.icon, el.color),
//     label: el.title,
//     children: el.subMenu.map((submenu, j) => {
//       return {
//         key: submenu.link,
//         label: submenu.title,
//       };
//     }),
//   };
// });

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

function SiderMenu() {
  let location = useLocation();

  const [selectKeysData, setSelectKeysData] = useState();

  const [openKey, setOpenKey] = useState();

  useEffect(() => {
    setSelectKeysData(location.pathname);
    // menuData.find(el => el.key === item.key)
    for (var i = 0; i < menuData.length; i++) {
      for (var j = 0; j < menuData[i].subMenu.length; j++) {
        if (location.pathname === menuData[i].subMenu[j].link) {
          setOpenKey(menuData[i].title);
          // message.info(location.pathname);
          // message.info(menuData[i].subMenu[j].link);
          // message.info(menuData[i].key);
        }
      }
    }
  }, [location.pathname]);

  // const onClickMenu = () => {
  //   // console.log("menu okey");
  //   console.log(location.pathname);

  //   // var selectedKeyData = JSON.parse(localStorage.getItem("selectData"));

  //   // localStorage.removeItem("selectData");

  //   // localStorage.setItem("selectData", location.pathname);
  //   setSelectKeysData(location.pathname);
  //   // find(_item => location.pathname.startsWith(_item.path)).key
  //   for (var i = 0; i < menuData.length; i++) {
  //     for (var j = 0; j < menuData[i].subMenu.length; j++) {
  //       if (location.pathname === menuData[i].subMenu[j]) {
  //         setOpenKey(menuData[i].key);
  //       }
  //     }
  //   }
  //   // setOpenKey()
  // };

  return (
    <Menu theme="light" mode="inline" defaultOpenKeys={[1]}>
      {menuData &&
        menuData.map((m, index) => {
          return (
            <Menu.SubMenu
              key={index}
              icon={AntdIcon(m.icon, m.color)}
              title={
                <span style={{ color: m.color, fontSize: "16px" }}>
                  {m.title}
                </span>
              }
              style={{ backgroundColor: "#fff" }}
            >
              {m.subMenu &&
                m.subMenu.map((sub, k) => (
                  <Menu.Item
                    key={sub.link}
                    icon={AntdIcon(sub.icon, m.color)}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <Link to={sub.link}>
                      {
                        <span
                          style={{
                            color: sub.color ?? m.color,
                            fontSize: "16px",
                          }}
                        >
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
