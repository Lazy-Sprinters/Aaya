import React, { useEffect, useState } from "react";
import { ServiceBody, ActionContainer, Heading, CustomLayout } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { Avatar, Menu, Slider, Row, notification } from "antd";
import {
  AuditOutlined,
  FileDoneOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import AdminInfoCard from "../../components/Cards/AdminInfoCard";
import CancelServiceContent from "../../components/CancelServiceContent";
import Feedback from "../../components/Modals/Feedback";

const Service = () => {
  const [screenView, setScreenView] = useState("requests");
  const [selectionKey, setKey] = useState("requests");
  const [cardData, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const service_data = useSelector((state) => state.service_data);
  const token = useSelector((state) => state.service_data.token);
  const serviceProviderId = useSelector(
    (state) => state.service_data.serviceProviderId
  );
  const dispatch = useDispatch();

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleFeedback = () => {
    setModalVisible(false);
    notification.success({
      message: `Success`,
      description: "Feedback submitted Successfully",
      placement: "bottomLeft",
    });
  };
  const getData = async (event) => {
    const key = event.key;
    setKey(key);
    setScreenView(key);
    console.log(key);
    if (key === "requests") {
      await Axios.post(`${ROOT_URL}/serviceProvider/getAllRequests`,{serviceProviderId})
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_SERVICE_DATA,
              service_data: {
                token,
                serviceProviderId,
                pendingRequests: res.data.data.pendingRequests,
              },
            });
            setData(res.data.data.pendingRequests);
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
    } else if (key === "current") {
      await Axios.post(`${ROOT_URL}/serviceProvider/currentRequests`,{serviceProviderId})
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_SERVICE_DATA,
              service_data: {
                token,
                serviceProviderId,
                allCurrentRequests: res.data.data.allCurrentRequests,
              },
            });
            setData(res.data.data.allCurrentRequests);
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
    } else {
      await Axios.post(`${ROOT_URL}/serviceProvider/pastRequests`,{serviceProviderId})
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_SERVICE_DATA,
              service_data: {
                token,
                serviceProviderId,
                allCompletedRequests: res.data.data.allCompletedRequests,
              },
            });
            setData(res.data.data.allCompletedRequests);
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
    }
  };
  const viewOnClick = (index) => {
    setIndex(index);
    if (selectionKey === "requests") {
      setScreenView("detailedRequest");
    } else if (selectionKey === "past") {
      setModalVisible(true);
    }
  };
  const logout = () => {
    //APi for logout admin
    navigate("/");
  };
  useEffect(() => {
    setData(service_data.pendingRequests);
  }, []);

  return (
    <ServiceBody>
      <ActionContainer>
        <img
          src="/images/navLogo.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
        />

        <div className="navbar-actions">
          <span className="tab">
            <Avatar className="avatar" size="small" icon={<UserOutlined />} />
            <span className="Name">Service Prov</span>
          </span>
          <span className="tab">
            <span className="Name" onClick={() => logout()}>
              LogOut
            </span>
          </span>
        </div>
      </ActionContainer>
      <Heading>Aaya</Heading>
      <CustomLayout>
        <Row>
          <Sider collapsible width={250} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["requests"]}
              defaultOpenKeys={["requests"]}
              style={{ height: "100%", borderRight: 0 }}
              onSelect={getData}
            >
              <Menu.Item key="requests" icon={<SnippetsOutlined />}>
                Requests
              </Menu.Item>
              <Menu.Item key="current" icon={<FileDoneOutlined />}>
                Current Job
              </Menu.Item>
              <Menu.Item key="past" icon={<AuditOutlined />}>
                Past Jobs
              </Menu.Item>
            </Menu>
          </Sider>

          {screenView === "requests" && (
            <Content className="search-content">
              {cardData.map((cardDetails, index) => (
                <AdminInfoCard
                  rating
                  width={350}
                  cardDetails={cardDetails}
                  viewOnClick={() => viewOnClick(index)}
                  selectionKey={selectionKey}
                />
              ))}
            </Content>
          )}
          {screenView === "detailedRequest" && (
            <Content className="search-content">
              <CancelServiceContent
                card_details={cardData[index]}
                showApprove
                setScreenView={setScreenView}
              />
            </Content>
          )}
          {(screenView === "current" && cardData.length>0) && (
            <Content className="search-content">
              <CancelServiceContent
               card_details={cardData[0]} showCancel setScreenView={setScreenView} />
            </Content>
          )}
          {screenView === "past" && (
            <Content className="search-content">
              {cardData.map((cardDetails, index) => (
                <AdminInfoCard
                  rating
                  width={350}
                  feedback
                  cardDetails={cardDetails}
                  viewOnClick={() => viewOnClick(index)}
                  selectionKey={selectionKey}
                />
              ))}
            </Content>
          )}
          {isModalVisible && (
            <Feedback
              isModalVisible={isModalVisible}
              hideModal={hideModal}
              handleFeedback={handleFeedback}
            />
          )}
        </Row>
      </CustomLayout>
    </ServiceBody>
  );
};

export default Service;
