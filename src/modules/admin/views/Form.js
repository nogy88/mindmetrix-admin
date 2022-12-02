import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, message, Col, Image, Spin } from "antd";
import { FormItem, Page } from "components";
import { postRequest, getRequest, putRequest } from "api";
import { admin } from "api/endpoints";
import noImage from "assets/images/logosmall.svg";

const AdminForm = () => {
  const navigate = useNavigate();

  let { userId } = useParams();

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
      text: "Админ бүртгэл",
    },
    {
      icon: "ApartmentOutlined",
      href: admin.admins,
      text: "Админ жагсаалт",
    },
    {
      icon: "FormOutlined",
      href: "/",
      text: state.mode === "NEW" ? "Админ бүртгэх" : "Админ засах",
    },
  ];

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (state.mode === "EDIT") {
          await putRequest(admin.admin, values);
        } else {
          await postRequest(admin.admin, values);
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
        // getProduct(values.prodCode);
        navigate(admin.admins);
      })
      .catch((err) => {
        setState({ loading: false });
        message.error(err.Message);
      });
  };

  const getAdmin = async (userId) => {
    try {
      setState({ loading: true });
      const res = await getRequest(`admin/user/${userId}`);
      setState({ mode: "EDIT", loading: false, data: res.data });
      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ loading: false });
      message.error(error.Message);
    }
  };

  useEffect(() => {
    if (userId !== "new") {
      getAdmin(userId);
    }
  }, [userId]);

  return (
    <Page breadcrumb={breadcrumb}>
      <Row>
        <Col span={6} style={{ paddingRight: "20px" }}>
          <Image
            height={350}
            width="100%"
            src={noImage}
            style={{ border: "3px solid #EEF3FE", borderRadius: "10px" }}
            placeholder={
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Spin></Spin>
              </div>
            }
          />
          {/* <Image preview={false} alt="" src={""} /> */}
        </Col>
        <Col span={18}>
          <Form form={form} initialValues={{ userId: "" }} layout="vertical">
            <Row gutter={[16, 4]}>
              <FormItem
                itemType="select"
                label="Хэрэглэгчийн үүрэг"
                name={"role"}
                span={8}
                dtsrc={[
                  {
                    val: "Consumer",
                    txt: "Хэрэглэгч",
                    orderNo: 1,
                    filter: null,
                    filter2: null,
                  },
                  {
                    val: "Admin",
                    txt: "Админ",
                    orderNo: 2,
                    filter: null,
                    filter2: null,
                  },
                  {
                    val: "Customer",
                    txt: "Харилцагч",
                    orderNo: 3,
                    filter: null,
                    filter2: null,
                  },
                  {
                    val: "Operator",
                    txt: "Оператор",
                    orderNo: 4,
                    filter: null,
                    filter2: null,
                  },
                ]}
                required
              />
              <FormItem
                itemType="select"
                label="Хэрэглэгчийн төрөл"
                name={"userType"}
                span={8}
                dtsrc={[
                  {
                    val: "Adm",
                    txt: "Админ",
                    orderNo: 1,
                    filter: null,
                    filter2: null,
                  },
                  {
                    val: "Aut",
                    txt: "Авто",
                    orderNo: 2,
                    filter: null,
                    filter2: null,
                  },
                  {
                    val: "Org",
                    txt: "Байгуулга",
                    orderNo: 3,
                    filter: null,
                    filter2: null,
                  },
                  {
                    val: "Per",
                    txt: "Хэрэглэгч",
                    orderNo: 4,
                    filter: null,
                    filter2: null,
                  },
                ]}
                required
              />
              <FormItem
                itemType="select"
                label="Төлөв"
                name={"status"}
                span={8}
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
              <FormItem label="И-Мэйл" name={"email"} required span={8} />
              <FormItem label="Нэр" name={"name"} required span={8} />
              <FormItem label="Овог" name={"firstName"} required span={8} />
              <FormItem label="Нэр" name={"lastName"} required span={8} />
              <FormItem label="Регистр" name={"regNo"} required span={8} />
              <FormItem
                itemType="date"
                label="Төрсөн огноо"
                name={"birthdate"}
                required
                span={8}
              />
              <FormItem label="Дугаар" name={"phone"} required span={8} />
              <FormItem label="Зураг" name={"photo"} required span={8} />

              <FormItem
                itemType="password"
                label="Нүүц үг"
                name={"password"}
                required
                span={8}
              />
            </Row>

            <FormItem span={24} itemType="button" onClick={() => submit()} />
          </Form>
        </Col>
      </Row>
    </Page>
  );
};

export default AdminForm;
