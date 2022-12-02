import React from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const CustomModal = ({
  handleClose,
  handleSubmit,
  styles,
  buttonText = "Хадгалах",
  ...props
}) => {
  return (
    <Modal
      centered
      forceRender
      onCancel={() => handleClose()}
      footer={
        handleSubmit
          ? [
              <Button type="primary" onClick={() => handleSubmit()}>
                {buttonText}
              </Button>,
            ]
          : null
      }
      width={"70%"}
      bodyStyle={{
        padding: "40px",
        ...styles,
      }}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

CustomModal.propTypes = {
  handleClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default CustomModal;
