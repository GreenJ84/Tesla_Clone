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
  const [errors, setErrors] = useState({
    fnE: "",
    lnE: "",
    capE: ""
  })

  const stepHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formValid()) {
      console.log("invalid");
      return;
    }
    else { 
      console.log("valid");
      setStep();
    }
  };

  const formValid = () => {
    let res = true;
    let error = { ...errors }
    if (!fN.match(/[A-Za-z]{2,}/g)) {
      console.log("setting fn error");
      error.fnE = "Name must be longer then 2 characters";
      setErrors({...error})
      res = false;
    }
    if (!lN.match(/[A-Za-z]{2,}/g)) {
      console.log("setting ln error");
      error.lnE = "Name must be longer then 2 characters";
      setErrors({...error})
      res = false;
    }
    if (!confirmCap.match(cap)) {
      console.log("setting cap error");
      error.capE = "Captch does not match";
      setErrors({...error})
      res = false;
    }
    return res
  }

  return (
    <Reg1Container>
      <label htmlFor="first-name">First Name</label>
      <input
        name="first-name"
        placeholder=""
        type="text"
        value={fN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFN(e.currentTarget.value);
        }}
        required
        className={fN ? "border invalid:border-red-500" : ""}
        pattern="[A-Za-z]{3,}"
      />
      <div>{ errors.fnE }</div>
      <label htmlFor="last-name">Last Name</label>
      <input
        name="last-name"
        type="text"
        value={lN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLN(e.currentTarget.value);
        }}
        className={lN ? "border invalid:border-red-500" : ""}
        required
        pattern="[A-Za-z]{3,}"
      />
      <div>{ errors.lnE }</div>
      <Captcha cap={[cap, () => setCap(setCaptcha)]} />
      <label htmlFor="CAPTCHA">Enter the characters in the image</label>
      <input
        name="CAPTCHA"
        type="text"
        value={confirmCap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmCap(e.currentTarget.value);
        }}
        title="Incorrect image characters"
        onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.currentTarget.style.border = "2px solid red";
        }}
        className={confirmCap ? "border invalid:border-red-500" : ""}
        required
        pattern={cap}
      />
      <div>{ errors.capE }</div>
      <p>
        By continuing, I understand and agree to Tesla's{" "}
        <span>Privacy Notice</span> and <span>Terms of Use</span> for creating a
        Tesla Account
      </p>
      {fN && lN && confirmCap ? (
        <button
          type="submit"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => stepHandler(e)}>Next</button>
      ) : (
        <button disabled>Next</button>
      )}
    </Reg1Container>
  );
};

export default Reg1;

