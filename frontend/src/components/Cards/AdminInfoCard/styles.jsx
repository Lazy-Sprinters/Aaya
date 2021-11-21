import { Card } from "antd";
import styled from "styled-components";

export const CustomCard = styled(Card)`
  .ant-card-actions {
    border-radius: 0 0 18px 18px;
  }
  .ant-card-body {
    border-radius:18px 18px 0 0;
  }
  .price{
    font-size: 2.3vh;
      color: #407fc3;
      font-weight: bold;
  }
  background: #efeeee;
  box-shadow: 7px 7px 9px 2px #a3c1e2;
  border-radius: 18px;
`;
