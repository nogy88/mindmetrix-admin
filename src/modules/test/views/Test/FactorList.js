import React, { useState } from "react";
import { Tag } from "antd";
import { CustomTable } from "components";
import { test } from "api/endpoints";
import FactorForm from "./FactorForm";
import FactorResultList from "./FactorResultList";

function FactorList({ data, refresh, setRefresh, testId }) {
  const [factorForm, setFactorForm] = useState({
    visible: false,
    factorId: null,
  });

  const columns = [
    // {
    //   title: "Код",
    //   textAlign: "center",
    //   dataIndex: "factorId",
    // },
    {
      title: "Нэр",
      dataIndex: "name",
    },
    {
      title: "Хүчин зүйлийн төрөл",
      textAlign: "left",
      dataIndex: "factorType",
    },
    {
      title: "Боломжит оноо",
      textAlign: "center",
      dataIndex: "scorePossible",
    },
    {
      title: "Эрэмбэ",
      textAlign: "center",
      dataIndex: "orderNo",
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
    <>
      <CustomTable
        title={"Хүчин зүйлсийн жагсаалт"}
        primaryKey={["factorId"]}
        columns={columns}
        endpoint={test.factor}
        // endpoints={test.factors}
        data={data}
        addFunc={() => setFactorForm({ factorId: null, visible: true })}
        onEdit={(val) => setFactorForm({ factorId: val, visible: true })}
        refresh={refresh}
        setRefresh={() => setRefresh()}
        expandable={{
          expandedRowRender: (record) => (
            <FactorResultList factorId={record.factorId} />
          ),
        }}
        rowKey={(record) => record.factorId}
      />
      <FactorForm
        visible={factorForm.visible}
        factorId={factorForm.factorId}
        handleClose={() => setFactorForm({ factorId: null, visible: false })}
        setRefresh={() => setRefresh()}
        testId={testId}
      />
    </>
  );
}

export default FactorList;
