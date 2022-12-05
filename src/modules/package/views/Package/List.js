import React, { useState } from "react";
import { Image, Tag } from "antd";
import { CustomTable, Tabledit, Page } from "components";
import { basePackage, category } from "api/endpoints";
import PackageForm from "./Form";

function PackageList() {
  const [refresh, setRefresh] = useState(false);
  const [modalData, setModalData] = useState({
    visible: false,
    editId: null,
  });
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
      title: "Багцын нэр",
      dataIndex: "name",
    },
    {
      title: "Багцын товч тайлбар,зориулалт",
      dataIndex: "desc",
    },
    {
      title: "Зураг",
      dataIndex: "img",
      render: (val) => {
        return (
          <Image
            src={`http://mx.itg.mn/Storage//Data//Package/${val}`}
            height={100}
            width={100}
            preview={false}
          />
        );
      },
    },
    {
      title: "Багцын үнэ",
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
        columns={columns}
        title={"Багцын жагсаалт"}
        endpoint={basePackage.package}
        endpoints={basePackage.packages}
        primaryKey={"packageId"}
        addFunc={() => setModalData({ editId: null, visible: true })}
        onEdit={(val) => setModalData({ editId: val, visible: true })}
        refresh={refresh}
      />
      <PackageForm
        visible={modalData.visible}
        packageId={modalData.editId}
        handleClose={() => setModalData({ editId: null, visible: false })}
        refreshTable={() => setRefresh(!refresh)}
      />
    </Page>
  );
}

export default PackageList;
