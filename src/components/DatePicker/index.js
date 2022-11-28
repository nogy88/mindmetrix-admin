import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const CustomDatePicker = ({ value, ...props }) => {
  const dateValue = value ? moment(value) : null;
  return (
    <DatePicker
      picker={"date"}
      style={{ width: "100%" }}
      value={dateValue}
      {...props}
    />
  );
};

export default CustomDatePicker;
