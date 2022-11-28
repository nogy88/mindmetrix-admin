import React from "react";
import { Image } from "antd";

const MenuLogo = ({ src, ...props }) => (
  <Image preview={false} alt="" {...props} src={src} />
);

export default MenuLogo;
