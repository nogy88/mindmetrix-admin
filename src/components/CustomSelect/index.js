import React from "react";
import { Select } from "antd";

const { Option } = Select;

const CustomSelect = ({
  value,
  readOnly = false,
  dtsrc = [],
  defaultValue,
  ...props
}) => {
  const pointEvent = readOnly ? { pointerEvents: "none" } : {};

  return (
    <Select
      defaultValue={defaultValue}
      showSearch
      showArrow={!readOnly}
      style={{ width: "100%", ...pointEvent }}
      placeholder="Сонгоно уу!"
      optionFilterProp="children"
      // value={typeof value === "number" ? value.toString() : value}
      value={value}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      {...props}
      allowClear
    >
      {dtsrc
        ? dtsrc.map((row) => (
            <Option
              key={row.val}
              // value={typeof row.val === "number" ? row.val.toString() : row.val}
              value={row.val}
            >{`${row.txt}`}</Option>
          ))
        : null}
    </Select>
  );
};
export default CustomSelect;
