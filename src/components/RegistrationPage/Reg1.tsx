/** @format */

import React, { useState } from "react";

import Captcha from "./Captcha";
import { Reg1Container } from "../../app/Utils/StyledComponents/RegisrationComponents";

import { useCaptcha } from "../../app/Utils/hooks/useCaptcha";

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
    <Reg1Container>
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
        pattern="[A-Za-z]+{8,}"
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
        pattern="[A-Za-z]+{8,}"
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
    </Reg1Container>
  );
};

export default Reg1;

