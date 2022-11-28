import { Tag } from "antd";
import { basePackage, test } from "api/endpoints";
import { CustomTable } from "components";
import Page from "components/Page";
import React from "react";

function TestList() {
  const breadcrumb = [
    {
      icon: "BarsOutlined",
      href: null,
      text: "Тест",
    },
    {
      icon: "BarsOutlined",
      href: basePackage.packages,
      text: "Тестийн жагсаалт",
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
        title={"Тестийн жагсаалт"}
        columns={columns}
        endpoint={test.test}
        endpoints={test.tests}
        primaryKey={"testId"}
      />
    </Page>
  );
}

export default TestList;
