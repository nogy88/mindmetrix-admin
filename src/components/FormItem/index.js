import React from "react";
import { Col, Form, Input } from "antd";
import CustomRadioGroup from "components/CustomRadioGroup";
import CustomTextArea from "components/CustomTextArea";
import CustomSelect from "components/CustomSelect";
import CustomNumber from "components/CustomNumber";
import CustomButton from "components/CustomButton";

// import CustomBrowse from "components/Browse";
// import TagInput from "components/TagInput";
import CustomSwitch from "components/CustomSwitch";
import CustomDatePicker from "components/DatePicker";

const FormItem = ({
  itemType,
  span = 24,
  label,
  name,
  rules,
  required = false,
  ...props
}) => {
  return (
    <Col
      span={span}
      style={itemType === "button" ? { textAlign: "right" } : {}}
    >
      <Form.Item
        label={label}
        name={name}
        rules={
          required
            ? [
                {
                  required: true,
                  message: `${label} хоосон байна!`,
                },
              ]
            : rules
            ? [
                {
                  required: true,
                  message: `${label} хоосон байна!`,
                },
                { ...rules },
              ]
            : []
        }
      >
        {(() => {
          switch (itemType) {
            case "date":
              return <CustomDatePicker {...props} />;
            case "radio":
              return <CustomRadioGroup {...props} />;
            case "switch":
              return <CustomSwitch {...props} />;
            // case "checkbox":
            // return <CustomCheckBox {...props} />;
            case "select":
              return <CustomSelect {...props} />;
            case "button":
              return <CustomButton {...props} />;
            // case "multipleSelect":
            //   return <TagInput {...props} />;
            case "textarea":
              return <CustomTextArea {...props} />;
            // case "browse":
            //   return <CustomBrowse {...props} />;
            case "number":
              return <CustomNumber {...props} />;
            case "password":
              return <Input.Password {...props} />;
            default:
              return <Input {...props} />;
          }
        })()}
      </Form.Item>
    </Col>
  );
};
export default FormItem;
