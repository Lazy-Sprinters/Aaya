import React, { useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Form,
  notification,
  Row,
  Input,
  InputNumber,
} from "antd";
import { CustomContent } from "./styles";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import ReviewCard from "../Cards/ReviewCard";

const CancelServiceContent = ({ showStatus, showApprove, setScreenView }) => {
  const [rejectStatus, setRejectStatus] = useState(false);
  const onApprove = () => {
    setScreenView("requests");
    notification.success({
      message: `Success`,
      description: "Approved successfully",
      placement: "bottomLeft",
    });
  };
  const onReject = () => {
    setRejectStatus(true);
  };
  const onSubmit = () => {
    setScreenView("requests");
    notification.success({
      message: `Success`,
      description: "Rejected successfully",
      placement: "bottomLeft",
    });
  };
  return (
    <CustomContent>
      {(showApprove || showStatus) && (
        <Button
          className="back-btn"
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => {
            setScreenView("requests");
          }}
        />
      )}
      <div className="body">
        <Row>
          <Col className="fixed-container">
            <div className="header">
              <Row>
                <Avatar size={128} icon={<UserOutlined />} />
                <div className="details">
                  <div>Name: Name</div>
                  <div>Phone: Phone Number</div>
                </div>
              </Row>
            </div>
            {showApprove ? (
              <>
                <div className="reason">
                  {rejectStatus && (
                    <>
                      <Form.Item label="Reason for Rejection">
                        <Input.TextArea />
                      </Form.Item>
                      <Button
                        className="reject-btn"
                        type="secondary"
                        onClick={() => onSubmit()}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </div>

                <div className="actions">
                  <Button
                    className="approve-btn"
                    type="primary"
                    onClick={() => onApprove()}
                    style={{ backgroundColor: "green" }}
                  >
                    Approve
                  </Button>
                  {!rejectStatus && (
                    <Button
                      className="reject-btn"
                      type="secondary"
                      onClick={() => onReject()}
                      style={{ backgroundColor: "red" }}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </>
            ) : showStatus ? (
              <div className="price">
                Status
                <div className="value">Approved/Rejected/Pending</div>
              </div>
            ) : (
              <div className="price">
                Payment
                <div className="value">₹3600</div>
              </div>
            )}
          </Col>
          <Col>
            <div className="description">
              <div className="title">Patient Details</div>
              <Form
                name="pateint"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item name="name" label="Name">
                  <Input placeholder="Enter your name" readOnly />
                </Form.Item>

                <Form.Item name="dob" label="DOB">
                  <Input style={{ width: "100%" }} readOnly />
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
                <Form.Item name="startDate" label="Start Date">
                  <InputNumber style={{ width: "100%" }} readOnly />
                </Form.Item>
                <Form.Item name="endDate" label="End Date">
                  <InputNumber style={{ width: "100%" }} readOnly />
                </Form.Item>
                <Form.Item name="startTimeDay" label="Start Time Day">
                  <InputNumber style={{ width: "100%" }} readOnly />
                </Form.Item>
                <Form.Item name="endTimeDay" label="End Time Day">
                  <InputNumber style={{ width: "100%" }} readOnly />
                </Form.Item>
                <Form.Item
                  name="requirement"
                  label="Requirement: "
                  className="sign-up-options"
                >
                  <Input style={{ width: "100%" }} readOnly />
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
                <Form.Item name="patientNotes" label="Patient Notes">
                  <Input.TextArea readOnly />
                </Form.Item>
                <Form.Item
                  name="patientDescription"
                  label="Patient Description"
                >
                  <Input.TextArea readOnly />
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </CustomContent>
  );
};

export default CancelServiceContent;
