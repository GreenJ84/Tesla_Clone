/** @format */

import React, { useState } from "react";
import styled from "styled-components";

import { useCaptcha } from "../../app/Utils/hooks/useCaptcha";
import Captcha from "./Captcha";

interface StepProps {
  firstName: [string, Function];
  lastName: [string, Function];
  setStep: Function;
}

const Reg1 = (props: StepProps) => {
  const [fN, setFN] = props.firstName;
  const [lN, setLN] = props.lastName;
  const { setStep } = props;

  const [captcha, setCaptcha] = useCaptcha();
  const [cap, setCap] = useState(captcha);
  const [confirmCap, setConfirmCap] = useState("");

  const stepHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep();
  };

  return (
    <Container>
      <label htmlFor="first-name">First Name / Username</label>
      <input
        name="first-name"
        placeholder=""
        type="text"
        value={fN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFN(e.currentTarget.value);
        }}
        required
      />
      <label htmlFor="last-name">Last Name</label>
      <input
        placeholder="Not necessary w/ username"
        name="last-name"
        type="text"
        value={lN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLN(e.currentTarget.value);
        }}
      />
      <Captcha cap={[cap, () => setCap(setCaptcha)]} />
      <label htmlFor="CAPTCHA">Enter the characters in the image</label>
      <input
        name="CAPTCHA"
        type="text"
        value={confirmCap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmCap(e.currentTarget.value);
        }}
        pattern={cap}
        title="Incorrect image characters"
        onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.currentTarget.style.border = "2px solid red";
        }}
        required
      />
      <p>
        By continuing, I understand and agree to Tesla's{" "}
        <span>Privacy Notice</span> and <span>Terms of Use</span> for creating a
        Tesla Account
      </p>
      {fN && lN && confirmCap ? (
        <button onClick={stepHandler}>Next</button>
      ) : (
        <button disabled>Next</button>
      )}
    </Container>
  );
};

export default Reg1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    color: rgba(100, 100, 100);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.3px;
    margin-bottom: 8px;
  }
  input {
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0 10px 13px;
    border-radius: 4px;
    background-color: rgba(240, 240, 240);
    margin-bottom: 30px;
  }
  > p {
    position: relative;
    top: -3px;
    font-size: 16px;
    color: rgba(100, 100, 100);
    margin-bottom: 30px;
    line-height: 22px;
    letter-spacing: 1px;
    font-weight: 400;
    span {
      cursor: pointer;
      color: rgba(20, 20, 20);
      text-decoration: underline;
    }
  }
  button {
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
  button:disabled {
    background-color: rgba(0, 65, 205, 0.4);
    cursor: not-allowed;
  }
`;
