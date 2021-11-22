import React, { useEffect, useState } from "react";
import { ClientBody, ActionContainer, Heading, CustomLayout } from "./styles";
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

const ClientBooking = () => {
  const [screenView, setScreenView] = useState("requests");
  const [selectionKey, setKey] = useState("requests");
  const [cardData, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const client_service_data = useSelector((state) => state.client_service_data);
  const timeSpecs = useSelector((state) => state.client_service_data.Ti);
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
      await Axios.post(`${ROOT_URL}/serviceProvider/getAllRequests`)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_CLIENT_SERVICE_DATA,
              client_service_data: {
                timeSpecs,
                filteredList: res.data.data.filteredList,
              },
            });
            setData(res.data.data.filteredList);
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
      await Axios.post(`${ROOT_URL}/serviceProvider/getAllRequests`)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_CLIENT_SERVICE_DATA,
              client_service_data: {
                timeSpecs,
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
    } else {
      await Axios.post(`${ROOT_URL}/serviceProvider/getAllRequests`)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_CLIENT_SERVICE_DATA,
              client_service_data: {
                timeSpecs,
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
  const openBooking = () => {
    //APi for logout admin
    navigate("/clientBooking");
  };
  const openClient = () => {
    //APi for logout admin
    navigate("/client");
  };
  useEffect(() => {
    //API for getting data from redux
    setData(client_service_data.filteredList);
    console.log(client_service_data.filteredList)
  }, []);

  return (
    <ClientBody>
      <ActionContainer>
        <img
          src="/images/navLogo.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
        />

        <div className="navbar-actions">
          <span className="tab">
            <Avatar className="avatar" size="small" icon={<UserOutlined />} />
            <span className="Name" onClick={() => openClient()}>
              Client
            </span>
          </span>
          <span className="tab">
            <span className="Name" onClick={() => openBooking()}>
              Your Bookings
            </span>
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
                Current Booking
              </Menu.Item>
              <Menu.Item key="past" icon={<AuditOutlined />}>
                Past Bookings
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
                showStatus
                setScreenView={setScreenView}
              />
            </Content>
          )}
          {screenView === "current" && (
            <Content className="search-content">
              <CancelServiceContent
                card_details={cardData[0]}
                setScreenView={setScreenView}
              />
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
    </ClientBody>
  );
};

export default ClientBooking;
