import React, { useState, useEffect } from "react";
import { Col, Form, Row, Upload, Typography, message, Divider } from "antd";
import { useParams } from "react-router-dom";
import { FormItem, Page, CustomButton } from "components";
import { getRequest, postRequest, putRequest } from "api";
import { dict, test, uploadFile } from "api/endpoints";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import FactorForm from "./FactorForm";
import FactorList from "./FactorList";
import GroupForm from "./GroupForm";
import PageForm from "./PageForm";
import MatrixForm from "./MatrixForm";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";
const { Title } = Typography;

const TestForm = () => {
  let { testId } = useParams();
  const initialState = {
    mode: "NEW",
    data: {},
    imageRespone: "",
    image: { src: "", isUpdated: false },
    loading: false,
  };
  const [state, setState] = useState(initialState);
  const [refresh, setRefresh] = useState({
    factor: false,
  });
  const [formModal, setFormModal] = useState({
    factorForm: {
      visible: false,
      factorId: null,
    },
    pageForm: {
      visible: false,
      groupId: null,
    },
    groupForm: {
      visible: false,
      groupId: null,
    },
    matrixForm: {
      visible: false,
      matrixId: null,
    },
    questionForm: {
      visible: false,
      questionId: null,
    },
  });
  const [selectedTestCats, setSelectedTestCats] = useState([]);
  const [testCats, setTestCats] = useState([]);
  const [testAges, setTestAges] = useState([]);
  const [selectedTestAges, setSelectedTestAges] = useState([]);
  const [form] = Form.useForm();

  const breadcrumb = [
    {
      icon: "BarsOutlined",
      href: null,
      text: "Тест",
    },
    {
      icon: "BarsOutlined",
      href: test.tests,
      text: "Тестийн жагсаалт",
    },
    {
      icon: "BarsOutlined",
      href: null,
      text: state.mode === "NEW" ? "Тест нэмэх" : "Тест засах",
    },
  ];

  useEffect(() => {
    const getTestCats = async () => {
      getRequest(`${dict.table}/Category`)
        .then((res) => {
          setTestCats(res.data);
        })
        .catch((error) => {
          message.error(error.Message);
        });
    };
    const getTestAges = async () => {
      getRequest(`${dict.enum}/EAgeType`)
        .then((res) => {
          setTestAges(res.data);
        })
        .catch((error) => {
          message.error(error.Message);
        });
    };

    getTestCats();
    getTestAges();
  }, []);

  const fetchData = async () => {
    try {
      setState({ ...state, loading: true });
      const res = await getRequest(`${test.test}${testId}`);
      setState({
        ...state,
        mode: "EDIT",
        loading: false,
        data: res.data,
        image: { ...state.image, src: `http://mx.itg.mn/${res.data.imgPath}` },
      });

      var tempCats = [];
      res.data.testCategorys.map((el) =>
        tempCats.push({
          val: el.groupId + "",
          txt: el.name,
        })
      );
      // setSelectedTestCats(tempCats);
      console.log("tempCats ", tempCats);

      var tempAges = [];
      res.data.testAges.map((el) =>
        tempAges.push({
          val: el.testId + "",
          txt: el.ageType,
        })
      );
      // setSelectedTestAges(tempAges);

      console.log("tempAges ", tempAges);

      form.setFieldsValue(res.data);
    } catch (error) {
      setState({ ...state, loading: false });
      message.error(error?.Message);
    }
  };

  useEffect(() => {
    if (testId !== "new" && testId !== undefined && testId !== null) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [testId, refresh]);

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

  const submit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (testId === "new") {
          let tempCats = [];
          selectedTestCats.map((cat) => tempCats.push({ categoryId: cat }));
          let tempTestAges = [];
          selectedTestAges.map((age) => tempTestAges.push({ ageType: age }));

          await postRequest(test.test, {
            ...values,
            ...(state.image.isUpdated && {
              img: state.imageRespone,
            }),
            testCategorys: tempCats,
            testAges: tempTestAges,
            // exampleReport: "string",
          });
        } else {
          await putRequest(test.test, {
            ...values,
            testId: +testId,
            ...(state.image.isUpdated
              ? {
                  img: state.imageRespone,
                }
              : null),
            // testCategorys: tempCats,
            // testAges: tempTestAges,
            // exampleReport: "string",
          });
        }

        message.success("Мэдээллийг амжилттай хадгаллаа.");
      })
      .catch((err) => {
        setState({ loading: false });
        message.error("Талбарын утгаа шалгана уу!");
      });
  };
  return (
    <>
      <Page breadcrumb={breadcrumb}>
        <Col
          span={24}
          style={{
            border: "1px solid #eee",
            boxShadow: "1px 1px 10px #eee",
            padding: "20px",
          }}
        >
          <Title level={3}>Үндсэн мэдээлэл</Title>
          <Form form={form} layout="vertical">
            <Row gutter={[32, 4]}>
              <Col span={8} style={{ paddingRight: "20px" }}>
                <Form.Item label="Зураг">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="test-upload"
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
                        {state.loading ? (
                          <LoadingOutlined />
                        ) : (
                          <UploadOutlined />
                        )}
                        <div style={{ marginTop: 8 }}>Зураг оруулах</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <FormItem
                  label="Жишээ тайлан (PDF)"
                  name={"exampleReport"}
                  span={24}
                />
              </Col>

              <Col span={16}>
                <Row gutter={[16, 4]}>
                  <FormItem
                    label="Тестийн нэр"
                    name={"name"}
                    span={8}
                    required
                  />
                  <FormItem
                    label="Тестийн категори"
                    // name={"testCategorys"}
                    itemType="multipleSelect"
                    selected={selectedTestCats}
                    setSelected={(val) => setSelectedTestCats(val)}
                    dtsrc={testCats}
                    span={8}
                    // required
                  />
                  <FormItem
                    label="Насны ангилал"
                    // name={"testAges"}
                    dtsrc={testAges}
                    itemType="multipleSelect"
                    selected={selectedTestAges}
                    setSelected={(val) => setSelectedTestAges(val)}
                    span={8}
                    // required
                  />
                  <FormItem
                    label="Тестийн товч тайлбар, зориулалт"
                    name={"desc"}
                    span={8}
                    required
                  />
                  <FormItem
                    label="Зарцуулах хугацаа"
                    itemType={"number"}
                    name={"minute"}
                    required
                    span={8}
                  />

                  <FormItem
                    label="Эрэмбэ"
                    name={"orderNo"}
                    itemType={"number"}
                    required
                    span={8}
                  />

                  <FormItem
                    label={"Тест эхлэхийн өмнөх анхааруулга"}
                    name="beforeDesc"
                    span={8}
                  />
                  <FormItem
                    label={"Тестийн дууссаны дараах зөвлөмж"}
                    name="afterDesc"
                    span={8}
                  />

                  <FormItem
                    label="Үйлчилгээний төлбөр (Хувь хүн)"
                    name={"pricePerson"}
                    itemType={"number"}
                    required
                    span={8}
                  />
                  <FormItem
                    label="Үйлчилгээний төлбөр (Судлаач)"
                    name={"price"}
                    itemType="number"
                    required
                    span={8}
                  />
                  <FormItem
                    label="Тестийг дахин өгөх боломжтой эсэх"
                    name={"isRepeat"}
                    itemType={"radio"}
                    required
                    span={8}
                  />
                  <FormItem
                    label="Тестийг дахин хийх хугацаа (Сар)"
                    name={"repeatMount"}
                    itemType={"number"}
                    required
                    span={8}
                  />

                  <FormItem
                    label="Сонгон шалгаруулалтын тест эсэх"
                    name={"isSelection"}
                    itemType={"radio"}
                    required
                    span={8}
                  />
                  <FormItem
                    label="Асуултыг холих эсэх"
                    name={"isQuestionShuffle"}
                    itemType={"radio"}
                    required
                    span={8}
                  />
                  <FormItem
                    span={8}
                    itemType="radio"
                    label="Тестийн төлөв"
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
              </Col>
            </Row>

            <FormItem span={24} itemType="button" onClick={() => submit()} />
          </Form>
        </Col>

        <Divider />

        {/* Хүчин зүйлс */}
        <div
          style={{
            padding: "20px",
            // minHeight: "280px",
            border: "1px solid #eee",
            boxShadow: "1px 1px 10px #eee",
          }}
        >
          <Title level={3}>Хүчин зүйлс</Title>
          {state.data?.testFactors?.length > 0 && (
            <FactorList
              refresh={refresh.factor}
              setRefresh={() =>
                setRefresh({ ...refresh, factor: !refresh.factor })
              }
              data={state.data.testFactors}
              testId={testId}
            />
          )}
          <CustomButton
            onClick={() => {
              setFormModal({
                ...formModal,
                factorForm: { factorId: null, visible: true },
              });
            }}
            btntext="Хүчин зүйл нэмэх"
            type="dashed"
          />
          <FactorForm
            visible={formModal.factorForm.visible}
            factorId={formModal.factorForm.factorId}
            handleClose={() =>
              setFormModal({
                ...formModal,
                factorForm: { factorId: null, visible: false },
              })
            }
            refreshTable={() =>
              setRefresh({ ...refresh, factor: !refresh.factor })
            }
            testId={testId}
          />
        </div>

        <Divider />

        {/* Other */}
        <div
          style={{
            padding: "20px",
            // minHeight: "280px",
            border: "1px solid #eee",
            boxShadow: "1px 1px 10px #eee",
          }}
        >
          {/* <Title level={3}>Асуулт</Title> */}
          <Row>
            <CustomButton
              btntext="Хуудас нэмэх"
              type="ghost"
              styles={{ marginRight: "16px" }}
              onClick={() => {
                setFormModal({
                  ...formModal,
                  pageForm: { groupId: null, visible: true },
                });
              }}
            />
            <CustomButton
              btntext="Групп нэмэх"
              type="ghost"
              styles={{ marginRight: "16px" }}
              onClick={() => {
                setFormModal({
                  ...formModal,
                  groupForm: { groupId: null, visible: true },
                });
              }}
            />
            <CustomButton
              btntext="Матрикс нэмэх"
              type="ghost"
              styles={{ marginRight: "16px" }}
              onClick={() => {
                setFormModal({
                  ...formModal,
                  matrixForm: { matrixId: null, visible: true },
                });
              }}
            />
            <CustomButton
              btntext="Асуулт нэмэх"
              // type="ghost"
              styles={{ marginRight: "16px" }}
              onClick={() => {
                setFormModal({
                  ...formModal,
                  questionForm: { questionId: null, visible: true },
                });
              }}
            />
          </Row>

          {/* Асуултын жагсаалт */}
          <Row style={{ padding: "20px" }}>
            {formModal.questionForm.visible && (
              <QuestionForm
                visible={formModal.questionForm.visible}
                questionId={formModal.questionForm.questionId}
                handleClose={() =>
                  setFormModal({
                    ...formModal,
                    questionForm: { questionId: null, visible: false },
                  })
                }
                refreshTable={() => fetchData()}
                testId={testId}
              />
            )}
            {state?.data?.questions?.map((question, index) => (
              <QuestionItem
                question={question}
                index={index}
                refreshTable={() => fetchData()}
              />
            ))}
          </Row>

          {/* Forms */}
          <PageForm
            visible={formModal.pageForm.visible}
            groupId={formModal.pageForm.groupId}
            handleClose={() =>
              setFormModal({
                ...formModal,
                pageForm: { groupId: null, visible: false },
              })
            }
            refreshTable={() => fetchData()}
            testId={testId}
          />
          <GroupForm
            visible={formModal.groupForm.visible}
            groupId={formModal.groupForm.groupId}
            handleClose={() =>
              setFormModal({
                ...formModal,
                groupForm: { groupId: null, visible: false },
              })
            }
            refreshTable={() => fetchData()}
            testId={testId}
          />
          <MatrixForm
            visible={formModal.matrixForm.visible}
            matrixId={formModal.matrixForm.matrixId}
            handleClose={() =>
              setFormModal({
                ...formModal,
                matrixForm: { matrixId: null, visible: false },
              })
            }
            refreshTable={() => fetchData()}
            testId={testId}
          />
        </div>
      </Page>
    </>
  );
};

export default TestForm;
