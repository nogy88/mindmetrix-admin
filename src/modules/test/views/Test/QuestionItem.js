import React, { useState } from "react";
import { Col, Row } from "antd";
import { CustomButton } from "components";
import QuestionForm from "./QuestionForm";

function QuestionItem({ question, index, refreshTable }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <Col span={24} className="question-item">
      {editMode ? (
        <QuestionForm
          visible={editMode}
          questionId={question?.questionId}
          handleClose={() => setEditMode(false)}
          refreshTable={() => refreshTable()}
          // testId={testId}
        />
      ) : (
        <Row justify="space-between">
          <Col style={{ marginRight: "5px" }}>
            {index}. {question?.questionTxt}
          </Col>
          {!editMode ? (
            <Col>
              <Row>
                <CustomButton
                  btntext="Асуулт засах"
                  type="ghost"
                  styles={{ marginRight: "16px", backgroundColor: "#5CFF5C" }}
                  onClick={() => {
                    // setFormModal({
                    //   ...formModal,
                    //   pageForm: { groupId: null, visible: true },
                    // });
                    setEditMode(true);
                  }}
                />
                <CustomButton
                  btntext="Хариулт нэмэх"
                  type="ghost"
                  styles={{ marginRight: "16px" }}
                  onClick={() => {
                    // setFormModal({
                    //   ...formModal,
                    //   pageForm: { groupId: null, visible: true },
                    // });
                  }}
                />
              </Row>
            </Col>
          ) : null}
        </Row>
      )}
    </Col>
  );
}

export default QuestionItem;
