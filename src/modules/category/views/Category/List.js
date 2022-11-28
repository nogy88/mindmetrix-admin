import { Tag } from "antd";
import { category } from "api/endpoints";
import { CustomTable, Tabledit } from "components";
import Page from "components/Page";
import React from "react";

function CategoryList() {
  const breadcrumb = [
    {
      icon: "BarsOutlined",
      href: null,
      text: "Категори",
    },
    {
      icon: "BarsOutlined",
      href: category.categories,
      text: "Категориудын жагсаалт",
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
        title={"Категориудын жагсаалт"}
        columns={columns}
        endpoint={category.category}
        endpoints={category.categories}
        primaryKey={"categoryId"}
      />
      {/* <Tabledit
        title={"Категориудын жагсаалт"}
        primaryKey="businessId"
        endpoint={{ url: category.category }}
        endpoints={category.categories}
        columns={columns}
      /> */}
    </Page>
  );
}

export default CategoryList;
