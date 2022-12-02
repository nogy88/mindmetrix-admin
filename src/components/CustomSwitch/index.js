import React from "react";
import { Switch } from "antd";

const CustomSwitch = ({ dtsrc = ["Идэвхитэй", "Идэвхигүй"], ...props }) => {
  return (
    <Switch
      checkedChildren={dtsrc[0]}
      unCheckedChildren={dtsrc[1]}
      defaultChecked
      {...props}
    />
  );
};

export default CustomSwitch;
