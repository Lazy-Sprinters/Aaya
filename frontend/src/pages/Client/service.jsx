import React, { useEffect, useState } from "react";
import { ClientBody, ActionContainer, Heading, CustomLayout } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { Avatar, Checkbox, Slider, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import AdminInfoCard from "../../components/Cards/AdminInfoCard";
import ServiceDetailContent from "../../components/ServiceDetailContent";

const ClientService = () => {
  const [priceFilter, setPriceFilter] = useState([700, 1500]);
  const [ratingFilter, setRatingFilter] = useState([1, 4]);
  const [screenView, setScreenView] = useState("cards");
  const [cardData, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client_service_data = useSelector((state) => state.client_service_data);
  const clientId = useSelector((state) => state.client_data.clientId);
  const timeSpecs = useSelector((state) => state.client_service_data.timeSpecs);
  const patientId = useSelector((state) => state.client_service_data.patientId);
  
  const onPriceChange = (value) => {
    setPriceFilter(value);
  };

  const onRatingChange = (value) => {
    setRatingFilter(value);
  };
  const ratingMarks = {
    0: "0",
    5: "5",
  };
  const priceMarks = {
    600: "₹ 600",
    1600: "₹ 1600",
  };

  const viewOnClick = (index) => {
    setIndex(index)
    setScreenView("requestService");
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
          {/* <span className="tab">
            <span className="Name" onClick={() => openBooking()}>Your Bookings</span>
          </span> */}
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
          <Sider
            theme="light"
            width={300}
            style={{ padding: "10px" }}
            className="site-Customlayout-background"
          >
            <div className="heading">Filters</div>
            <div className="slider">
              <div className="description">
                <span className="title">Price</span>
                <span className="value">
                  {" "}
                  ₹ {priceFilter[0]}-{priceFilter[1]}
                </span>
              </div>
              <Slider
                onChange={onPriceChange}
                step={1}
                range
                max={1600}
                min={600}
                marks={priceMarks}
                defaultValue={[700, 1500]}
              />
            </div>
            <div className="slider">
              <div className="description">
                <span className="title">Range</span>
                <span className="value">
                  {" "}
                  {ratingFilter[0]}-{ratingFilter[1]}
                </span>
              </div>
              <Slider
                onChange={onRatingChange}
                step={0.1}
                marks={ratingMarks}
                range
                max={5}
                defaultValue={[1, 4]}
              />
            </div>
            <div className="checkbox">
              <div className="title">Gender</div>
              <Checkbox defaultChecked={false} /> Male
              <br />
              <Checkbox defaultChecked /> Female
            </div>
          </Sider>

          {screenView === "cards" && (
            <Content className="search-content">
            {cardData.map((cardDetails, index) => (
                <AdminInfoCard
                  rating
                  width={350}
                  service_client
                  cardDetails={cardDetails}
                  viewOnClick={() => viewOnClick(index)}
                />
              ))}
            </Content>
          )}
          {screenView === "requestService" && (
            <Content className="search-content">
              <ServiceDetailContent card_details={cardData[index]} setScreenView={setScreenView} timeSpecs={timeSpecs} clientId={clientId} patientId={patientId} setData={setData}/>
            </Content>
          )}
        </Row>
      </CustomLayout>
    </ClientBody>
  );
};

export default ClientService;
