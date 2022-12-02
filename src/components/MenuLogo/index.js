import React from "react";
import { Image } from "antd";

const MenuLogo = ({ src, style, ...props }) => (
  <img
    // preview={false}
    alt=""
    src={src}
    style={{ objectFit: "contain", ...style }}
    {...props}
  />
);

export default MenuLogo;
