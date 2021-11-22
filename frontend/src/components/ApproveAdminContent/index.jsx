import React, { useState } from "react";
import {
  Select,
  Form,
  Button,
  Input,
  DatePicker,
  InputNumber,
  notification,
} from "antd";
import { CustomContent } from "./styles";
import { LeftOutlined } from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";
import { useDispatch } from "react-redux";

const ApproveAdminContent = ({ selectionKey, setScreenView, card_details }) => {
  const plainOptions = ["Nanny", "Nurse"];
  const dispatch = useDispatch();

  const onApprove = async (_id) => {
    if (selectionKey === "client") {
      const values = { clientId: _id };
      await Axios.post(`${ROOT_URL}/admin/approveClient`, values)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_ADMIN_DATA,
              admin_data: res.data.data.pendingApprovalClients,
            });
            setScreenView("cards");
            notification.success({
              message: `Success`,
              description: "Approved successfully",
              placement: "bottomLeft",
            });
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
      const values = { serviceProviderId: _id };
      await Axios.post(`${ROOT_URL}/admin/approveServiceProvider`, values)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_ADMIN_DATA,
              admin_data: res.data.data.pendingApprovalServiceProviders,
            });
            setScreenView("cards");
            notification.success({
              message: `Success`,
              description: "Approved successfully",
              placement: "bottomLeft",
            });
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
  const onReject = async (_id) => {
    if (selectionKey === "client") {
      const values = { clientId: _id };
      await Axios.post(`${ROOT_URL}/admin/rejectClient`, values)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_ADMIN_DATA,
              admin_data: res.data.data.pendingApprovalClients,
            });
            notification.success({
              message: `Success`,
              description: "Rejected successfully",
              placement: "bottomLeft",
            });
            setScreenView("cards");
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
      const values = { serviceProviderId: _id };
      await Axios.post(`${ROOT_URL}/admin/rejectServiceProvider`, values)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            dispatch({
              type: actionTypes.CHANGE_ADMIN_DATA,
              admin_data: res.data.data.pendingApprovalServiceProviders,
            });
            notification.success({
              message: `Success`,
              description: "Rejected successfully",
              placement: "bottomLeft",
            });
            setScreenView("cards");
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

  const {
    _id,
    aadhaarURL,
    address,
    displayPictureURL,
    dob,
    email,
    emergencyPhone,
    name,
    phoneNumber,
    pinCode,
    policePhone,
    certificateURL,
    dailyFees,
    serviceType,
  } = card_details;
  return (
    <CustomContent>
      <Button
        className="back-btn"
        type="primary"
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => {
          setScreenView("cards");
        }}
      />
      {console.log(card_details)}
      <div className="title">Approve The Details</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Name">
          <Input value={name} placeholder="Enter your name" readOnly />
        </Form.Item>

        <Form.Item label="DOB">
          <Input value={dob} placeholder="Enter your dob" readOnly />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={email} readOnly />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input value={phoneNumber} style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item label="Address">
          <Input.TextArea value={address} readOnly />
        </Form.Item>
        <Form.Item label="PinCode">
          <InputNumber value={pinCode} style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item label="Emergency Phone Number">
          <Input value={emergencyPhone} style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item label="Police Phone Number">
          <Input value={policePhone} style={{ width: "100%" }} readOnly />
        </Form.Item>
        <Form.Item value={aadhaarURL} label="Aadhaar Card">
          <a href={aadhaarURL} target="_blank">
            <Button>Open In New Tab</Button>
          </a>
        </Form.Item>
        <Form.Item value={displayPictureURL} label="Display Picture">
          <a href={displayPictureURL} target="_blank">
            <Button>Open In New Tab</Button>
          </a>
        </Form.Item>
        {selectionKey === "service" && (
          <>
            <Form.Item label="Your Degree/Certificate">
              <a href={certificateURL} target="_blank">
                <Button>Open In New Tab</Button>
              </a>
            </Form.Item>
            <Form.Item label="Daily Fees">
              <InputNumber
                value={dailyFees}
                style={{ width: "100%" }}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Applied as: " className="sign-up-options">
              <Select value={serviceType} mode="multiple" disabled />
            </Form.Item>
          </>
        )}
        <Button
          className="approve-btn"
          type="primary"
          onClick={() => onApprove(_id)}
        >
          Approve
        </Button>
        <Button
          className="reject-btn"
          type="secondary"
          onClick={() => onReject(_id)}
        >
          Reject
        </Button>
      </Form>
    </CustomContent>
  );
};

export default ApproveAdminContent;
