import React, { useEffect, useState } from "react";
import { Drawer, message, Form, Row, Skeleton } from "antd";
import { CustomButton, FormItem } from "components";
import { getRequest, postRequest, putRequest } from "api";
import { test } from "api/endpoints";

function GroupForm({ visible, handleClose, groupId, refreshTable, testId }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFactor = () => {
      setLoading(true);
      getRequest(`${test.group}${groupId}`)
        .then((res) => {
          form.setFieldsValue(res.data);
        })
        .catch((error) => {
          message.error(`Алдаа гарлаа. ${error.Message}`);
        })
        .finally(() => setLoading(false));
    };

    if (groupId !== null) getFactor();
    // eslint-disable-next-line
  }, [groupId]);

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (groupId) {
          await putRequest(test.group, {
            ...values,
            groupId: groupId,
            testId: testId,
            type: "Group",
          });
        } else {
          await postRequest(test.group, {
            ...values,
            testId: testId,
            type: "Group",
          });
        }
        message.success("Амжилттай хадгаллаа.");
        refreshTable();
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        message.error(error.Message);
        setLoading(false);
      });
  };

  const setInitial = () => {
    handleClose();
    form.resetFields();
  };

  return (
    <Drawer
      visible={visible}
      title={groupId ? "Групп засах" : "Групп нэмэх"}
      placement={"right"}
      closable={false}
      onClose={setInitial}
      width={400}
      footer={
        <div style={{ textAlign: "right" }}>
          <CustomButton onClick={() => onSubmit()} />
        </div>
      }
      key={"group"}
    >
      <Skeleton loading={loading}>
        <Form
          layout="vertical"
          hideRequiredMark
          // size="small"
          scrollToFirstError
          form={form}
        >
          <Row justify="center" gutter={32}>
            <FormItem label="Нэр" name={"name"} required />

            <FormItem
              itemType="radio"
              label="Нэр харагдах эсэх"
              name={"isVisibleName"}
              required
            />

            <FormItem
              label="Тайлбар"
              name={"desc"}
              itemType="textarea"
              required
            />

            <FormItem
              itemType="radio"
              label="Тайлбар харагдах эсэх"
              name={"isVisibleDesc"}
              required
            />

            <FormItem
              label="Эрэмбэ"
              name={"orderNo"}
              itemType="number"
              required
            />
          </Row>
        </Form>
      </Skeleton>
    </Drawer>
  );
}

export default GroupForm;
