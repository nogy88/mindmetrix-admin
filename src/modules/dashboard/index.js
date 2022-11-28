import React from "react";
import { Image } from "antd";
import bigLogoPath from "assets/images/logofull.svg";

const Dashboard = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={bigLogoPath} preview={false} height={150} />
    </div>
  );
};

export default Dashboard;
