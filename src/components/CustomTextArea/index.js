import React from "react";
import { Input } from "antd";
const { TextArea } = Input;
const CustomTextArea = ({ rows = 2, ...props }) => {
  return <TextArea rows={rows} {...props} />;
};

export default CustomTextArea;
