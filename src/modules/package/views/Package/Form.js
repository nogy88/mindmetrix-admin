import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, message } from "antd";
import Page from "components/Page";
import { FormItem } from "components";
import { postRequest, getRequest, putRequest } from "api";
import { admin, basePackage, business } from "api/endpoints";

const PackageForm = () => {
  const navigate = useNavigate();

  let { packageId } = useParams();

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
      text: "Багцын жагсаалт",
    },
    {
      icon: "ApartmentOutlined",
      href: basePackage.packages,
      text: "Багцын жагсаалт",
    },
    {
      icon: "FormOutlined",
      href: "",
      text: state.mode === "NEW" ? "Багц бүртгэх" : "Багц засах",
    },
  ];

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (state.mode === "EDIT") {
          await putRequest(basePackage.package, values);
        } else {
          await postRequest(basePackage.package, values);
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
        // getProduct(values.prodCode);
        navigate(basePackage.packages);
      })
      .catch((err) => {
        setState({ loading: false });
        message.error(err.Message);
      });
  };

  const getAdmin = async (packageId) => {
    try {
      setState({ loading: true });
      const res = await getRequest(`${basePackage.package}/${packageId}`);
      setState({ mode: "EDIT", loading: false, data: res.data });
      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ loading: false });
      message.error(error.Message);
    }
  };

  useEffect(() => {
    if (packageId !== "new") {
      getAdmin(packageId);
    }
  }, [packageId]);

  return (
    <Page breadcrumb={breadcrumb}>
      <Form form={form} initialValues={{ packageId: "" }} layout="vertical">
        <Row gutter={[16]}>
          <FormItem label="Нэр" name={"name"} required span={8} />
          <FormItem label="Тайлбар" name={"desc"} required span={8} />

          <FormItem label="Эрэмбэ" name={"orderNo"} required span={8} />
          <FormItem label="Зураг" name={"img"} required span={8} />
          <FormItem label="Дүн" name={"price"} required span={8} />

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

export default PackageForm;
