import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";

export const CustomContent = styled(Content)`
  .back-btn {
    position: absolute;
  }
  .title {
    display: flex;
    justify-content: center;
    font-size: 3vh;
    margin-bottom: 20px;
  }
  .approve-btn {
    width: 500px;
    font-size: 1.5vh;
    margin-left: 5vw;
    height: 4vh;
    position: absolute;
  }
  .reject-btn {
    width: 500px;
    font-size: 1.5vh;
    margin-left: 42vw;
    height: 4vh;
    position: absolute;
  }
  margin: 30px 30px 10vh 0;
`;
