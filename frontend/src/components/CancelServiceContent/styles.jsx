import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";

export const CustomContent = styled(Content)`
  .back-btn {
    cursor: pointer;
  }
  .fixed-container {
    position: sticky;
  }
  .details {
    font-size: 3vh;
    margin: 0 0 20px 20px;
  }
  .approve-btn {
    width: 150px;
    font-size: 1.5vh;
    margin-left: 2vw;
    height: 4vh;
    position: absolute;
  }
  .reject-btn {
    width: 150px;
    font-size: 1.5vh;
    margin-left: 20vw;
    height: 4vh;
    position: absolute;
  }
  .actions {
    margin: 20px 7vw;
  }
  .reason {
    margin: 10vh 8vw 20vh 6vw;
    width: 30vw;
    font-size: 2vh;
  }
  .header {
    margin: 0 0 5vh 5vw;
  }
  .description {
    width: 30vw;
    height: 75vh;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: justify;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent; /* Optional: just make scrollbar invisible */
    }
    background: rgba(64, 127, 195, 0.4);
    border-radius:24px;
    padding: 20px;
    .title {
      font-size: 2.5vh;
      text-align: center;
      font-weight: bold;
      margin: 10px 0;
    }
  }
  .price {
    margin: 10vh 2vw 20vh 12vw;
    width: 30vw;
    font-size: 5vh;
    .value {
      color: #407fc3;
      font-weight:bold;
      font-size:6vh;
    }
  }
  margin: 30px 0 10vh 0;
  background-color: #e5e5e5;
  padding: 10px;
`;
