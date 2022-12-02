import React, { useState, useEffect } from "react";
import { Form, Row, message } from "antd";
import { FormItem, Page } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { postRequest, getRequest, putRequest } from "api";
import { admin, business } from "api/endpoints";

const BusinessForm = () => {
  const navigate = useNavigate();

  let { businessId } = useParams();

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
      text: "Бизнес",
    },
    {
      icon: "ApartmentOutlined",
      href: admin.admins,
      text: "Бизнес жагсаалт",
    },
    {
      icon: "FormOutlined",
      href: "/",
      text: state.mode === "NEW" ? "Бизнес бүртгэх" : "Бизнес засах",
    },
  ];

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (state.mode === "EDIT") {
          await putRequest(business.business, values);
        } else {
          await postRequest(business.business, values);
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
        // getProduct(values.prodCode);
        navigate(business.businesses);
      })
      .catch((err) => {
        setState({ loading: false });
        message.error(err.Message);
      });
  };

  const getAdmin = async (businessId) => {
    try {
      setState({ loading: true });
      const res = await getRequest(`${business.business}/${businessId}`);
      setState({ mode: "EDIT", loading: false, data: res.data });
      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ loading: false });
      message.error(error.Message);
    }
  };

  useEffect(() => {
    if (businessId !== "new") {
      getAdmin(businessId);
    }
  }, [businessId]);

  return (
    <Page breadcrumb={breadcrumb}>
      <Form form={form} initialValues={{ businessId: "" }} layout="vertical">
        <Row gutter={[16]}>
          <FormItem label="Нэр" name={"name"} required span={8} />
          <FormItem label="OrderNo" name={"orderNo"} required span={8} />

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

export default BusinessForm;
