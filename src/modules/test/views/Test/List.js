import React from "react";
import { Tag, Image } from "antd";
import { test } from "api/endpoints";
import { CustomTable, Page } from "components";
import { formatCurrency } from "utils/helpers/formatter";

function TestList() {
  const breadcrumb = [
    {
      icon: "QuestionCircleOutlined",
      href: null,
      text: "Тест",
    },
    {
      icon: "FileTextOutlined",
      href: test.tests,
      text: "Тестийн жагсаалт",
    },
  ];

  const columns = [
    {
      title: "Код",
      dataIndex: "testId",
    },
    {
      title: "Нэр",
      dataIndex: "name",
    },
    {
      title: "Тайлбар",
      dataIndex: "desc",
    },
    {
      title: "Үйлчилгээний төлбөр (Хувь хүн)",
      dataIndex: "pricePerson",
      render: (val) => (
        <div style={{ textAlign: "right" }}>{formatCurrency(val)}₮</div>
      ),
    },
    {
      title: "Үйлчилгээний төлбөр (Судлаач)",
      dataIndex: "price",
      render: (val) => (
        <div style={{ textAlign: "right" }}>{formatCurrency(val)}₮</div>
      ),
    },
    {
      title: "Эрэмбэ",
      dataIndex: "orderNo",
      textAlign: "center",
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
    {
      title: "Зураг",
      dataIndex: "img",
      render: (val) => {
        return (
          <Image
            src={`http://mx.itg.mn/Storage//Data//Test/${val}`}
            height={100}
            width={100}
            preview={false}
          />
        );
      },
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
