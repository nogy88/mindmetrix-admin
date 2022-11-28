import React from "react";
import { InputNumber } from "antd";
import "./index.css";
const CustomNumber = ({ value, ...props }) => {
  return (
    <InputNumber
      type="number"
      value={value}
      style={{
        width: "100%",
      }}
      placeholder="0"
      {...props}
    />
  );
};

export default CustomNumber;
