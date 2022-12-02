import React from "react";
import { Radio } from "antd";

const CustomRadioGroup = ({
  value,
  onChange,
  styles,
  dtsrc = [
    { val: true, txt: "Тийм" },
    { val: false, txt: "Үгүй" },
  ],
  ...props
}) => {
  const btnWidth = 100 / dtsrc.length || 100;
  return (
    <Radio.Group
      onChange={(e) => onChange(e.target.value)}
      value={value}
      {...props}
      style={{ width: "100%", textAlign: "center", ...styles }}
      buttonStyle="solid"
    >
      {dtsrc
        ? dtsrc.map((row) => (
            <Radio.Button
              key={row.val}
              value={row.val}
              style={{ width: `${btnWidth}%` }}
            >{`${row.txt}`}</Radio.Button>
          ))
        : null}
    </Radio.Group>
  );
};

export default CustomRadioGroup;
