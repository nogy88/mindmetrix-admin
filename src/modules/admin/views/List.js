import React from "react";
import { Tag } from "antd";
import Page from "components/Page";
import { CustomTable } from "components";
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
      title: "Код",
      dataIndex: "userId",
    },
    {
      title: "Нэр",
      dataIndex: "role",
    },
    {
      title: "Овог",
      dataIndex: "firstName",
    },
    {
      title: "Нэр",
      dataIndex: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "birthdate",
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      render: (_, rec) =>
        rec.statusName === "Идэвхтэй" ? (
          <Tag color="blue">{rec.statusName}</Tag>
        ) : (
          <Tag color="red">{rec.statusName}</Tag>
        ),
    },
    {
      title: "Нэр",
      dataIndex: "email",
    },
    {
      title: "Нэр",
      dataIndex: "email",
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
