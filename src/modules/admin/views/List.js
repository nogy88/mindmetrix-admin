import React from "react";
import { Tag } from "antd";
import { CustomTable, Page } from "components";
import { admin } from "api/endpoints";

const AdminList = () => {
  const breadcrumb = [
    {
      icon: "BarsOutlined",
      href: null,
      text: "Админ",
    },
    {
      icon: "BarsOutlined",
      href: admin.admins,
      text: "Админ жагсаалт",
    },
  ];

  const columns = [
    {
      title: "Үүрэг (role)",
      dataIndex: "role",
    },
    {
      title: "Төрөл",
      dataIndex: "userType",
    },
    // {
    //   title: "Нэр",
    //   dataIndex: "name",
    // },
    {
      title: "Овог",
      dataIndex: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
    },
    {
      title: "Имэйл",
      dataIndex: "email",
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      render: (val) =>
        val === "A" ? (
          <Tag color="blue">Идэвхтэй</Tag>
        ) : val === "I" ? (
          <Tag color="red">Идэвхгүй</Tag>
        ) : null,
    },
  ];

  return (
    <Page breadcrumb={breadcrumb}>
      <CustomTable
        title={"Админ жагсаалт"}
        columns={columns}
        endpoint={admin.admin}
        endpoints={admin.admins}
        primaryKey={["userId"]}
      />
    </Page>
  );
};

export default AdminList;
