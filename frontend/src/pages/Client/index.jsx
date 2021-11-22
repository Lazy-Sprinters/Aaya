import React, { useState } from "react";
import {
  ClientBody,
  ActionContainer,
  Heading,
  BookButton,
  DetailsSection,
  ImgWrapper,
} from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Client = () => {
  const navigate = useNavigate();
  const book = () => {
    navigate("/patientDetails");
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
      <BookButton type="primary" onClick={() => book()}>
        Book Now
      </BookButton>
      <DetailsSection>
        <ImgWrapper>
          <img src="https://picsum.photos/800" alt="details" />
        </ImgWrapper>
        <div class="description">
          <div class="title">Nurse</div>
          <div class="content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown{" "}
          </div>
          <div className="price">₹ 600-1600</div>
        </div>
      </DetailsSection>
      <DetailsSection>
        <div class="description" style={{ textAlign: "right" }}>
          <div class="title">Nanny</div>
          <div class="content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown{" "}
          </div>
          <div className="price">₹ 600-1600</div>
        </div>
        <ImgWrapper>
          <img src="https://picsum.photos/800" alt="details" />
        </ImgWrapper>
      </DetailsSection>
    </ClientBody>
  );
};

export default Client;
