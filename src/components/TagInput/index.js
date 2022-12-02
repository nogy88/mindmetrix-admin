import React, { useEffect, useState } from "react";
import { Select } from "antd";

const TagInput = ({ selected, setSelected, dtsrc, props }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    dtsrc.map((el) =>
      setOptions((options) => [
        ...options,
        {
          value: el.val,
          label: el.txt,
        },
      ])
    );
  }, [dtsrc]);

  // const [state, setState] = useState([]);

  // useEffect(() => {
  //   if (selected) {
  //     selected.map((el) => setState((state) => [...state, el.txt]));
  //   }
  // }, [selected]);

  return (
    <Select
      mode="multiple"
      showArrow
      value={selected}
      style={{ width: "100%" }}
      options={options}
      onChange={(value) => {
        // let newTags = [];
        // value.map((el) => newTags.push(el));
        setSelected(value);
      }}
      {...props}
    />
  );
};

export default TagInput;
