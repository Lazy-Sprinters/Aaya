import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, notification, Upload } from "antd";
import Axios from "axios";
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
import { ROOT_URL } from "../../App";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const plainOptions = ["Nanny", "Nurse"];

const RegisterServiceProvider = () => {
  const [checkedList, setCheckedList] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [uploadedURLs, setUploadedURLs] = useState(["", "", ""]);
  const [formattedValues, setFormattedValues] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([[], [], []]);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  const phoneNumberVerified = useSelector((state) => state.phoneNumberVerified);
  const role = useSelector((state) => state.role);
  const navigate = useNavigate();

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
      phoneNumber:phoneNumber,
      phoneNumberVerified:true,
      emailVerified:true,
      serviceType: checkedList,
      dob: values["dob"].format("YYYY-MM-DD"),
      aadhaarURL: uploadedURLs[0],
      certificateURL: uploadedURLs[1],
      displayPictureURL: uploadedURLs[2],
    };
    console.log(formattedValues);
    setFormattedValues(formattedValues)
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const handleTnC = async() => {
    await Axios.post(`${ROOT_URL}/serviceProvider/signup`, formattedValues)
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
            label="Phone Number"
          >
            <CustomInput
              value={phoneNumber}
              readOnly
              style={{ width: "100%" }}
            />
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
            label="Apply as: "
            className="sign-up-options"
          >
            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </CustomForm.Item>
          <CustomForm.Item name="dailyFees" label="Daily Fees">
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
          <CustomForm.Item
            name="certificateURL"
            label="Your Degree/Certificate"
          >
            <Upload
              beforeUpload={() => handleUpload(1)}
              onChange={handleChange(1)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Select</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item name="displayPictureURL" label="Display Picture">
            <Upload
              beforeUpload={() => handleUpload(2)}
              onChange={handleChange(2)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Select</Button>
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
