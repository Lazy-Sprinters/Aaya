import React, { useState } from "react";
import { CustomCard } from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Avatar, Button, Rate } from "antd";

const { Meta } = CustomCard;

const AdminInfoCard = ({
  imgSrc,
  avatarSrc,
  viewOnClick,
  selectionKey,
  rating,
  service_client,
  width,
  feedback,
  cardDetails,
}) => {
  const {name,phoneNumber,displayPictureURL,rating:rating1,calculatedCost,dailyFees} =cardDetails;
  return (
    <CustomCard
      style={{
        width: width ? width : 300,
        flex: "0 1 20%",
        margin: "10px 8px",
      }}
      cover={
        <img
          alt="example"
          src={displayPictureURL}
        />
      }
      actions={[<div onClick={() => viewOnClick()}>{feedback ? "Give Feedback" :"View"}</div>]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={name}
        description={[
          <div>
          {!service_client &&
            <p>Phone Number : {phoneNumber}</p>
          }
            {(selectionKey === "cancel" || rating) && (
              <p>
                <span>
                  Rating: <Rate disabled defaultValue={rating1} />
                </span>
                {rating && <span className="price">₹ {calculatedCost || dailyFees}</span>}
              </p>
            )}
          </div>,
        ]}
      />
    </CustomCard>
  );
};

export default AdminInfoCard;
