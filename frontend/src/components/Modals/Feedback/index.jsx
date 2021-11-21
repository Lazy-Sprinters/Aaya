import { Button, Form, Input, Rate } from "antd";
import React, { useState } from "react";
import { CustomModal } from "./styles";

const Feedback = ({ isModalVisible, hideModal, handleFeedback }) => {
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  return (
    <CustomModal
      style={{ top: 100 }}
      visible={isModalVisible}
      onOk={handleFeedback}
      onCancel={hideModal}
      width={600}
      footer={[
        <Button key="back" onClick={hideModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFeedback}>
          Accept
        </Button>,
      ]}
    >
      <div className="title">Feedback</div>
      <div className="content">Please give your valuable feedback for:</div>
      <div className="detail personName">Name: name</div>
      <div className="detail personPhone">Phone: phoneNumber</div>
      <div className="actions">
        <Form.Item label="Review">
          <Input.TextArea onChange={e => setReview(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Rating">
          <Rate onChange={e => setRate(e)}/>
        </Form.Item>
      </div>
    </CustomModal>
  );
};

export default Feedback;
