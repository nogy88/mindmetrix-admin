import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Tag, message } from "antd";
import { getRequest, deleteRequest } from "api";
import { test } from "api/endpoints";
import { CustomTable, TableHeader } from "components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FactorResultForm from "./FactorResultForm";

function FactorResultList({ factorId }) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [factorResults, setFactorResults] = useState([]);
  const [modalData, setModalData] = useState({
    visible: false,
    resultId: null,
  });

  useEffect(() => {
    const getFactorResults = () => {
      setLoading(true);
      getRequest(test.factorResults, {
        factorId: factorId,
        Pid: 1,
        Psize: 100,
      })
        .then((res) => {
          setFactorResults(res.data.results);
          console.log(res.data.results);
        })
        .catch((error) => {
          message.error(`Алдаа гарлаа. ${error.Message}`);
        })
        .finally(() => setLoading(false));
    };

    if (factorId !== null) getFactorResults();
  }, [factorId, refresh]);

  const handleDelete = (id) => {
    deleteRequest(`${test.feelingAnswer}${id}`)
      .then((res) => {
        message.success("Мэдээллийг амжилттай устгалаа.");
        // to fetch data
        setRefresh(!refresh);
      })
      .catch((err) => {
        message.error(`Алдаа гарлаа: ${err.Message}`);
      });
  };

  const columns = [
    // {
    //   title: "Код",
    //   dataIndex: "resultId",
    //   width: "10%",
    //   align: "center",
    // },
    {
      title: "Тайлбар",
      dataIndex: "desc",
      align: "center",
    },
    {
      title: "Доод оноо",
      dataIndex: "scoreMin",
      align: "center",
    },
    {
      title: "Дээд оноо",
      dataIndex: "scoreMax",
      align: "center",
    },
  ];

  return (
    <div style={{ padding: "10px 40px" }}>
      <CustomTable
        title={"Хүчин зүйлийн үр дүн"}
        primaryKey={["resultId"]}
        columns={columns}
        endpoint={test.factorResult}
        endpoints={test.factorResults}
        addFunc={() => setModalData({ resultId: null, visible: true })}
        onEdit={(val) => setModalData({ resultId: val, visible: true })}
        otherFilters={{ factorId: factorId }}
        refresh={refresh}
      />
      {/* <Table
        columns={columns}
        dataSource={factorResults}
        rowKey={(record) => record.resultId}
        loading={loading}
        size="small"
        // bordered
        title={() => {
          return (
            <TableHeader
              title="Хүчин зүйлийн үр дүн"
              addFunc={() => {
                setModalData({ resultId: null, visible: true });
              }}
            />
          );
        }}
      /> */}
      <FactorResultForm
        visible={modalData.visible}
        factorId={factorId}
        resultId={modalData.resultId}
        handleClose={() => setModalData({ resultId: null, visible: false })}
        refreshTable={() => setRefresh(!refresh)}
      />
    </div>
  );
}

export default FactorResultList;
