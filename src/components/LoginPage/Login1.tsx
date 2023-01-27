/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button, ToolTip, Underline } from "../../app/Utils/StyledComponents/LoginComponents";

interface Login1Props {
  email: [string, Function];
  setStep: Function;
}

const Login1 = (props: Login1Props) => {
  const [email, setEmail] = props.email;
  const { setStep } = props;

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    <Container>
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
      {email ? (
        <Button onClick={buttonHandler}>Next</Button>
      ) : (
        <Button disabled>Next</Button>
      )}
      <div className="relative mb-[76px]">
        <Underline
          href="https://www.teslUnderline.com/support/account-support?redirect=no"
          rel="noreferrer"
          target="_blank"
        >
          Trouble Signing In?
        </Underline>
      </div>
    </Container>
  );
};

export default Login1;

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
    border-radius: 3px;
    background-color: rgba(245, 245, 245);
    margin-bottom: 36px;
  }
`;
