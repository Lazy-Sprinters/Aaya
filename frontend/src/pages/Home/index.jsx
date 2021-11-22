import React, { useState } from "react";
import {
  HomeBody,
  ActionContainer,
  HeaderContainer,
  AboutContainer,
  Footer,
  CustomModal,
  CustomTabs,
  CustomInput,
  CustomInputPassword,
  SignInButton,
  CustomForm,
  CustomInputCode,
  GetCodeButton,
} from "./styles";
import {
  LockOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Row, Checkbox, Radio, notification } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import * as actionTypes from "../../store/actions";

const { TabPane } = CustomTabs;

const Home = () => {
  const [isModalVisible, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStatus, setOtpStatus] = useState("Get Code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showLoginModal = () => {
    setModalShow(true);
    setActiveTab("login");
    console.log("hey");
  };

  const showSignUpModal = () => {
    setModalShow(true);
    setActiveTab("signup");
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const handleLogin = async (values) => {
    // API Call for login
    console.log(values);
    // navigate("/admin");

    await Axios.post(`${ROOT_URL}/log/in`, values)
      .then((res) => {
        // Check res
        console.log(res);
        if (res.data.status === 200) {
          
          if (values.role === "admin") {
            dispatch({
              type: actionTypes.CHANGE_ADMIN_DATA,
              admin_data: res.data.data.pendingApprovalClients,
            });
            navigate("/admin");
          } else if (values.role === "client") {
            dispatch({
              type: actionTypes.CHANGE_CLIENT_DATA,
              client_data: res.data.data,
            });
            navigate("/client");
          } else {
            dispatch({
              type: actionTypes.CHANGE_SERVICE_DATA,
              service_data: res.data.data,
            });
            navigate("/service");
          }
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
  };

  const handleSignUp = (values) => {
    // API Call for SignUp
    console.log(values);
    dispatch({
      type: actionTypes.CHANGE_ROLE,
      role: values.role,
    });
    if (values.role === "client") {
      navigate("/registerCustomer");
    } else {
      navigate("/registerSP");
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getCodeDisable = () => {
    if (otpStatus === "Get Code") {
      return phoneNumber.length !== 10;
    } else if (otpStatus === "Verify Code") {
      return otp.length !== 6;
    } else {
      return false;
    }
  };
  const handleGetCode = async () => {
    setLoading(true);
    if (otpStatus === "Get Code") {
      const values = { entity: phoneNumber, type: "phoneNumber" };
      console.log(values);
      await Axios.post(`${ROOT_URL}/otp/new`, values)
        .then((res) => {
          console.log(res);

          if (res.data.status === 200) {
            setOtpStatus("Verify Code");
            notification.success({
              message: `Success`,
              description: res.data.message,
              placement: "bottomLeft",
            });
            setLoading(false);
          } else {
            notification.error({
              message: `Error- Some Problem Occurred`,
              description: res.data.message,
              placement: "bottomLeft",
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    } else {
      const values = { entity: phoneNumber, otp: otp };
      console.log(values);
      await Axios.post(`${ROOT_URL}/otp/verify`, values)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setOtpStatus("Verified");
            dispatch({
              type: actionTypes.VERIFY_PHONE,
              phoneNumberVerified: true,
              phoneNumber,
            });
            notification.success({
              message: `Success`,
              description: res.data.message,
              placement: "bottomLeft",
            });
            setLoading(false);
          } else {
            notification.error({
              message: `Error- Invalid OTP`,
              description: res.data.message,
              placement: "bottomLeft",
            });
            dispatch({
              type: actionTypes.VERIFY_PHONE,
              phoneNumberVerified: false,
              phoneNumber: null,
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    }
  };

  return (
    <HomeBody>
      <ActionContainer>
        <div onClick={showSignUpModal}>Sign Up</div>
        <div onClick={showLoginModal}>Login</div>
      </ActionContainer>

      <HeaderContainer>
        <div>
          <div className="title">Aaya</div>
          <div className="moto">Let us care of your loved ones</div>
        </div>
        <div>
          <div className="Logo-wrapper">
            <img src="/images/logoMain.svg" className="logo" alt="logo" />
          </div>
        </div>
      </HeaderContainer>

      <AboutContainer>
        <div className="about-wrapper">
          <img src="/images/1.jpg" className="about" alt="about" />
        </div>
        <div className="about-us">
          <div className="title">About Us</div>
          <div className="content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever sLorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever sLorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever s
          </div>
        </div>
      </AboutContainer>

      <Footer>
        <div>© LazySprinters 2021 </div>
        <div>Terms and Condition</div>
      </Footer>

      {isModalVisible && (
        <CustomModal
          style={{ top: 300 }}
          visible={isModalVisible}
          onCancel={hideModal}
          footer={null}
          width={600}
        >
          <CustomTabs defaultActiveKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Login" key="login">
              <CustomForm
                name="LoginForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <CustomForm.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                  ]}
                >
                  <CustomInput
                    placeholder="Enter your Phone Number"
                    prefix={<PhoneOutlined className="prefix-icons" />}
                  />
                </CustomForm.Item>

                <CustomForm.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <CustomInputPassword
                    placeholder="Enter your password"
                    prefix={<LockOutlined className="prefix-icons" />}
                  />
                </CustomForm.Item>
                <CustomForm.Item
                  label="Login as: "
                  className="sign-up-options"
                  name="role"
                >
                  <Radio.Group>
                    <Radio value="admin">Admin</Radio>
                    <Radio value="client">Client</Radio>
                    <Radio value="serviceProvider">Service Provider</Radio>
                  </Radio.Group>
                </CustomForm.Item>
                <CustomForm.Item className="actions">
                  <CustomForm.Item
                    name="remember"
                    valuePropName="checked"
                    noStyle
                    className="checkbox"
                  >
                    <Checkbox>Remember me</Checkbox>
                  </CustomForm.Item>

                  <a className="forget" href="https://www.google.com">
                    Forgot your password ?
                  </a>
                </CustomForm.Item>

                <CustomForm.Item>
                  <SignInButton type="primary" htmlType="submit">
                    Sign in
                  </SignInButton>
                </CustomForm.Item>
              </CustomForm>
            </TabPane>
            <TabPane tab="Sign Up" key="signup">
              <CustomForm
                name="SignUpForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={handleSignUp}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <CustomForm.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                    { min: 10, message: "Username must be of 10 numbers." },
                    { max: 10, message: "Username must be of 10 numbers." },
                  ]}
                >
                  <CustomInput
                    placeholder="Enter your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    prefix={<PhoneOutlined className="prefix-icons" />}
                  />
                </CustomForm.Item>
                <Row>
                  <CustomForm.Item name="verification code">
                    <CustomInputCode
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter your verification code"
                      prefix={<MessageOutlined className="prefix-icons" />}
                    />
                  </CustomForm.Item>
                  <CustomForm.Item name="verification code">
                    <GetCodeButton
                      loading={loading}
                      disabled={getCodeDisable()}
                      onClick={handleGetCode}
                    >
                      {otpStatus}
                    </GetCodeButton>
                  </CustomForm.Item>
                </Row>
                <CustomForm.Item
                  label="Sign Up as: "
                  className="sign-up-options"
                  name="role"
                >
                  <Radio.Group>
                    <Radio value="client">Client</Radio>
                    <Radio value="serviceProvider">Service Provider</Radio>
                  </Radio.Group>
                </CustomForm.Item>
                <CustomForm.Item>
                  <SignInButton
                    disabled={otpStatus !== "Verified"}
                    type="primary"
                    htmlType="submit"
                  >
                    Sign Up
                  </SignInButton>
                </CustomForm.Item>
              </CustomForm>
            </TabPane>
          </CustomTabs>
        </CustomModal>
      )}
    </HomeBody>
  );
};

export default Home;
