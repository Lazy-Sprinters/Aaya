import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  notification,
  Radio,
  TimePicker,
  Upload,
} from "antd";
import React, { useState } from "react";
import TnC from "../../components/Modals/TnC";
import { Footer } from "../../pages/Home/styles";
import { ROOT_URL } from "../../App";
import Axios from "axios";
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
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions";

const format = "HH:mm";
const PatientDetails = () => {
  const [checkedList, setCheckedList] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [uploadedURLs, setUploadedURLs] = useState(["", "", ""]);
  const [uploadedFiles, setUploadedFiles] = useState([[], [], []]);
  const [formattedValues, setFormattedValues] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.client_data.clientId);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleRegister = (values) => {
    //API to register
    const formattedValues = {
      ...values,
      dob: values["dob"].format("DD/MM/YYYY"),
      startDate: values["date"][0].format("DD/MM/YYYY"),
      endDate: values["date"][1].format("DD/MM/YYYY"),
      startTimeDay: values["time"][0].format("HH:mm"),
      endTimeDay: values["time"][1].format("HH:mm"),
      aadhaarURL: uploadedURLs[0],
      displayPictureURL: uploadedURLs[2],
      phoneNumberVerified: true,
      emailVerified: true,
      clientId,
    };
    setFormattedValues(formattedValues);
    console.log(formattedValues);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const handleTnC = async () => {
    await Axios.post(`${ROOT_URL}/client/registerPatient`, formattedValues)
      .then((res) => {
        // Check res
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: actionTypes.CHANGE_CLIENT_SERVICE_DATA,
            client_service_data: res.data.data
          });
          navigate("/clientService");
          notification.success({
            message: `Success`,
            description: "Patient Details stored",
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
  const logout = () => {
    //APi for logout admin
    navigate("/");
  };
  return (
    <FormBody>
      <ActionContainer>
        <img src="/images/navLogo.svg" alt="logo" />
        <div onClick={() => logout()}>Logout</div>
      </ActionContainer>
      <FormTitle>Enter your Patient Details</FormTitle>

      <FormWrapper>
        <CustomForm
          name="pateint"
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
            <CustomInputNumber />
          </CustomForm.Item>
          <CustomForm.Item name="time" label="Time">
            <TimePicker.RangePicker format={format} />
          </CustomForm.Item>
          <CustomForm.Item name="date" label="Date">
            <DatePicker.RangePicker />
          </CustomForm.Item>
          <CustomForm.Item
            name="requirement"
            label="Requirement: "
            className="sign-up-options"
          >
            <Radio.Group>
              <Radio value="Nurse">Nurse</Radio>
              <Radio value="Nanny">Nanny</Radio>
            </Radio.Group>
          </CustomForm.Item>
          <CustomForm.Item name="policePhone" label="Local Police Phone">
            <CustomInputNumber style={{ width: "100%" }} />
          </CustomForm.Item>
          <CustomForm.Item
            name="emergencyPhone"
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
              beforeUpload={() => handleUpload(2)}
              onChange={handleChange(2)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Select</Button>
            </Upload>
          </CustomForm.Item>
          <CustomForm.Item name="patientNotes" label="Patient Notes">
            <CustomInput.TextArea />
          </CustomForm.Item>
          <CustomForm.Item
            name="patientDescription"
            label="Patient Description"
          >
            <CustomInput.TextArea />
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
