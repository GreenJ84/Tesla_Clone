/** @format */

import React, { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button, LoginContainer, ToolTip, Underline } from "../../app/Utils/StyledComponents/LoginComponents";

interface Login1Props {
  email: [string, Function];
  setStep: Function;
}

const Login1 = (props: Login1Props) => {
  const [error, setError] = useState("");
  const [email, setEmail] = props.email;
  const { setStep } = props;

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")) {
      setError(`Invalid email format, please check again and re-enter.`);
      return;
    }
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
        htmlFor=""
        className="relative"
      >
        Email
        <InformationCircleIcon
          id="email"
          className="relative inline bottom-[3px] w-4 h-4 ml-1"
        />
        <ToolTip
          id="emailTip"
          className="invisible"
        >
          If your account is linked to an email you no longer have access to,
          sign into your account and update your email under account settings
        </ToolTip>
      </label>
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
        className="w-[430px]"
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        required
      />
      {error ?
          <div>
            {error}<br/>
            {"example: <username>@<provider>.com"}
          </div>
        : "" }
      {email ? (
        <Button onClick={buttonHandler}>Next</Button>
      ) : (
        <Button disabled>Next</Button>
      )}
      <div className="relative mb-[76px]">
        <Underline
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
