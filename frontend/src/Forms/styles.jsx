import { Button, Form, Input, InputNumber } from "antd";
import styled from "styled-components";

export const FormBody = styled.div`
  background-image: url(/images/formBG.svg);
  background-repeat: no-repeat;
  background-size: 99.5vw auto;
  width: 100vw;
  position: absolute;
  overflow-x: hidden;
`;

export const ActionContainer = styled.div`
  color: #407fc3;
  img {
    position: absolute;
    margin: 10px 16px 0 16px;
    cursor: pointer;
    height: 4vh;
  }
  div {
    font-size: 2vh;
    position: absolute;
    right: 40px;
    margin: 10px 16px 0 16px;
    cursor: pointer;
  }
`;

export const FormTitle = styled.div`
  text-align: center;
  width: 100vw;
  margin: 10vh 0 0 0;
  color: white;
  font-size: 4vh;
  font-weight: bold;
`;

export const FormWrapper = styled.div`
  width: 50vw;
  min-height: 50vh;
  top: 50vh;
  left: 50vw;
  margin-left: auto;
  margin-right: auto;
  background: #efeeee;
  box-shadow: 7px 7px 9px 2px #a3c1e2;
  padding: 40px 80px 60px 80px;
`;

export const CustomForm = styled(Form)`
    .ant-form-item{
        label{
            font-size:1.5vh;
            font-weight:600;
        }
    }
`;
export const SubmitButton = styled(Button)`
width:500px;
font-size:1.5vh;
margin-left:5vw;
height:4vh;
position:absolute;
`;
export const CustomInput = styled(Input)``;
export const CustomInputNumber = styled(InputNumber)``;
