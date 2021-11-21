import styled from "styled-components";
import { Input, Modal, Tabs, Form, Button } from "antd";

export const CustomModal = styled(Modal)`
  .ant-modal-content {
    font-size:2.8vh;
    background-color: #a3bcd7;
    border-radius:50px;
  }
  .title{
    text-align:center;
    font-weight:bold;
    font-size:3vh;
    margin:20px 0;
  }
  .ant-modal-body{
    font-size:2vh;
  }
  .ant-modal-footer{
      padding: 0 40px 20px 0;
  }
  .actions{
      margin:20px 0;
      span{
        font-size:1.6vh;

      }
  }
`;