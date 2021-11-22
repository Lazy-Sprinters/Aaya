import React, { useState } from "react";
import { Avatar, Button, Checkbox, Col, notification, Row } from "antd";
import { CustomContent } from "./styles";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import ReviewCard from "../Cards/ReviewCard";
import TnC from "../Modals/TnC";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const ServiceDetailContent = ({ timeSpecs, patientId,clientId,card_details,setScreenView,setData }) => {
  const plainOptions = ["Nanny", "Nurse"];
  const [foodProvision, setFoodProvision] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [serviceProviderId, setServiceProviderId] = useState("");
  const [RequestStatus, setRequestStatus] = useState(false);
  const dispatch = useDispatch();

  const onApprove = serviceProviderId => {
    setServiceProviderId(serviceProviderId)
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const handleTnC = async() => {
    setScreenView("cards");
    const values={timeSpecs,serviceProviderId,patientId,clientId,foodProvision};
    await Axios.post(`${ROOT_URL}/client/notifyServiceProvider`,values)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_CLIENT_SERVICE_DATA,
              client_service_data: res.data.data,
            });
            setData(res.data.data.filteredList);
            notification.success({
              message: `Success`,
              description: "Approved successfully",
              placement: "bottomLeft",
            });
          } else {
            notification.error({
              message: `Error`,
              description: res.data.message,
              placement: "bottomLeft",
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    
  };
  const {name,reviews,serviceType,_id} =card_details
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
                  <div>Name: {name}</div>
                  <div>Service Type : {serviceType[0]}</div>
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
                onClick={() => onApprove(_id)}
                style={{ backgroundColor: RequestStatus ? "yellow" : "green" }}
              >
                {RequestStatus ? "Pending" : "Request"}
              </Button>
            </div>
          </Col>
          <Col>
            <div className="reviews">
            {reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
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
