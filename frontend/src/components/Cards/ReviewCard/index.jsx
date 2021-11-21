import React, { useState } from "react";
import { CustomCard } from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Avatar, Button, Rate } from "antd";

const { Meta } = CustomCard;

const ReviewCard = ({
  name,
  phoneNumber,
  imgSrc,
  avatarSrc,
  viewOnClick,
  selectionKey,
}) => {
  return (
    <CustomCard
      style={{ width: 550, flex: "0 1 20%", margin: "10px 8px" }}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Name"
        description={[
          <div>
            <p>
              Rating: <Rate disabled defaultValue={4} />
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>,
        ]}
      />
    </CustomCard>
  );
};

export default ReviewCard;
