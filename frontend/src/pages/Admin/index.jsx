import React, { useEffect, useState } from "react";
import {} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { Layout, Menu, Avatar, Badge, notification } from "antd";
import {
  FormOutlined,
  BarsOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomLayout } from "./styles";
import AdminInfoCard from "../../components/Cards/AdminInfoCard";
import ApproveAdminContent from "../../components/ApproveAdminContent";
import CancelAdminContent from "../../components/CancelAdminContent";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Admin = () => {
  const [cardData, setData] = useState([]);
  const [selectionKey, setKey] = useState("client");
  const [screenView, setScreenView] = useState("cards");
  const [index, setIndex] = useState(0);
  const admin_data = useSelector((state) => state.admin_data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async(event) => {
    setScreenView("cards");
    const key = event.key;
    setKey(key);
    console.log(key);
    if (key === "client") {
      await Axios.post(`${ROOT_URL}/admin/listPendingApprovalClients`)
      .then((res) => {
        // Check res
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: actionTypes.CHANGE_ADMIN_DATA,
            admin_data: res.data.data.pendingApprovalClients,
          });
          setData(res.data.data.pendingApprovalClients);
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
    } else if (key === "service") {
      await Axios.post(`${ROOT_URL}/admin/listPendingApprovalServiceProviders`)
      .then((res) => {
        // Check res
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: actionTypes.CHANGE_ADMIN_DATA,
            admin_data: res.data.data.pendingApprovalServiceProviders,
          });
          setData(res.data.data.pendingApprovalServiceProviders);
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
      await Axios.post(`${ROOT_URL}/admin/listCancellationRequests`)
      .then((res) => {
        // Check res
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: actionTypes.CHANGE_ADMIN_DATA,
            admin_data: res.data.data.requests,
          });
          setData(res.data.data.requests);
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
    console.log(selectionKey);
    setIndex(index)
    if (selectionKey === "client" || selectionKey === "service") {
      setScreenView("approveDetails");
      //Open modal with info on it and approval
    } else {
      setScreenView("cancelDetails");
      // opens modal with reason of cancel and past reviews and counts
    }
  };
  const logout = () => {
    //APi for logout admin
    navigate("/");
  };
  useEffect(() => {
    setData(admin_data);
  }, []);
  return (
    <CustomLayout>
      <Header className="header">
        <img
          src="/images/adminLogo.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
        />
        <div className="navbar-actions">
          <span className="tab">
            <Badge className="notif-badge" count={4}>
              <BellOutlined className="notif" />
            </Badge>
          </span>
          <span className="tab">
            <Avatar className="avatar" size="small" icon={<UserOutlined />} />
            <span className="Name">Admin</span>
          </span>
          <span className="tab">
            <span className="Name" onClick={() => logout()}>
              Logout
            </span>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider collapsible width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["client"]}
            defaultOpenKeys={["approve"]}
            style={{ height: "100%", borderRight: 0 }}
            onSelect={e => getData(e)}
          >
            <SubMenu
              key="approve"
              icon={<FormOutlined />}
              title="Registration Approval"
            >
              <Menu.Item key="client">Client</Menu.Item>
              <Menu.Item key="service">Service Providers</Menu.Item>
            </SubMenu>
            <Menu.Item key="cancel" icon={<BarsOutlined />}>
              Cancellation Reason
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#DEEAF8" }}>
          {screenView === "cards" && (
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {cardData.map((cardDetails,index) => (
                <AdminInfoCard
                  cardDetails={cardDetails}
                  viewOnClick={() => viewOnClick(index)}
                  selectionKey={selectionKey}
                />
              ))}
            </Content>
          )}
          {screenView === "approveDetails" && (
            <ApproveAdminContent
              selectionKey={selectionKey}
              setScreenView={setScreenView}
              card_details={cardData[index]}
            />
          )}
          {screenView === "cancelDetails" && (
            <CancelAdminContent
            cardDetails={cardData[index]}
              selectionKey={selectionKey}
              setScreenView={setScreenView}
            />
          )}
        </Layout>
      </Layout>
    </CustomLayout>
  );
};

export default Admin;
