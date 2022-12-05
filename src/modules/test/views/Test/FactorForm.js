import React, { useEffect, useState } from "react";
import { Drawer, message, Form, Row, Skeleton } from "antd";
import { CustomButton, FormItem } from "components";
import { getRequest, postRequest, putRequest } from "api";
import { test, dict } from "api/endpoints";

function FactorForm({ visible, handleClose, factorId, setRefresh, testId }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [factorType, setFactorType] = useState([]);
  const [eStatus, setEStatus] = useState([]);

  useEffect(() => {
    const getFactor = () => {
      setLoading(true);
      getRequest(`${test.factor}${factorId}`)
        .then((res) => {
          form.setFieldsValue(res.data);
        })
        .catch((error) => {
          message.error(`Алдаа гарлаа. ${error.Message}`);
        })
        .finally(() => setLoading(false));
    };

    if (factorId !== null) getFactor();
    // eslint-disable-next-line
  }, [factorId]);

  useEffect(() => {
    const getEFactorTypes = async () => {
      getRequest(`${dict.enum}/EFactorType`)
        .then((res) => {
          setFactorType(res.data);
        })
        .catch((error) => {
          message.error(error.Message);
        });
    };

    const getEStatus = async () => {
      getRequest(`${dict.enum}/EStatus`)
        .then((res) => {
          setEStatus(res.data);
        })
        .catch((error) => {
          message.error(error.Message);
        });
    };

    getEFactorTypes();
    getEStatus();
  }, []);

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (factorId) {
          await putRequest(test.factor, {
            ...values,
            factorId: factorId,
            testId: +testId,
          });
        } else {
          await postRequest(test.factor, {
            ...values,
            testId: +testId,
          });
        }
        message.success("Амжилттай хадгаллаа.");
        setRefresh();
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
      title={factorId ? "Хүчин зүйл засах" : "Хүчин зүйл нэмэх"}
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
            <FormItem label="Нэр" name={"name"} required />
            <FormItem
              itemType="select"
              label="Хүчин зүйлийн төрөл"
              name={"factorType"}
              dtsrc={factorType}
              required
            />
            <FormItem
              label="Боломжит оноо"
              name={"scorePossible"}
              itemType="number"
              required
            />
            <FormItem
              label="Эрэмбэ"
              name={"orderNo"}
              itemType="number"
              required
            />
            <FormItem
              itemType="select"
              label="Төлөв"
              name={"status"}
              dtsrc={eStatus}
              required
            />
          </Row>
        </Form>
      </Skeleton>
    </Drawer>
  );
}

export default FactorForm;
