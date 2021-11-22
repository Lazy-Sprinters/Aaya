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
  review,
}) => {
  const { text, reviewRating } = review;
  return (
    <CustomCard style={{ width: 550, flex: "0 1 20%", margin: "10px 8px" }}>
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        description={[
          <div>
            <p>
              Rating: <Rate disabled defaultValue={reviewRating} />
            </p>
            <p>{text}</p>
          </div>,
        ]}
      />
    </CustomCard>
  );
};

export default ReviewCard;
