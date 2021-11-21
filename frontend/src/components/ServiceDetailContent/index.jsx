import React, { useState } from "react";
import { Avatar, Button, Checkbox, Col, notification, Row } from "antd";
import { CustomContent } from "./styles";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import ReviewCard from "../Cards/ReviewCard";
import TnC from "../Modals/TnC";

const ServiceDetailContent = ({ setScreenView }) => {
  const plainOptions = ["Nanny", "Nurse"];
  const [foodProvision, setFoodProvision] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [RequestStatus, setRequestStatus] = useState(false);

  const onApprove = () => {
    console.log("approved");
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const handleTnC = () => {
    setScreenView("cards");
    notification.success({
      message: `Success`,
      description: "Approved successfully",
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
            {!RequestStatus && (
              <div className="reason">
                <Checkbox
                  onChange={(e) => setFoodProvision(e.target.checked)}
                />{" "}
                Will you be able to provide and food and other amenities to the
                service providers exclusive of the pay?
              </div>
            )}
            <div className="actions">
              <Button
                className="approve-btn"
                type="primary"
                onClick={() => onApprove()}
                style={{ backgroundColor: RequestStatus ? "yellow" : "green" }}
              >
                {RequestStatus ? "Pending" : "Request"}
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
      {isModalVisible && (
        <TnC
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          handleTnC={handleTnC}
        />
      )}
    </CustomContent>
  );
};

export default ServiceDetailContent;
