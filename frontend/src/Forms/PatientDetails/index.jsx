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
const PatientDetails = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const handleRegister = (values) => {
      //API to register
      const formattedValues={
        ...values,
        'dob':values['dob'].format('YYYY-MM-DD')
    }
    console.log(formattedValues);
    setModalVisible(true);
    };
    const hideModal = () => {
        setModalVisible(false);
    }
    const handleTnC = () => {
      setModalVisible(false);
    }
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
            <DatePicker />
          </CustomForm.Item>
          <CustomForm.Item
            name="phone"
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
          <CustomForm.Item label="Pincode">
            <CustomInputNumber />
          </CustomForm.Item>
          <CustomForm.Item>
            <CustomForm.Item label="Local Police Station No.">
              <CustomInputNumber />
            </CustomForm.Item>
          </CustomForm.Item>
          <CustomForm.Item
            name="emergency"
            label="Emergency Number"
            rules={[
              {
                required: true,
                message: "Please input your Emergency number!",
              },
            ]}
          >
            <CustomInput style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item label="Aadhar Card">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item label="Passport size picture">
            <Upload maxCount={1}>
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

export default PatientDetails;
