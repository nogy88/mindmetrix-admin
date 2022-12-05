import React, { useState, useEffect } from "react";
import { Form, Row, message, Drawer, Upload, Skeleton } from "antd";
import { FormItem, CustomButton } from "components";
import { postRequest, getRequest, putRequest } from "api";
import { basePackage, uploadFile } from "api/endpoints";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";

const PackageForm = ({ visible, handleClose, refreshTable, packageId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    mode: "NEW",
    data: {},
    imageRespone: "",
    image: { src: "", isUpdated: false },
    loading: false,
  });

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (packageId) {
          await putRequest(basePackage.package, {
            ...values,
            packageId: +packageId,
            img: state.imageRespone,
          });
        } else {
          await postRequest(basePackage.package, {
            ...values,
            img: state.imageRespone,
          });
        }
        message.success("Мэдээллийг амжилттай хадгаллаа.");
        setLoading(false);
        setInitial();
        refreshTable();
      })
      .catch((err) => {
        setState({ loading: false });
        message.error(err.Message);
      });
  };

  const getPackage = async (packageId) => {
    try {
      setState({ ...state, loading: true });
      const res = await getRequest(`${basePackage.package}${packageId}`);
      setState({
        ...state,
        mode: "EDIT",
        loading: false,
        data: res.data,
        imageRespone: res.data.img,
        image: { ...state.image, src: `http://mx.itg.mn/${res.data.imgPath}` },
      });
      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ ...state, loading: false });
      message.error(error.Message);
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const imgHandleChange = async ({ file }) => {
    try {
      const formData = new FormData();
      await formData.append("File", file.originFileObj);
      const res = await postRequest(uploadFile.uploadFile, formData);
      if (file.status === "uploading") {
        setState({ ...state, loading: true, imageRespone: res.data });
        return;
      }
      if (file.status === "done") {
        getBase64(file.originFileObj, (imageUrl) =>
          setState({
            ...state,
            image: { src: imageUrl, isUpdated: true },
            loading: false,
            imageRespone: res.data,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (packageId) {
      getPackage(packageId);
    }
  }, [packageId, refreshTable]);

  const setInitial = () => {
    handleClose();
    form.resetFields();
    state.image.src = "";
  };
  return (
    <Drawer
      placement={"right"}
      closable={false}
      title={packageId ? "Багц засах" : "Багц нэмэх"}
      onClose={setInitial}
      visible={visible}
      key={"onboardAns"}
      width={400}
      footer={
        <div style={{ textAlign: "right" }}>
          <CustomButton onClick={() => submit()} />
        </div>
      }
    >
      <Skeleton loading={loading}>
        <Form
          layout="vertical"
          hideRequiredMark
          // size="small"
          scrollToFirstError
          form={form}
        >
          <Row gutter={16}>
            <Form.Item label="Зураг">
              <Upload
                name="avatar"
                listType="picture-card"
                className="package-upload "
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  console.log("file->", file);
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0.5);
                }}
                // beforeUpload={beforeUpload}
                onChange={imgHandleChange}
              >
                {state.image?.src ? (
                  <img
                    src={state.image?.src}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div>
                    {state.loading ? <LoadingOutlined /> : <UploadOutlined />}
                    <div style={{ marginTop: 8 }}>Зураг оруулах</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <FormItem label="Багцын нэр" name={"name"} required />
            <FormItem
              label="Багцын товч тайлбар,зориулалт"
              name={"desc"}
              required
            />
            <FormItem label="Багцын үнэ" name={"price"} required />
            <FormItem
              label="Эрэмбэ"
              name={"orderNo"}
              required
              itemType="number"
            />
            <FormItem
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
          </Row>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default PackageForm;
