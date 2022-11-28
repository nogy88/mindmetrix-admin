import React from "react";

import { Form, Input, DatePicker, Select, TreeSelect } from "antd";
const { Option } = Select;
export const EditCell = ({
  editing,
  dataIndex,
  title,
  fieldType,
  options = [
    { val: true, txt: "Идэвхитэй" },
    { val: false, txt: "Идэвхигүй" },
  ],
  children,
  value,
  required = true,
  onLoadData,
  ...restProps
}) => {
  // fieldType === "checkbox" ? (
  //   <Checkbox
  //     defaultChecked={value}
  //   />
  // ) :
  const inputNode =
    fieldType === "number" ? (
      <Input type="number" />
    ) : fieldType === "date" ? (
      <DatePicker />
    ) : fieldType === "select" ? (
      <Select style={{ width: "100%" }} placeholder="Сонгоно уу!" allowClear>
        {options.map((row) => (
          <Option key={row.val} value={row.val}>{`${row.txt}`}</Option>
        ))}
      </Select>
    ) : fieldType === "treeselect" ? (
      <TreeSelect
        allowClear
        treeDataSimpleMode
        style={{ width: "100%" }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Сонгоно уу!"
        loadData={onLoadData}
        treeData={options}
        {...restProps}
      />
    ) : (
      <Input />
    );

  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={
            required
              ? [
                  {
                    required: true,
                    message: `${title} хоосон байна!`,
                  },
                ]
              : []
          }
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
