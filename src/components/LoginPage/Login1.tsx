/** @format */

import React, { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import {
  Button,
  LoginContainer,
  Underline,
} from "../../app/Utils/StyledComponents/LoginComponents";
import { RegToolTip } from "../../app/Utils/StyledComponents/RegisrationComponents";

interface Login1Props {
  email: [string, Function];
  setStep: Function;
}

const Login1 = (props: Login1Props) => {
  const [email, setEmail] = props.email;
  const { setStep } = props;
  const [error, setError] = useState("");

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$")) {
      setError(`Invalid email format, please check again and re-enter.`);
      return;
    }
    setError("");
    setStep();
  };

  useEffect(() => {
    let hover = document.getElementById("email")!;
    let tip = document.getElementById("emailTip")!;

    const displayTip = () => {
      tip.style.visibility = "visible";
    };
    const hideTip = () => {
      tip.style.visibility = "hidden";
    };
    hover.addEventListener("mouseover", displayTip);
    hover.addEventListener("mouseout", hideTip);
    return () => {
      hover.removeEventListener("mouseover", displayTip);
      hover.removeEventListener("mouseout", hideTip);
    };
  }, []);

  return (
    <LoginContainer>
      <label
        htmlFor="email"
        className="relative"
      >
        Email<span aria-hidden="true">*</span>
        <InformationCircleIcon
          id="email"
          className="relative inline bottom-[3px] w-4 h-4 ml-1"
        />
        <RegToolTip
          id="emailTip"
          className="invisible"
        >
          Must be your valid Email address under any domain.
        </RegToolTip>
      </label>
      <input
        id="email"
        name="email"
        aria-describedby="emailError"
        type="email"
        inputMode="email"
        value={email}
        placeholder="Ex. example.email@gmail.com"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
        className={email ? "border invalid:border-red-500" : ""}
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        aria-invalid={
          email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g)
            ? "false"
            : "true"
        }
        autoComplete="email"
        required
        aria-required="true"
      />
      {error && (
        <div
          id="emailError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {error}
        </div>
      )}
      {email ? (
        <Button
          type="button"
          aria-label="Progress to next Login steps"
          onClick={buttonHandler}
        >
          Next
        </Button>
      ) : (
        <Button
          aria-disabled="true"
          aria-label="Progression requirements not met"
          disabled
        >
          Next
        </Button>
      )}
      <div className="relative mb-[76px]">
        <Underline
          aria-label="OffSite Login help page"
          href="https://www.tesla.com/support/account-support?redirect=no"
          rel="noreferrer"
          target="_blank"
        >
          Trouble Signing In?
        </Underline>
      </div>
    </LoginContainer>
  );
};

export default Login1;
