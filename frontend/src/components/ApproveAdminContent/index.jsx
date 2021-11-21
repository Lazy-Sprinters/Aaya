import React, { useState } from "react";
import {
  Select,
  Form,
  Button,
  Input,
  DatePicker,
  InputNumber,
  notification,
} from "antd";
import { CustomContent } from "./styles";
import { LeftOutlined } from "@ant-design/icons";

const ApproveAdminContent = ({ selectionKey, setScreenView }) => {
  const plainOptions = ["Nanny", "Nurse"];
  const onApprove = () => {
    console.log("approved");
    setScreenView("cards");
    notification.success({
      message: `Success`,
      description: "Approved successfully",
      placement: "bottomLeft",
    });
  };
  const onReject = () => {
    console.log("approved");
    setScreenView("cards");
    notification.success({
      message: `Success`,
      description: "Rejected successfully",
      placement: "bottomLeft",
    });
  };
  return (
    <CustomContent>
      <Button
        className="back-btn"
        type="primary"
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => {
          setScreenView("cards");
        }}
      />
      <div className="title">Approve The Details</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter your name" readOnly />
        </Form.Item>

        <Form.Item name="dob" label="DOB">
          <DatePicker style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone Number">
          <Input style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input.TextArea readOnly />
        </Form.Item>
        <Form.Item name="pinCode" label="PinCode">
          <InputNumber style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item name="emergencyPhone" label="Emergency Phone Number">
          <Input style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item name="policePhone" label="Police Phone Number">
          <Input style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item name="aadhaarURL" label="Aadhaar Card">
          <Button>Open In New Tab</Button>
        </Form.Item>
        <Form.Item name="displayPictureURL" label="Display Picture">
          <Button>Open In New Tab</Button>
        </Form.Item>
        {selectionKey === "service" && (
          <>
            <Form.Item name="certificateURL" label="Your Degree/Certificate">
              <Button>Open In New Tab</Button>
            </Form.Item>
            <Form.Item name="hourlyFees" label="Hourly Fees">
              <InputNumber style={{ width: "100%" }} readOnly/>
            </Form.Item>
            <Form.Item
              name="service"
              label="Applied as: "
              className="sign-up-options"
            >
              <Select mode="multiple"  defaultValue={['a10', 'c12']} disabled />
            </Form.Item>
          </>
        )}
        <Button
          className="approve-btn"
          type="primary"
          onClick={() => onApprove()}
        >
          Approve
        </Button>
        <Button
          className="reject-btn"
          type="secondary"
          onClick={() => onReject()}
        >
          Reject
        </Button>
      </Form>
    </CustomContent>
  );
};

export default ApproveAdminContent;
