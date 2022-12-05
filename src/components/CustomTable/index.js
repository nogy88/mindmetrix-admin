import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Empty, BackTop, message } from "antd";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "components";
import { getRequest, deleteRequest } from "api";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RightCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import getColumnSearchProps from "components/common/getColumnSearchProps";
// import Spinner from "components/Spinner";

function CustomTable({
  title,
  columns,
  data,
  endpoints,
  endpoint,
  primaryKey,
  noFilter,
  addFunc,
  addUrl,
  deleteFunc,
  onEdit,
  onShow,
  refresh,
  setRefresh,
  otherFilters,
  actionCol = true,
  pagination = true,
  ...props
}) {
  const [tableColumns, setColumns] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [state, setState] = useState({
    data: [],
    total: 0,
    loading: false,
    filter: {
      Pid: 1,
      Psize: 10,
    },
  });
  const navigate = useNavigate();

  const handleChange = (pagination, filters) => {
    const tmpFilter = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null) {
        if (key === "rngdate") {
          tmpFilter["beginDate"] = filters[key][0];
          tmpFilter["endDate"] = filters[key][1];
        } else {
          tmpFilter[key] = filters[key][0];
        }
      }
    });
    setState({
      ...state,
      filter: {
        ...tmpFilter,
        Psize: pagination.pageSize,
        Pid: pagination.current,
      },
    });
  };

  const fetchData = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      var res = [];
      if (endpoints) {
        res = await getRequest(endpoints || "", {
          ...state.filter,
          ...otherFilters,
        });
      }
      if (data) {
        setState({
          ...state,
          data: data,
          total: data.length,
          loading: false,
        });
      }
      if (noFilter) {
        setState({
          ...state,
          data: res.data,
          loading: false,
        });
      }
      if (endpoints) {
        setState({
          ...state,
          data: res.data.results,
          total: res.data.rowCount,
          loading: false,
        });
      }
    } catch (error) {
      message.error(error.Message);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [state.filter, refresh, otherFilters]);

  useEffect(() => {
    const mergedColumns = columns.map((col) => {
      const colFilter = col.filter
        ? getColumnSearchProps({ ...col.filter })
        : null;
      return {
        key: col.dataIndex,
        align: "center",
        render: (val) => (
          <div style={{ textAlign: col.textAlign ?? "left" }}>{val}</div>
        ),
        ...colFilter,
        ...col,
      };
    });
    setColumns(mergedColumns);
    // eslint-disable-next-line
  }, [editingKey]);

  const handleDelete = async (record) => {
    // const config = {
    //   onOk: async () => {
    try {
      await deleteRequest(`${endpoint}/${record[primaryKey]}`);
      message.success("Мэдээллийг амжилттай устгалаа.");
      if (data) {
        setRefresh();
      }
      fetchData();
    } catch (error) {
      message.error(`Алдаа гарлаа. ${error?.Message}`);
    }
    //   },
    // };
    // Dialog(config);
  };

  // const handleEdit = (record) => {
  //   let tmp = {};
  //   Object.keys(record).forEach((key) => (tmp[key] = moment()));
  //   setEditingKey(`${record[primaryKey]}`);
  // };f

  return (
    <>
      <BackTop />
      <Table
        // columns={columns}
        columns={[
          ...tableColumns,
          actionCol
            ? onShow
              ? {
                  title: "Харах",
                  dataIndex: "operation",
                  align: "center",
                  width: "80px",
                  render: (_, record) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          onClick={() => {
                            onShow(record[primaryKey]);
                          }}
                        >
                          <EyeOutlined style={{ color: "#1890ff" }} />
                        </div>
                      </div>
                    );
                  },
                }
              : {
                  title: "Үйлдэл",
                  dataIndex: "operation",
                  align: "center",
                  width: "80px",
                  render: (_, record) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <div
                          onClick={
                            onEdit
                              ? () => {
                                  onEdit(record[primaryKey]);
                                }
                              : () => {
                                  navigate(`${endpoint}${record[primaryKey]}`);
                                }
                          }
                        >
                          <EditOutlined style={{ color: "#1890ff" }} />
                        </div>
                        <Popconfirm
                          title="Мэдээллийг устгах уу?"
                          onConfirm={() => handleDelete(record)}
                          okText="Тийм"
                          cancelText="Үгүй"
                        >
                          <DeleteOutlined style={{ color: "red" }} />
                        </Popconfirm>
                      </div>
                    );
                  },
                }
            : {},
        ]}
        dataSource={state.data}
        onChange={handleChange}
        loading={state.loading}
        pagination={
          pagination && {
            total: state.total,
            current: state.filter.Pid,
            pageSize: state.filter.Psize,
            showTotal: (total) => ` Нийт бичлэг: ${total}`,
          }
        }
        bordered
        size="small"
        title={() => {
          return (
            <TableHeader title={title} addUrl={endpoint} addFunc={addFunc} />
          );
        }}
        // title={title}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Өгөгдөл хоосон байна."
            />
          ),
        }}
        expandIcon={({ expanded, onExpand, record }) =>
          expanded ? (
            <DownCircleOutlined onClick={(e) => onExpand(record, e)} />
          ) : (
            <RightCircleOutlined onClick={(e) => onExpand(record, e)} />
          )
        }
        {...props}
      />
      {/* {state.loading && <Spinner />} */}
    </>
  );
}

export default CustomTable;
