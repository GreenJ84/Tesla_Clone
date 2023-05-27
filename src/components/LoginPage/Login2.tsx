/** @format */

import React, { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import Show from "../Layout/Show";
import {
  Button,
  LoginContainer,
  Underline,
} from "../../app/Utils/StyledComponents/LoginComponents";
import { RegToolTip } from "../../app/Utils/StyledComponents/RegisrationComponents";

interface Login2Props {
  password: [string, Function];
  login: Function;
  error: string;
}

const Login2 = (props: Login2Props) => {
  const [password, setPassword] = props.password;
  const { login, error } = props;

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(e);
  };

  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => {
    showPass ? setShowPass(false) : setShowPass(true);
  };

  useEffect(() => {
    let passHover = document.getElementById("pass-hover")!;
    let passTip = document.getElementById("pass-tip")!;

    const displayTip = () => {
      passTip.style.visibility = "visible";
    };
    const hideTip = () => {
      passTip.style.visibility = "hidden";
    };

    passHover.addEventListener("mouseover", () => displayTip());
    passHover.addEventListener("mouseout", () => hideTip());
    return () => {
      passHover.removeEventListener("mouseover", () => displayTip());
      passHover.removeEventListener("mouseout", () => hideTip());
    };
  }, []);

  return (
    <LoginContainer>
      <label
        htmlFor="password"
        className="relative"
      >
        Password<span aria-hidden="true">*</span>
        <InformationCircleIcon
          id="pass-hover"
          className="relative inline bottom-[3px] w-4 h-4 ml-1"
        />
        <RegToolTip
          id="pass-tip"
          className="invisible"
        >
          Password must be at least 8 characters and include at least one number
          and one letter
        </RegToolTip>
      </label>
      <input
        id="password"
        name="password"
        aria-describedby="passError"
        className={`relative ${
          password ? "w-[430px] border invalid:border-red-500" : "w-[430px]"
        }`}
        type={showPass ? "text" : "password"}
        value={password}
        placeholder="Ex. not!aBadpasword99x84!"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        pattern="^[A-Za-z0-9!@#$%^&*]{8,}$"
        aria-invalid={
          password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]){8,}$/
          )
            ? "false"
            : "true"
        }
        required
        aria-required="true"
      />
      {password && (
        <Show
          state={showPass}
          set={showPassHandler}
        />
      )}
      {error && (
        <div
          id="passError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {error}
        </div>
      )}

      {password ? (
        <Button
          type="submit"
          aria-label="Sign In"
          onClick={buttonHandler}
        >
          Sign In
        </Button>
      ) : (
        <Button
          disabled
          aria-disabled="true"
          aria-label="Account requirements not met"
        >
          Sign In
        </Button>
      )}
      <div className="relative mb-[76px]">
        <Underline
          href="/"
          rel="noreferrer"
          target="_blank"
        >
          Forgot Password?
        </Underline>
      </div>
    </LoginContainer>
  );
};

export default Login2;
