import React, { useState } from "react";
import { Avatar, Button, Col, notification, Row } from "antd";
import { CustomContent } from "./styles";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import ReviewCard from "../Cards/ReviewCard";

const CancelAdminContent = ({ selectionKey, setScreenView }) => {
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
            <div className="reason">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type s
            </div>
            <div className="actions">
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
            </div>
          </Col>
          <Col>
            <div className="reviews">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
          </Col>
        </Row>
      </div>
    </CustomContent>
  );
};

export default CancelAdminContent;
