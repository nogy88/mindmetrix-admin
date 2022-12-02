import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TableHeader = ({ title = "Жагсаалт", addUrl, addFunc }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 5px",
      }}
    >
      <Typography style={{ fontWeight: "500" }}>{title}</Typography>

      {(addUrl || addFunc) && (
        <Button
          size="small"
          type="primary"
          shape={"circle"}
          icon={<PlusOutlined />}
          onClick={() => {
            addFunc ? addFunc() : navigate(`${addUrl}new`);
          }}
        />
      )}
    </div>
  );
};

export default TableHeader;
