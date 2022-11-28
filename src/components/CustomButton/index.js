import React from "react";
import { Button } from "antd";

const CustomButton = ({ btntext = "Хадгалах", ...props }) => {
  return (
    <Button type="primary" style={{ right: 0 }} {...props}>
      {btntext}
    </Button>
  );
};

export default CustomButton;
