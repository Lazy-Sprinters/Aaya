import React, { useState } from "react";
import { CustomCard } from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Avatar, Button, Rate } from "antd";

const { Meta } = CustomCard;

const AdminInfoCard = ({
  name,
  phoneNumber,
  imgSrc,
  avatarSrc,
  viewOnClick,
  selectionKey,
  rating,
  width,
  feedback
}) => {
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
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[<div onClick={() => viewOnClick()}>{feedback ? "Give Feedback" :"View"}</div>]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Name"
        description={[
          <div>
            <p>Phone Number</p>
            {(selectionKey === "cancel" || rating) && (
              <p>
                <span>
                  Rating: <Rate disabled defaultValue={4} />
                </span>
                {rating && <span className="price">₹ 600</span>}
              </p>
            )}
          </div>,
        ]}
      />
    </CustomCard>
  );
};

export default AdminInfoCard;
