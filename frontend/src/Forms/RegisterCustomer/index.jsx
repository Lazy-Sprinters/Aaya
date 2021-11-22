import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, notification, Upload } from "antd";
import React, { useState } from "react";
import TnC from "../../components/Modals/TnC";
import { Footer } from "../../pages/Home/styles";
import { useSelector } from "react-redux";
import {
  ActionContainer,
  CustomForm,
  CustomInput,
  CustomInputNumber,
  FormBody,
  FormTitle,
  FormWrapper,
  SubmitButton,
} from "../styles";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";


const RegisterCustomer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [formattedValues, setFormattedValues] = useState("");
  const [uploadedURLs, setUploadedURLs] = useState(["", ""]);
  const [uploadedFiles, setUploadedFiles] = useState([[], []]);
  const phoneNumberVerified = useSelector((state) => state.phoneNumberVerified);
  const navigate =useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleRegister = (values) => {
    //API to register
    const formattedValues = {
      ...values,
      dob: values["dob"].format("DD/MM/YYYY"),
      aadhaarURL: uploadedURLs[0],
      displayPictureURL: uploadedURLs[1],
      phoneNumberVerified,
      emailVerified:true,
    };
    setFormattedValues(formattedValues)
    console.log(formattedValues);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const handleTnC = async() => {
    await Axios.post(`${ROOT_URL}/client/signup`, formattedValues)
    .then((res) => {
      // Check res
      console.log(res);
      if (res.data.status === 201) {
        navigate("/");
        notification.success({
          message: `Success`,
          description: "Check you email address for further steps",
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
    setModalVisible(false);
  };
  const handleChange =
    (index) =>
    ({ fileList }) => {
      console.log(fileList);
      let updatedFiles = uploadedFiles;
      updatedFiles[index] = fileList;
      setUploadedFiles(updatedFiles);
    };
    const handleUpload = async (index) => {
      console.log("hey");
      const fileList = uploadedFiles[index];
      let formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      console.log(formData)
      let updatedURLs = uploadedURLs;
      await Axios.post(`${ROOT_URL}/library/upload`, formData)
        .then((res) => {
          // Check res
          console.log(res);
          if (res.data.status === 200) {
            updatedURLs[index] = res.data.data.file_url[0];
            setUploadedURLs(updatedURLs);
            notification.success({
              message: `Success`,
              description: res.data.message,
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
      let updatedFiles = uploadedFiles;
      updatedFiles[index] = [];
      setUploadedFiles(updatedFiles);
    };
    const back = () => {
      navigate('/');
    };
  return (
    <FormBody>
      <ActionContainer>
        <img src="/images/navLogo.svg" alt="logo" />
        <div onClick={() =>back()}>Back</div>
      </ActionContainer>
      <FormTitle>Enter your Details</FormTitle>

      <FormWrapper>
        <CustomForm
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleRegister}
          onFinishFailed={onFinishFailed}
        >
          <CustomForm.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <CustomInput placeholder="Enter your name" />
          </CustomForm.Item>

          <CustomForm.Item name="dob" label="DOB">
            <DatePicker style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item name="email" label="Email">
            <CustomInput />
          </CustomForm.Item>
          <CustomForm.Item name="password" label="Password">
            <CustomInput.Password />
          </CustomForm.Item>
          <CustomForm.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <CustomInput style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item name="address" label="Address">
            <CustomInput.TextArea />
          </CustomForm.Item>
          <CustomForm.Item name="pinCode" label="PinCode">
            <CustomInputNumber style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item name="aadhaarURL" label="Aadhaar Card">
            <Upload
              onChange={handleChange(0)}
              beforeUpload={() => handleUpload(0)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Select</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item name="displayPictureURL" label="Display Picture">
            <Upload
              beforeUpload={() => handleUpload(1)}
              onChange={handleChange(1)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Select</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item
            name="emergencyPhone"
            label="Emergency Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your emergency phone number!",
              },
            ]}
          >
            <CustomInput style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item
            name="policePhone"
            label="Police Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your police phone number!",
              },
            ]}
          >
            <CustomInput style={{ width: "100%" }} />
          </CustomForm.Item>
          <SubmitButton type="primary" htmlType="submit">
            Submit
          </SubmitButton>
        </CustomForm>
      </FormWrapper>
      <Footer>
        <div>© LazySprinters 2021 </div>
        <div>Terms and Condition</div>
      </Footer>
      {isModalVisible && (
        <TnC
          isModalVisible={isModalVisible}
          hideModal={hideModal}
          handleTnC={handleTnC}
        />
      )}
    </FormBody>
  );
};

export default RegisterCustomer;
