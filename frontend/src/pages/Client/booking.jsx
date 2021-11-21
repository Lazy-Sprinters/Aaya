import React, { useEffect, useState } from "react";
import { ClientBody, ActionContainer, Heading, CustomLayout } from "./styles";
import { useDispatch } from "react-redux";
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
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

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
  const getData = (event) => {
    const key = event.key;
    setKey(key);
    setScreenView(key);
    console.log(key);
    if (key === "requests") {
    } else if (key === "current") {
    } else {
    }
  };
  const viewOnClick = () => {
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
            <span className="Name" onClick={() => openClient()}>Client</span>
          </span>
          <span className="tab">
            <span className="Name" onClick={() => openBooking()}>Your Bookings</span>
          </span>
          <span className="tab">
            <span className="Name" onClick={() => logout()}>
              LogOut
            </span>
          </span>
        </div>
      </ActionContainer>
      <Heading>Yaha tag line aayega</Heading>
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
              <AdminInfoCard rating width={350} viewOnClick={viewOnClick} />
            </Content>
          )}
          {screenView === "detailedRequest" && (
            <Content className="search-content">
              <CancelServiceContent showStatus setScreenView={setScreenView} />
            </Content>
          )}
          {screenView === "current" && (
            <Content className="search-content">
              <CancelServiceContent setScreenView={setScreenView} />
            </Content>
          )}
          {screenView === "past" && (
            <Content className="search-content">
              <AdminInfoCard
                rating
                width={350}
                feedback
                viewOnClick={viewOnClick}
              />
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
