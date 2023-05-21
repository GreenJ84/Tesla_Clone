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
    capE: "",
  });

  const stepHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formValid()) {
      return;
    } else {
      setStep();
    }
  };

  const formValid = () => {
    let res = true;
    let error = { ...errors };
    if (!fN.match(/[A-Za-z]{2,}/g)) {
      error.fnE = "Name must be longer then 2 characters";
      res = false;
    } else {
      error.fnE = "";
    }
    if (!lN.match(/[A-Za-z]{2,}/g)) {
      error.lnE = "Name must be longer then 2 characters";
      res = false;
    } else {
      error.lnE = "";
    }
    if (!confirmCap.match(cap)) {
      error.capE = "Captch does not match";
      res = false;
    } else {
      error.capE = "";
    }
    setErrors({ ...error });
    return res;
  };

  return (
    <Reg1Container>
      <label htmlFor="first-name">First Name</label>
      <input
        id="first-name"
        className={fN ? "border invalid:border-red-500" : ""}
        name="first-name"
        aria-describedby="first-name-error"
        type="text"
        placeholder="Ex. John"
        value={fN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFN(e.currentTarget.value);
        }}
        pattern="[A-Za-z]{2,}"
        autoComplete="given-name"
        required
      />
      <div id="first-name-error">{errors.fnE}</div>

      <label htmlFor="last-name">Last Name</label>
      <input
        id="last-name"
        className={lN ? "border invalid:border-red-500" : ""}
        aria-describedby="last-name-error"
        name="last-name"
        type="text"
        placeholder="Ex. Smith"
        value={lN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLN(e.currentTarget.value);
        }}
        pattern="[A-Za-z]{2,}"
        autoComplete="family-name"
        required
      />
      <div id="last-name-error">{errors.lnE}</div>

      <Captcha cap={[cap, () => setCap(setCaptcha)]} />

      <label htmlFor="CAPTCHA">Enter the characters in the image</label>
      <input
        id="CAPTCHA"
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
        aria-describedby="captcha-error"
      />
      <div id="captcha-error">{errors.capE}</div>

      <p>
        By continuing, I understand and agree to Tesla's{" "}
        <span>Privacy Notice</span> and <span>Terms of Use</span> for creating a
        Tesla Account
      </p>
      {fN && lN && confirmCap ? (
        <button
          type="submit"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => stepHandler(e)}
        >
          Next
        </button>
      ) : (
        <button
          aria-label="Registration terms invalid"
          aria-disabled="true"
          disabled
        >
          Next
        </button>
      )}
    </Reg1Container>
  );
};

export default Reg1;
