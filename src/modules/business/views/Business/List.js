import React, { useEffect, useState } from "react";

import { CustomTable, Tabledit } from "components";
import { Tag } from "antd";
import Page from "components/Page";
import { message } from "antd";
import { getRequest, deleteRequest } from "api";
import { business } from "api/endpoints";

function BusinessList() {
  const breadcrumb = [
    {
      icon: "BarsOutlined",
      href: null,
      text: "Бизнес",
    },
    {
      icon: "BarsOutlined",
      href: business.businesses,
      text: "Бизнесийн жагсаалт",
    },
  ];

  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
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
      {/* <CustomTable
        title={"Бизнесийн жагсаалт"}
        columns={columns}
        endpoint={business.business}
        endpoints={business.businesses}
        primaryKey={"businessId"}
      /> */}
      <Tabledit
        title={"Бизнесийн жагсаалт"}
        primaryKey="businessId"
        endpoint={{ url: business.business }}
        endpoints={business.businesses}
        columns={columns}
      />
    </Page>
  );
}

export default BusinessList;
