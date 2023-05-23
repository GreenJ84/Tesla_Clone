/** @format */

import styled from "styled-components";

export const LoginMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  padding-bottom: 100px;
  min-height: 100vh;
  width: 430px;
  margin: 0 auto;
  > p {
    position: relative;
    top: 12px;
    text-align: right;
    font-weight: 600;
    color: rgba(100, 100, 100);
    margin-bottom: 15px;
  }
  h1 {
    font-size: 44px;
    font-weight: 550;
    letter-spacing: 1.6px;
    margin-bottom: 20px;
  }
  @media only screen and (min-width: 1400px) {
    width: 550px;
  }
`;

export const LoginContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  margin: 0;
  label {
    color: rgba(100, 100, 100);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.3px;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0 10px 13px;
    border-radius: 4px;
    background-color: rgba(245, 245, 245);
    margin-bottom: 36px;
  }
  input + div {
    position: relative;
    top: -36px;
    color: red;
    line-height: 16px;
  }
`;

export const Underline = styled.a`
  cursor: pointer;
  display: block;
  margin: auto;
  width: 190px;
  font-size: 19px;
  letter-spacing: 1.4px;
  text-align: center;
  :after {
    content: "";
    position: absolute;
    bottom: 0.5px;
    left: 50%;
    transform: translateX(-50%);
    height: 0;
    width: 190px;
    border-bottom: 1.4px solid black;
    transition: width 0.3s ease;
  }
  :hover:after {
    border-bottom: 3px solid black;
  }
`;

export const AltLoginModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  height: 50vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 20;
  border-radius: 10px;
  background-color: rgba(250, 250, 250);
  box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.5);
  h2 {
    position: relative;
    top: 10px;
    font-size: clamp(22px, 2.6vw, 36px);
    font-weight: 600;
  }
  p{
    position: relative;
    font-size: clamp(16px, 2vw, 26px);
    width: 70%;
    text-align: center;
  }
  div{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;

    button{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 14px;
      height: 12vh;
      width: 25%;
      border-radius: 10px;
    }
    button:hover{
      background-color: rgba(100, 100, 100, .2);
      border: 1.4px solid rgba(100, 100, 100, .7);
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.6);
      padding: 12.5px;
    }
  }
  form{
    position: relative;
    top: 40px;
  }
`

export const Revert = styled(Underline)`
  width: 80px;
  :after {
    bottom: 0.5px;
    width: 95%;
  }
`;

export const Divide = styled.p`
  position: relative;
  font-size: 18px;
  font-size: 18px;
  font-weight: 620;
  color: rgba(90, 90, 90);
  text-align: center;
  letter-spacing: 1.4px;
  :before,
  :after {
    content: "";
    position: absolute;
    bottom: 12px;
    height: 0;
    width: 30vw;
    max-width: 160px;
    border-bottom: 1.4px solid rgba(200, 200, 200, 0.5);
    transition: width 0.3s ease;
  }
  :before {
    left: 0px;
  }
  :after {
    right: 0px;
  }
`;

export const ToolTip = styled.span`
  position: absolute;
  bottom: -140px;
  left: -140px;
  width: 500px;
  padding: 26px 30px;
  background-color: white;
  font-weight: 450;
  box-shadow: 0px 10px 20px rgba(20, 20, 20, 0.2);
  z-index: 10;
  @media only screen and (max-width: 800px) {
    left: -40px;
  }
`;

export const ButtonBase = styled.button`
  padding: 10px 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.2px;
  border-radius: 4px;
  @media only screen and (max-width: 550px) {
    width: 80vw;
    margin: 0 auto;
  }
`;

export const Button = styled(ButtonBase)`
  margin-bottom: 28px;
  color: white;
  background-color: rgba(40, 65, 255, 0.8);
  :hover {
    background-color: rgba(20, 35, 205, 0.8);
  }
  :disabled {
    background-color: rgba(0, 65, 205, 0.4);
    cursor: not-allowed;
  }
`;

export const Button2 = styled(ButtonBase)`
  color: black;
  background-color: rgba(220, 220, 220, 0.3);
  :hover {
    background-color: rgba(220, 220, 220, 0.5);
  }
`;
