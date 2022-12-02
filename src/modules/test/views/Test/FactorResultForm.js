import React, { useEffect, useState } from "react";
import { Drawer, message, Form, Row, Skeleton } from "antd";
import { CustomButton, FormItem } from "components";
import { getRequest, postRequest, putRequest } from "api";
import { test } from "api/endpoints";

function FactorResultForm({
  visible,
  factorId,
  resultId,
  handleClose,
  refreshTable,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFactorResult = () => {
      setLoading(true);
      getRequest(`${test.factorResult}${resultId}`)
        .then((res) => {
          form.setFieldsValue(res.data);
        })
        .catch((error) => {
          message.error(`Алдаа гарлаа. ${error.Message}`);
        })
        .finally(() => setLoading(false));
    };

    if (resultId !== null) getFactorResult();
    // eslint-disable-next-line
  }, [resultId]);

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (resultId) {
          await putRequest(test.factorResult, {
            ...values,
            factorId: factorId,
            resultId: resultId,
          });
        } else {
          await postRequest(test.factorResult, {
            ...values,
            factorId: factorId,
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
      title={
        resultId ? "Хүчин зүйлийн үр дүн засах" : "Хүчин зүйлийн үр дүн нэмэх"
      }
      placement={"right"}
      closable={false}
      onClose={setInitial}
      width={400}
      footer={
        <div style={{ textAlign: "right" }}>
          <CustomButton onClick={() => onSubmit()} />
        </div>
      }
      key={"factor"}
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
            <FormItem label="Тайлбар" name={"desc"} required />
            <FormItem
              label="Доод оноо"
              name={"scoreMin"}
              itemType="number"
              required
            />
            <FormItem
              label="Дээд оноо"
              name={"scoreMax"}
              itemType="number"
              required
            />
          </Row>
        </Form>
      </Skeleton>
    </Drawer>
  );
}

export default FactorResultForm;
