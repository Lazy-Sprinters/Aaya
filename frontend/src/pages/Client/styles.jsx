import { Button, Layout } from "antd";
import styled from "styled-components";

export const ClientBody = styled.div`
  background-image: url(/images/userHeader.svg);
  background-repeat: no-repeat;
  background-size: 100vw auto;
  width: 99vw;
  ${"" /* height: 200vh;s */}
  position: absolute;
`;
export const ActionContainer = styled.div`
  color: #407fc3;
  img {
    position: absolute;
    margin: 10px 16px 0 16px;
    cursor: pointer;
    height: 4vh;
  }
  .navbar-actions {
    float: right;
    font-size: 2vh;
    color: white;
    .tab {
      cursor: pointer;
      margin: 10px;
      .avatar {
        margin: 5px;
      }
    }
  }
`;
export const Heading = styled.div`
  margin: 15vh 0 0 3vw;
  font-size: 11vh;
  color: #407fc3;
  font-weight: bold;
`;

export const BookButton = styled(Button)`
  border-radius: 18px;
  margin: 5vh 0 0 25vw;
  font-size: 3vh;
  background-color: #407fc3;
  height: fit-content;
`;

export const DetailsSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20vh 10vw 15vh 15vw;
  .description {
    margin: 0 5vw 0 0;
    width: 25vw;
  }
  .title {
    font-size: 5vh;
    color: #407fc3;
    font-weight: bold;
  }
  .content {
    margin-top: 10px;
    font-size: 2.5vh;
  }
  .price {
    margin-top: 10px;
    font-size: 3vh;
    color: #407fc3;
    font-weight: bold;
  }
`;

export const ImgWrapper = styled.div`
  width: 25vw;
  height: 35vh;
  position: relative;
  overflow: hidden;
  background-color: white;
  border-radius: 18px;
  margin: 0 5vw 0 0;
  img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
`;
export const CustomLayout = styled.div`
  margin: 20vh 0;
  border-radius: 20px;
  .ant-layout-sider{
  height: 80vh;

  }
  .heading{
      font-size:4vh;
      font-weight:bold;
  }
  .slider {
    margin: 60px 30px;
    .title {
      font-size: 2vh;
      font-weight: bold;
    }
    .value {
      font-size: 2.3vh;
      color: #407fc3;
      font-weight: bold;
      margin: 5px;
    }
  }
  .ant-slider-track {
    background-color: #407fc3;
  }
  .ant-slider-dot {
    border-color: #407fc3;
  }

  .ant-slider-handle {
    border-color: #407fc3;
  }
  .checkbox {
    margin: 60px 35%;
    font-size: 1.8vh;
    .title {
      font-size: 2vh;
      font-weight: bold;
        margin:10px 0;
    }
  }
  .search-content{
      margin:20px 80px;
  }
`;
