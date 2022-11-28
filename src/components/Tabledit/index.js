import React, { useEffect, useState } from "react";
import moment from "moment";

import { Button, Form, Table, message, Popconfirm, Typography } from "antd";
import {
  SaveOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { getRequest, postRequest, putRequest, deleteRequest } from "api";
import { EditCell } from "./EditCell";
import { TableHeader } from "components";
const { Link } = Typography;
const Editable = ({
  title,
  columns,
  endpoint,
  endpoints,
  primaryKey,
  saveFunc,
  deleteFunc,
  values,
  actionCol = true,
  ...props
}) => {
  const [form] = Form.useForm();
  const [tableColumns, setColumns] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [mode, setMode] = useState("");

  const isEditing = (record) => `${record[primaryKey]}` === `${editingKey}`;

  const [state, setState] = useState({
    data: [],
    total: 0,
    filter: {
      Pid: 1,
      Psize: 20,
    },
  });

  const handleChange = (pagination, filters, sorter) => {
    const tmpFilter = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null) tmpFilter[key] = filters[key][0];
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
      const response = await getRequest(endpoints || "", state.filter);
      setState({
        ...state,
        data: response.data.results,
        total: response.data.rowCount,
      });
    } catch (error) {
      message.error(error.Message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [state.filter]);

  useEffect(() => {
    let tmp = columns;
    const mergedColumns = tmp.map((col) => {
      let column = {
        dataIndex: col.key,
        editable: true,
        fieldType: "string",
        align: "center",
        ...col,
      };
      if (!column.editable) {
        return column;
      }
      return {
        ...column,
        onCell: (record) => ({
          ...column,
          record,
          key: col.dataIndex,
          title: col.title,
          value: record[col.dataIndex],
          editing: isEditing(record),
        }),
      };
    });

    setColumns(mergedColumns);
    // eslint-disable-next-line
  }, [editingKey]);

  const handleAdd = () => {
    let c = state.data.find((d) => d[primaryKey] === "-1");
    if (!c) {
      setMode("NEW");
      let newObj = {
        [primaryKey]: "-1",
      };

      let tmp = [...state.data];
      tmp.unshift(newObj);
      setState({
        ...state,
        data: tmp,
      });

      setEditingKey("-1");
    }
  };

  const handleSave = async (record) => {
    if (saveFunc) {
      await saveFunc(mode);
    } else {
      try {
        if (mode === "")
          return message.error("Мэдээлэл хадгалах төрөл тодорхойгүй байна!");
        if (mode === "NEW") {
          const params = endpoint.keys ? { ...endpoint.keys } : {};
          await postRequest(endpoint.url, {
            ...params,
            ...form.getFieldsValue(),
            ...values,
          });
        } else {
          await putRequest(endpoint.url, {
            ...record,
            ...form.getFieldsValue(),
            ...values,
          });
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
      } catch (error) {
        return message.error(error.Message);
      }
    }
    setMode("");
    setEditingKey("");
    form.resetFields();
    fetchData();
  };

  const handleEdit = (record) => {
    setMode("EDIT");
    let tmp = {};
    Object.keys(record).forEach((key) => (tmp[key] = moment()));
    form.setFieldsValue({ ...record });
    setEditingKey(`${record[primaryKey]}`);
  };

  const handleDelete = async (record) => {
    try {
      await deleteRequest(`${endpoint.url}/${record[primaryKey]}`);
      message.success("Мэдээллийг амжилттай устгалаа.");
      fetchData();
    } catch (error) {
      message.error(error.Message);
    }
  };

  const handleCancel = () => {
    setState({
      ...state,
      data: state.data.filter((e) => e[primaryKey] !== "-1"),
    });
    setMode("");
    setEditingKey("");
    form.resetFields();
  };

  return (
    <Form form={form} component={false}>
      <Table
        title={() => {
          return <TableHeader title={title} addFunc={() => handleAdd()} />;
        }}
        columns={[
          ...tableColumns,
          {
            title: "Үйлдэл",
            dataIndex: "operation",
            align: "center",
            width: "100px",
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Button
                    type="link"
                    onClick={() => handleSave(record)}
                    icon={<SaveOutlined />}
                  />
                  <Button
                    type="link"
                    onClick={() => handleCancel()}
                    icon={<RollbackOutlined />}
                    danger
                  />
                </span>
              ) : (
                actionCol && (
                  <span>
                    <Button
                      type="link"
                      disabled={editingKey !== ""}
                      onClick={() => handleEdit(record)}
                      icon={<EditOutlined />}
                    />
                    <Popconfirm
                      title="Сонгосон мэдээллийг устгах уу"
                      onConfirm={() => handleDelete(record)}
                      okText="Тийм"
                      cancelText="Үгүй"
                    >
                      <Link type="danger" disabled={editingKey !== ""}>
                        <DeleteOutlined />
                      </Link>
                    </Popconfirm>
                  </span>
                )
              );
            },
          },
        ]}
        dataSource={state.data}
        rowKey={(record) => record[primaryKey]}
        pagination={{
          total: state.total,
          current: state.filter.Pid,
          pageSize: state.filter.Psize,
        }}
        components={{
          body: {
            cell: EditCell,
          },
        }}
        bordered
        size="small"
        onChange={handleChange}
        {...props}
      />
    </Form>
  );
};

export default Editable;
