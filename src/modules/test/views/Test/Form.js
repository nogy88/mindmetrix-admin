import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, message } from "antd";
import Page from "components/Page";
import { FormItem } from "components";
import { postRequest, getRequest, putRequest } from "api";
import { admin, basePackage, business, test } from "api/endpoints";

const TestForm = () => {
  const navigate = useNavigate();

  let { testId } = useParams();

  const [form] = Form.useForm();

  const [state, setState] = useState({
    loading: false,
    mode: "NEW",
    data: {},
  });

  const breadcrumb = [
    {
      icon: "IdcardOutlined",
      href: null,
      text: "Тестийн жагсаалт",
    },
    {
      icon: "ApartmentOutlined",
      href: test.tests,
      text: "Тестийн жагсаалт",
    },
    {
      icon: "FormOutlined",
      href: "",
      text: state.mode === "NEW" ? "Тест бүртгэх" : "Тест засах",
    },
  ];

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (state.mode === "EDIT") {
          await putRequest(test.test, values);
        } else {
          await postRequest(test.test, values);
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
        // getProduct(values.prodCode);
        navigate(test.tests);
      })
      .catch((err) => {
        setState({ loading: false });
        message.error(err.Message);
      });
  };

  const getAdmin = async (testId) => {
    try {
      setState({ loading: true });
      const res = await getRequest(`${test.test}/${testId}`);
      setState({ mode: "EDIT", loading: false, data: res.data });
      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ loading: false });
      message.error(error.Message);
    }
  };

  useEffect(() => {
    if (testId !== "new") {
      getAdmin(testId);
    }
  }, [testId]);

  return (
    <Page breadcrumb={breadcrumb}>
      <Form form={form} initialValues={{ testId: "" }} layout="vertical">
        <Row gutter={[16]}>
          <FormItem label="Нэр" name={"name"} required span={8} />
          <FormItem label="Тайлбар" name={"desc"} required span={8} />

          <FormItem label="Зураг" name={"img"} required span={8} />
          <FormItem
            label="Минут"
            itemType={"number"}
            name={"minute"}
            required
            span={8}
          />
          <FormItem label="beforeDesc" name={"beforeDesc"} required span={8} />
          <FormItem label="afterDesc" name={"afterDesc"} required span={8} />
          <FormItem
            label="Үнэ (Хувь хүн)"
            name={"pricePerson"}
            required
            span={8}
          />
          <FormItem label="Дүн" name={"price"} required span={8} />
          <FormItem
            label="isRepeat"
            name={"isRepeat"}
            required
            span={8}
            itemType={"radio"}
          />
          <FormItem
            label="repeatMount"
            itemType={"number"}
            name={"repeatMount"}
            required
            span={8}
          />
          <FormItem
            label="isSelection"
            name={"isSelection"}
            required
            span={8}
            itemType={"radio"}
          />
          <FormItem
            label="isQuestionShuffle"
            name={"isQuestionShuffle"}
            required
            span={8}
            itemType={"radio"}
          />
          <FormItem
            label="exampleReport"
            name={"exampleReport"}
            required
            span={8}
          />
          <FormItem label="Эрэмбэ" name={"orderNo"} required span={8} />
          <FormItem
            span={8}
            itemType="select"
            label="Төлөв"
            name={"status"}
            dtsrc={[
              {
                val: "A",
                txt: "Идэвхтэй",
                orderNo: 1,
                filter: null,
                filter2: null,
              },
              {
                val: "I",
                txt: "Идэвхгүй",
                orderNo: 2,
                filter: null,
                filter2: null,
              },
            ]}
            required
          />

          <FormItem span={24} itemType="button" onClick={() => submit()} />
        </Row>
      </Form>
    </Page>
  );
};

export default TestForm;
