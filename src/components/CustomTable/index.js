import React, { useEffect, useState } from "react";
import {
  Table,
  Popconfirm,
  Empty,
  Input,
  Button,
  Space,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getRequest, deleteRequest } from "api";
import { TableHeader } from "components";
import Spinner from "components/Spinner";

const { Option } = Select;
const { RangePicker } = DatePicker;

function CustomTable({
  title,
  columns,
  endpoints,
  endpoint,
  primaryKey,
  noFilter,
  // addFunc,
  deleteFunc,
  onEdit,
  ...props
}) {
  const [tableColumns, setColumns] = useState([]);
  // const [editingKey, setEditingKey] = useState("");
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
      const res = await getRequest(endpoints || "", state.filter);
      console.log("res : ", res);
      if (noFilter) {
        setState({
          ...state,
          data: res.data,
          loading: false,
        });
      } else {
        setState({
          ...state,
          data: res.data.results,
          total: res.data.length,
          loading: false,
        });
      }
    } catch (error) {
      // message.error(error.Message);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [state.filter]);

  const getColumnSearchProps = ({ type = "input", dtSrc = [] }) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        {type === "input" ? (
          <Input
            placeholder={`Хайх ...`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        ) : type === "select" ? (
          <Select
            placeholder="Сонгоно уу"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys([e]);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          >
            {dtSrc.map((data) => (
              <Option key={data.val} value={data.val}>{`${data.txt}`}</Option>
            ))}
          </Select>
        ) : type === "date" ? (
          <DatePicker
            placeholder="Огноо сонгоно уу"
            style={{ width: "100%", marginBottom: 8, display: "block" }}
            onChange={(dates) => setSelectedKeys(dates)}
            onPressEnter={() => confirm()}
          />
        ) : type === "rngdate" ? (
          <RangePicker
            style={{ width: 250, marginBottom: 8, display: "flex" }}
            ranges={{
              Өнөөдөр: [moment(), moment()],
              "Энэ сар": [moment().startOf("month"), moment().endOf("month")],
            }}
            onChange={(_, dates) => setSelectedKeys(dates)}
            onPressEnter={() => confirm()}
          />
        ) : null}

        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Хайх
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Арилгах
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: () => true,
  });

  useEffect(() => {
    const mergedColumns = columns.map((col) => {
      const colFilter = col.filter
        ? getColumnSearchProps({ ...col.filter })
        : null;
      return {
        key: col.dataIndex,
        align: "center",
        render: (val) => <div style={{ textAlign: "left" }}>{val}</div>,
        ...colFilter,
        ...col,
      };
    });
    setColumns(mergedColumns);
    // eslint-disable-next-line
  }, []);

  // const handleDelete = async (record) => {
  // const config = {
  //   onOk: async () => {

  // try {
  //   await deleteRequest(`${endpoint}/${record[primaryKey]}`);
  //   message.success("Мэдээллийг амжилттай устгалаа.");
  //   fetchData();
  // } catch (error) {
  //   message.error(`Алдаа гарлаа. ${error?.Message}`);
  // }
  //   },
  // };
  // Dialog(config);
  // };

  // const handleEdit = (record) => {
  //   let tmp = {};
  //   Object.keys(record).forEach((key) => (tmp[key] = moment()));
  //   setEditingKey(`${record[primaryKey]}`);
  // };f

  return (
    <>
      <Table
        // columns={columns}
        columns={[
          ...tableColumns,
          {
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
                        ? onEdit
                        : () => {
                            navigate(`${endpoint}/${record[primaryKey]}`);
                          }
                    }
                  >
                    <EditOutlined style={{ color: "#1890ff" }} />
                  </div>
                  <Popconfirm
                    title="Мэдээллийг устгах уу?"
                    onConfirm={() => deleteFunc(record[primaryKey])}
                    // onConfirm={() => handleDelete(record)}
                    okText="Тийм"
                    cancelText="Үгүй"
                  >
                    <DeleteOutlined style={{ color: "red" }} />
                  </Popconfirm>
                </div>
              );
            },
          },
        ]}
        dataSource={state.data}
        onChange={handleChange}
        loading={state.loading}
        pagination={{
          total: state.total,
          current: state.filter.Pid,
          pageSize: state.filter.Psize,
          showTotal: (total) => ` Нийт бичлэг: ${total}`,
        }}
        bordered
        size="small"
        title={() => {
          return (
            <TableHeader
              title={title}
              addUrl={endpoint}
              // addFunc={addFunc}
            />
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
        {...props}
      />
      {state.loading && <Spinner />}
    </>
  );
}

export default CustomTable;
