import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Upload } from "antd";
import { Axios } from "axios";
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

const plainOptions = ["Nanny", "Nurse"];

const RegisterServiceProvider = () => {
  const [checkedList, setCheckedList] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [uploadedURLs, setUploadedURLs] = useState(["", "", ""]);
  const onChange = (list) => {
    setCheckedList(list);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleRegister = (values) => {
    //API to register
    const formattedValues = {
      ...values,
      service: checkedList,
      dob: values["dob"].format("YYYY-MM-DD"),
      aadhaarURL: uploadedURLs[0],
      certificateURL: uploadedURLs[1],
      displayPictureURL: uploadedURLs[2],
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
          onFinish={handleRegister}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomForm.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <CustomInput placeholder="Enter your name" />
          </CustomForm.Item>

          <CustomForm.Item name="dob" label="DOB">
            <DatePicker />
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
            name="service"
            label="Sign Up as: "
            className="sign-up-options"
          >
            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </CustomForm.Item>
          <CustomForm.Item name="hourlyFees" label="Hourly Fees">
            <CustomInputNumber style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item name="aadhaarURL" label="Aadhaar Card">
            <Upload onChange={handleChange(0)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item
            name="certificateURL"
            label="Your Degree/Certificate"
          >
            <Upload onChange={handleChange(1)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item name="displayPictureURL" label="Display Picture">
            <Upload onChange={handleChange(2)} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item>
            <SubmitButton type="primary" htmlType="submit">
              Submit
            </SubmitButton>
          </CustomForm.Item>
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

export default RegisterServiceProvider;
