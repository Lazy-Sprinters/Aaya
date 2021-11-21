import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Upload } from "antd";
import React, { useState } from "react";
import TnC from "../../components/Modals/TnC";
import { Footer } from "../../pages/Home/styles";
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
const RegisterCustomer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [uploadedURLs, setUploadedURLs] = useState(["", ""]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleRegister = (values) => {
    //API to register
    const formattedValues = {
      ...values,
      dob: values["dob"].format("YYYY-MM-DD"),
      aadhaarURL: uploadedURLs[0],
      displayPictureURL: uploadedURLs[1],
    };
    console.log(formattedValues);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const handleTnC = () => {
    setModalVisible(false);
  };
  const handleChange =
    (index) =>
    ({ fileList }) => {
      console.log(fileList);
      let formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      let updatedURLs = uploadedURLs;
      //   Axios.post("", formData)
      //     .then((res) => {
      //       // Check res
      //       console.log(res);
      //       updatedURLs[index] = res;
      //       setUploadedURLs(updatedURLs);
      //     })
      //     .catch((err) => {
      //       console.log("err", err);
      //     });
    };

  return (
    <FormBody>
      <ActionContainer>
        <img src="/images/navLogo.svg" alt="logo" />
        <div>Logout</div>
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
            <Upload onChange={handleChange(0)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item name="displayPictureURL" label="Display Picture">
            <Upload onChange={handleChange(1)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
