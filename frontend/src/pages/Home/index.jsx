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
  UserOutlined,
} from "@ant-design/icons";
import { Row, Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROOT_URL } from "../../App";

const { TabPane } = CustomTabs;

const plainOptions = ["Customer", "Nanny/Nurse"];

const Home = () => {
  const [isModalVisible, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpStatus, setOtpStatus] = useState("GET CODE");
  const navigate = useNavigate();

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

  const handleAction = () => {
    if (activeTab === "login") {
      handleLogin();
    } else {
      handleSignUp();
    }
  };
  const handleLogin = (values) => {
    // API Call for login
    console.log(values);
    navigate("");
  };

  const handleSignUp = (values) => {
    // API Call for SignUp
    console.log(values);

    navigate("/registerCustomer");
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGetCode = async () => {
    setLoading(true);
    console.log(phoneNumber);
    const values = { entity: phoneNumber, type: "phoneNumber" };
    await Axios.post(`${ROOT_URL}/otp/new`, values)
      .then((res) => {
        console.log(res);
        setOtpStatus("Verify Code")
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
      console.log("bahar aa gya")
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
          <div className="moto">moto</div>
        </div>
        <div>
          <div className="Logo-wrapper">
            <img src="/images/logoMain.svg" className="logo" alt="logo" />
          </div>
        </div>
      </HeaderContainer>
      <AboutContainer>
        <div className="about-wrapper">
          <img src="https://picsum.photos/800" className="about" alt="about" />
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
                name="basic"
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
                  label="Sign Up as: "
                  className="sign-up-options"
                  name="role"
                >
                  <Radio.Group>
                    <Radio value="client">Customer</Radio>
                    <Radio value="serviceProvider">Nanny/Nurse</Radio>
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

                  <a className="forget" href="">
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
                name="basic"
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
                      placeholder="Enter your verification code"
                      prefix={<MessageOutlined className="prefix-icons" />}
                    />
                  </CustomForm.Item>
                  <CustomForm.Item name="verification code">
                    <GetCodeButton loading={loading} onClick={handleGetCode}>
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
                    <Radio value="client">Customer</Radio>
                    <Radio value="serviceProvider">Nanny/Nurse</Radio>
                  </Radio.Group>
                </CustomForm.Item>
                <CustomForm.Item>
                  <SignInButton type="primary" htmlType="submit">
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
