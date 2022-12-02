import React, { useState, useEffect } from "react";
import { Form, Row, message, Upload } from "antd";
import { Page, FormItem } from "components";
import { category, uploadFile } from "api/endpoints";
import { postRequest, getRequest, putRequest } from "api";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";

const BusinessForm = () => {
  const initialState = {
    image: { src: "", isUpdated: false },
    loading: false,
    imageRespone: "",
  };
  const [image, setImage] = useState(initialState);

  const navigate = useNavigate();

  let { categoryId } = useParams();

  const [form] = Form.useForm();

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const [state, setState] = useState({
    loading: false,
    mode: "NEW",
    data: {},
  });

  const breadcrumb = [
    {
      icon: "IdcardOutlined",
      href: null,
      text: "Категори",
    },
    {
      icon: "ApartmentOutlined",
      href: category.categories,
      text: "Категориудын жагсаалт",
    },
    {
      icon: "FormOutlined",
      href: "/",
      text: state.mode === "NEW" ? "Категори бүртгэх" : "Категори засах",
    },
  ];

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (state.mode === "EDIT") {
          await putRequest(category.category, values);
        } else {
          await postRequest(category.category, {
            ...values,
            img: image.imageRespone,
          });
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
        // getProduct(values.prodCode);
        navigate(category.categoryes);
      })
      .catch((err) => {
        setState({ loading: false });
        message.error(err.Message);
      });
  };

  const getCategory = async (categoryId) => {
    try {
      setState({ loading: true });
      const res = await getRequest(`${category.category}/${categoryId}`);
      setState({ mode: "EDIT", loading: false, data: res.data });
      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ loading: false });
    }
  };

  const handleChange = async ({ file }) => {
    try {
      const formData = new FormData();
      await formData.append("File", file.originFileObj);
      const res = await postRequest(uploadFile.uploadFile, formData);
      if (file.status === "uploading") {
        setImage({ ...image, loading: true, imageRespone: res.data });
        return;
      }
      if (file.status === "done") {
        getBase64(file.originFileObj, (imageUrl) =>
          setImage({
            ...image,
            image: { src: imageUrl, isUpdated: true },
            loading: false,
            imageRespone: res.data,
          })
        );
      }
    } catch (error) {
      console.log("caught an error");
      console.log(error);
    }
  };
  // const handleAvatar = (info) => {
  //   getBase64(info.file.originFileObj, (img) => {
  //     setImage({ src: img, isLink: false });
  //   });
  // };

  useEffect(() => {
    if (categoryId !== "new") {
      getCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <Page breadcrumb={breadcrumb}>
      <Form form={form} initialValues={{ categoryId: "" }} layout="vertical">
        <Row gutter={[16]}>
          <FormItem label="Нэр" name={"name"} required span={8} />
          <FormItem label="Тайлбар" name={"desc"} required span={8} />
          <Form.Item label="Зураг" required>
            <Upload
              name="avatar"
              listType="picture-card"
              className="rank-upload"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                console.log("file->", file);
                setTimeout(() => {
                  onSuccess("ok");
                }, 0.5);
              }}
              onChange={handleChange}
            >
              {image.image.src ? (
                <img
                  src={image.image.src}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div>
                  {image.loading ? <LoadingOutlined /> : <UploadOutlined />}
                  <div style={{ marginTop: 8 }}>Зураг оруулах</div>
                </div>
              )}
            </Upload>
          </Form.Item>

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
