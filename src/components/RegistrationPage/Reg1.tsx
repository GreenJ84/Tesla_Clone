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

const Reg1 = ({ firstName, lastName, setStep }: StepProps) => {
  const [fN, setFN] = firstName;
  const [lN, setLN] = lastName;

  const [captcha, setCaptcha] = useCaptcha();
  const [cap, setCap] = useState(captcha);
  const [confirmCap, setConfirmCap] = useState("");
  const [errors, setErrors] = useState({
    fnE: "",
    lnE: "",
    capE: "",
  });

  const formValid = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let noErrors = true;
    let error = { ...errors };
    if (!fN.match(/[A-Za-z]{2,}/g)) {
      error.fnE = "Name must be longer then 2 characters";
      noErrors = false;
    } else {
      error.fnE = "";
    }
    if (!lN.match(/[A-Za-z]{2,}/g)) {
      error.lnE = "Name must be longer then 2 characters";
      noErrors = false;
    } else {
      error.lnE = "";
    }
    if (!confirmCap.match(cap)) {
      error.capE = "Captch does not match";
      noErrors = false;
    } else {
      error.capE = "";
    }
    setErrors({ ...error });

    if (noErrors) {
      setStep();
    } else {
      return;
    }
  };

  return (
    <Reg1Container>
      <label htmlFor="first-name">
        First Name<span aria-hidden="true">*</span>
      </label>
      <input
        id="first-name"
        name="first-name"
        aria-label="First Name"
        aria-describedby="first-name-error"
        className={fN ? "border invalid:border-red-500" : ""}
        type="text"
        inputMode="text"
        placeholder="Ex. John"
        value={fN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFN(e.currentTarget.value);
        }}
        pattern="[A-Za-z]{2,}"
        aria-invalid={fN.match(/[A-Za-z]{2,}/g) ? "false" : "true"}
        autoComplete="given-name"
        required
        aria-required="true"
      />
      <div
        id="first-name-error"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {errors.fnE}
      </div>

      <label htmlFor="last-name">
        Last Name<span aria-hidden="true">*</span>
      </label>
      <input
        id="last-name"
        name="last-name"
        aria-label="Last Name"
        aria-describedby="last-name-error"
        className={lN ? "border invalid:border-red-500" : ""}
        type="text"
        inputMode="text"
        placeholder="Ex. Smith"
        value={lN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLN(e.currentTarget.value);
        }}
        pattern="[A-Za-z]{2,}"
        aria-invalid={lN.match(/[A-Za-z]{2,}/g) ? "false" : "true"}
        autoComplete="family-name"
        required
        aria-required="true"
      />
      <div
        id="last-name-error"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {errors.lnE}
      </div>

      <Captcha cap={[cap, () => setCap(setCaptcha)]} />

      <label htmlFor="CAPTCHA">
        Enter the characters in the image<span aria-hidden="true">*</span>
      </label>
      <input
        id="CAPTCHA"
        name="CAPTCHA"
        aria-label="Human confirmation Captcha"
        aria-describedby="captcha-error"
        title="Incorrect image characters"
        className={confirmCap ? "border invalid:border-red-500" : ""}
        type="text"
        inputMode="text"
        value={confirmCap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmCap(e.currentTarget.value);
        }}
        pattern={cap}
        aria-invalid={confirmCap.match(cap) ? "false" : "true"}
        required
        aria-required="true"
      />
      <div
        id="captcha-error"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {errors.capE}
      </div>

      <p
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="all"
      >
        By continuing, I understand and agree to Tesla's{" "}
        <span>Privacy Notice</span> and <span>Terms of Use</span> for creating a
        Tesla Account
      </p>
      {fN && lN && confirmCap ? (
        <button
          type="submit"
          aria-label="Progress to next Registration steps"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => formValid(e)}
        >
          Next
        </button>
      ) : (
        <button
          aria-disabled="true"
          aria-label="Progression requirements not met"
          disabled
        >
          Next
        </button>
      )}
    </Reg1Container>
  );
};

export default Reg1;
