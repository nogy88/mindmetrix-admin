import React from "react";
import { Button } from "antd";

const CustomButton = ({ btntext = "Хадгалах", styles, ...props }) => {
  return (
    <Button type="primary" style={{ right: 0, ...styles }} {...props}>
      {btntext}
    </Button>
  );
};

export default CustomButton;
