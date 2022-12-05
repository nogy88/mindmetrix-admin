import React, { useState } from "react";
import { Image, Tag } from "antd";
import { CustomTable, Page } from "components";
import { category } from "api/endpoints";
import CategoryForm from "./Form";

function CategoryList() {
  const [refresh, setRefresh] = useState(false);
  const [modalData, setModalData] = useState({
    visible: false,
    editId: null,
  });
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
      render: (val) => {
        return (
          <Image
            src={`http://mx.itg.mn/Storage//Data//Category/${val}`}
            height={100}
            width={100}
            preview={false}
          />
        );
      },
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
        addFunc={() => setModalData({ editId: null, visible: true })}
        onEdit={(val) => setModalData({ editId: val, visible: true })}
        refresh={refresh}
      />
      <CategoryForm
        visible={modalData.visible}
        editId={modalData.editId}
        handleClose={() => setModalData({ editId: null, visible: false })}
        refreshTable={() => setRefresh(!refresh)}
      />
    </Page>
  );
}

export default CategoryList;
