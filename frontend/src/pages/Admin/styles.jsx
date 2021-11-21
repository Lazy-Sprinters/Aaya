import { Layout, Form, Input, InputNumber } from "antd";
import styled from "styled-components";

export const CustomLayout = styled(Layout)`
  .ant-layout-header {
    background-color: #407fc3;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  .navbar-actions {
    float: right;
    font-size:2vh;
    color:white;
    .tab {
      cursor: pointer;
      margin-left: 30px;
      .avatar {
        margin: 5px;
      }
      .notif-badge {
        top: 3px;
        .notif {
            color:white;
          font-size: 2vh;
        }
      }
    }
  }
`;
