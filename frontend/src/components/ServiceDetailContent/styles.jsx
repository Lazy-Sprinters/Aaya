import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";

export const CustomContent = styled(Content)`
  .back-btn {
      cursor:pointer;
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
    margin: 10vh 6vw 20vh 5vw;
    width: 30vw;
    font-size: 2vh;
  }
  .header {
    margin: 0 0 5vh 5vw;
  }
  .reviews {
    width: 100%;
    height: 75vh;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: justify;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent; /* Optional: just make scrollbar invisible */
    }
  }
  margin: 0 0 10vh 0;
  background-color: #e5e5e5;
  padding: 10px;
`;
