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

const CancelServiceContent = ({
  card_details,
  showCancel,
  showStatus,
  showApprove,
  setScreenView,
}) => {
  const [cancelStatus, setCancelStatus] = useState(false);
  const onApprove = (_id) => {
    setScreenView("requests");
    notification.success({
      message: `Success`,
      description: "Approved successfully",
      placement: "bottomLeft",
    });
  };
  const onCancel = () => {
    setCancelStatus(true);
  };
  const onReject = (_id) => {
    setScreenView("requests");
    notification.success({
      message: `Success`,
      description: "Rejected successfully",
      placement: "bottomLeft",
    });
  };
  const onCancelSubmit = (_id) => {
    setScreenView("requests");
    notification.success({
      message: `Success`,
      description: "Canceled successfully",
      placement: "bottomLeft",
    });
  };

  const {
    name,
    dob,
    phoneNumber,
    address,
    pinCode,
    startDate,
    endDate,
    startTimeDay,
    endTimeDay,
    requirement,
    emergencyPhone,
    policePhone,
    patientNotes,
    patientDescription,
    aadhaarURL,
    displayPictureURL,
    _id,
  } = card_details || {};

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
                <div className="reason"></div>

                <div className="actions">
                  <Button
                    className="approve-btn"
                    type="primary"
                    onClick={() => onApprove(_id)}
                    style={{ backgroundColor: "green" }}
                  >
                    Approve
                  </Button>
                  <Button
                    className="reject-btn"
                    type="secondary"
                    onClick={() => onReject(_id)}
                    style={{ backgroundColor: "red" }}
                  >
                    Reject
                  </Button>
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
            {showCancel && (
              <div>
                <div className="reason">
                  Do you wish to cancel your service. This might lead to a
                  penalty and decrease in you earning on the platform. Kindly go
                  through the conditions once again.
                  {cancelStatus && (
                    <>
                      <Form.Item label="Reason for cancellation">
                        <Input.TextArea />
                      </Form.Item>
                      <Button
                        className="reject-btn"
                        type="secondary"
                        onClick={() => onCancelSubmit(_id)}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </div>
                <div className="actions">
                  {!cancelStatus && (
                    <Button
                      className="reject-btn"
                      type="secondary"
                      onClick={() => onCancel()}
                      style={{ backgroundColor: "red" }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            )}
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
                <Form.Item label="Name">
                  <Input value={name} placeholder="Enter your name" readOnly />
                </Form.Item>

                <Form.Item label="DOB">
                  <Input value={dob} style={{ width: "100%" }} readOnly />
                </Form.Item>
                <Form.Item label="Phone Number">
                  <Input
                    value={phoneNumber}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Address">
                  <Input.TextArea value={address} readOnly />
                </Form.Item>
                <Form.Item label="PinCode">
                  <InputNumber
                    value={pinCode}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Start Date">
                  <InputNumber
                    value={startDate}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="End Date">
                  <InputNumber
                    value={endDate}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Start Time Day">
                  <InputNumber
                    value={startTimeDay}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="End Time Day">
                  <InputNumber
                    value={endTimeDay}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Requirement: " className="sign-up-options">
                  <Input
                    value={requirement}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Emergency Phone Number">
                  <Input
                    value={emergencyPhone}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Police Phone Number">
                  <Input
                    value={policePhone}
                    style={{ width: "100%" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Aadhaar Card">
                  <a href={aadhaarURL} target="_blank">
                    <Button>Open In New Tab</Button>
                  </a>
                </Form.Item>
                <Form.Item label="Display Picture">
                  <a href={displayPictureURL} target="_blank">
                    <Button>Open In New Tab</Button>
                  </a>
                </Form.Item>
                <Form.Item label="Patient Notes">
                  <Input.TextArea value={patientNotes} readOnly />
                </Form.Item>
                <Form.Item label="Patient Description">
                  <Input.TextArea value={patientDescription} readOnly />
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
