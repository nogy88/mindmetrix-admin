import React from "react";
import { Typography } from "antd";

const FormHeader = ({ title = "Жагсаалт", styles }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography
        style={{
          fontSize: "18px",
          fontWeight: "500",
          paddingBottom: "20px",
          alignSelf: "center",
          ...styles,
        }}
      >
        {title}
      </Typography>
    </div>
  );
};

export default FormHeader;
