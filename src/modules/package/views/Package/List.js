import React from "react";
import { Tag } from "antd";
import { CustomTable, Tabledit, Page } from "components";
import { basePackage, category } from "api/endpoints";

function PackageList() {
  const breadcrumb = [
    {
      icon: "BarsOutlined",
      href: null,
      text: "Багц",
    },
    {
      icon: "BarsOutlined",
      href: basePackage.packages,
      text: "Багцын жагсаалт",
    },
  ];

  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
    },
    {
      title: "Тайлбар",
      dataIndex: "desc",
    },
    {
      title: "Зураг",
      dataIndex: "img",
    },
    {
      title: "Үнэ",
      dataIndex: "price",
    },
    {
      title: "Эрэмбэ",
      dataIndex: "orderNo",
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      fieldType: "select",
      options: [
        { val: "A", txt: "Идэвхтэй" },
        { val: "I", txt: "Идэвхгүй" },
      ],
      render: (val) =>
        val === "A" ? (
          <Tag color="blue">{"Идэвхтэй"}</Tag>
        ) : (
          <Tag color="red">{"Идэвхгүй"}</Tag>
        ),
    },
  ];

  return (
    <Page breadcrumb={breadcrumb}>
      <CustomTable
        title={"Багцын жагсаалт"}
        columns={columns}
        endpoint={basePackage.package}
        endpoints={basePackage.packages}
        primaryKey={"packageId"}
      />
      {/* <Tabledit
        title={"Багцын жагсаалт"}
        primaryKey="packageId"
        endpoint={{ url: basePackage.package }}
        endpoints={basePackage.packages}
        columns={columns}
      /> */}
    </Page>
  );
}

export default PackageList;
