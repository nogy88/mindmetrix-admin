import React, { useEffect, useState } from "react";
import { message, Form, Row, Skeleton, Col } from "antd";
import { CustomButton, FormItem } from "components";
import { getRequest, postRequest, putRequest } from "api";
import { test, dict } from "api/endpoints";

function QuestionForm({ questionId, handleClose, refreshTable, testId }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [quesType, setQuesType] = useState([]);
  const [eStatus, setEStatus] = useState([]);

  useEffect(() => {
    const getQuestion = () => {
      setLoading(true);
      getRequest(`${test.question}${questionId}`)
        .then((res) => {
          form.setFieldsValue(res.data);
        })
        .catch((error) => {
          message.error(`Алдаа гарлаа. ${error.Message}`);
        })
        .finally(() => setLoading(false));
    };

    if (questionId !== null) getQuestion();
    // eslint-disable-next-line
  }, [questionId]);

  useEffect(() => {
    const getsetQuesTypes = async () => {
      getRequest(`${dict.enum}/EQuesType`)
        .then((res) => {
          setQuesType(res.data);
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

    getEStatus();
    getsetQuesTypes();
  }, []);

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (questionId) {
          await putRequest(test.question, {
            ...values,
            questionId: questionId,
            testId: +testId,
          });
        } else {
          await postRequest(test.question, {
            ...values,
            testId: +testId,
            testFactors: [
              {
                factorId: 22,
              },
            ],
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
    <div
      style={{
        width: "100%",
        border: "1px solid #eee",
        boxShadow: "1px 1px 10px #eee",
        padding: "20px",
      }}
    >
      <Skeleton loading={loading}>
        <Form
          layout="vertical"
          hideRequiredMark
          // size="small"
          scrollToFirstError
          form={form}
        >
          <Row gutter={32} style={{}}>
            <Col span={24}>
              {/* // !todo span={16} */}
              <Row justify="start" gutter={32}>
                <FormItem
                  itemType="select"
                  label="Төрөл"
                  name={"quesType"}
                  dtsrc={quesType}
                  span={8}
                  required
                />
                <FormItem
                  label="Асуулт"
                  name={"questionTxt"}
                  span={8}
                  required
                />

                <FormItem
                  itemType="radio"
                  label="Зурагтай эсэх"
                  name={"isImg"}
                  span={8}
                  required
                />
                <FormItem
                  itemType="radio"
                  label="Асуулт холих эсэх"
                  name={"isAnswerShuffle"}
                  span={8}
                  required
                />
                <FormItem
                  label="Индекс"
                  name={"index"}
                  span={8}
                  itemType="number"
                  required
                />
                <FormItem
                  label="Эрэмбэ"
                  name={"orderNo"}
                  itemType="number"
                  span={8}
                  required
                />
                <FormItem
                  itemType="select"
                  label="Төлөв"
                  name={"status"}
                  dtsrc={eStatus}
                  span={8}
                  required
                />
              </Row>
            </Col>
            {/* <Col span={8}>
              <div
                style={{
                  backgroundColor: "yellow",
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            </Col> */}
          </Row>
          <Row gutter={6} justify="end" style={{ marginTop: "20px" }}>
            <Col>
              <CustomButton
                btntext="Болих"
                // styles={{ backgroundColor: "red" }}
                onClick={() => handleClose()}
                type="ghost"
              />
            </Col>
            <Col>
              <CustomButton
                btntext="Нэмэх"
                onClick={() => onSubmit()}
                styles={{ backgroundColor: "#00bf6f" }}
              />
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </div>
  );
}

export default QuestionForm;
