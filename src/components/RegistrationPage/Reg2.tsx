/** @format */

import React, { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import Show from "../Layout/Show";
import {
  Reg2Container,
  RegToolTip,
} from "../../app/Utils/StyledComponents/RegisrationComponents";

interface Reg2Props {
  email: [string, Function];
  password: [string, Function];
  confPassword: [string, Function];
  register: Function;
}

const Reg2 = (props: Reg2Props) => {
  const [email, setEmail] = props.email;
  const [password, setPassword] = props.password;
  const [conPass, setConPass] = props.confPassword;
  const register = props.register;
  const [errors, setErrors] = useState({
    email: "",
    pass: "",
    conPass: "",
  });

  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => {
    showPass ? setShowPass(false) : setShowPass(true);
  };

  const [showCon, setShowCon] = useState(false);
  const showConHandler = () => {
    showCon ? setShowCon(false) : setShowCon(true);
  };

  useEffect(() => {
    const displayTip = (el: HTMLElement) => {
      el.style.visibility = "visible";
      console.log(el);
    };
    const hideTip = (el: HTMLElement) => {
      el.style.visibility = "hidden";
    };
    let emailHover = document.getElementById("email-hover")!;
    let emailTip = document.getElementById("email-tip")!;
    emailHover.addEventListener("mouseover", () => displayTip(emailTip));
    emailHover.addEventListener("mouseout", () => hideTip(emailTip));

    let passHover = document.getElementById("pass-hover")!;
    let passTip = document.getElementById("pass-tip")!;
    passHover.addEventListener("mouseover", () => displayTip(passTip));
    passHover.addEventListener("mouseout", () => hideTip(passTip));

    return () => {
      passHover.removeEventListener("mouseover", () => displayTip(passTip));
      passHover.removeEventListener("mouseout", () => hideTip(passTip));

      emailHover.removeEventListener("mouseover", () => displayTip(emailTip));
      emailHover.removeEventListener("mouseout", () => hideTip(emailTip));
    };
  }, []);

  const formValid = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let noErrors = true;
    let error = { ...errors };
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g)) {
      error.email = "Email is the incorrect format (example: name@email.com)";
      noErrors = false;
    }
    if (!password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\w{8,}/g)) {
      error.pass =
        "Password must be longer than 8 characters with and contian at least 1 digit, 1 uppercase, and 1 lowercase letter";
      noErrors = false;
    }
    if (!password.match(conPass)) {
      error.conPass = "Confirmation does not match";
      noErrors = false;
    }
    setErrors({ ...error });

    if (noErrors) {
      register(e);
    } else {
      return;
    }
  };

  return (
    <Reg2Container>
      <label
        htmlFor="email"
        className="relative"
      >
        Email<span aria-hidden="true">*</span>
        <InformationCircleIcon
          id="email-hover"
          className="relative inline bottom-[3px] w-4 h-4 ml-1"
        />
        <RegToolTip
          id="email-tip"
          className="relative"
        >
          Must be your valid Email address under any domain.
        </RegToolTip>
      </label>
      <input
        id="email"
        name="email"
        aria-label="Email for Registration"
        aria-describedby="email-error"
        type="email"
        inputMode="email"
        value={email}
        placeholder="Ex. example.email@gmail.com"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
        pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        aria-invalid={
          email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g)
            ? "false"
            : "true"
        }
        autoComplete="email"
        required
        aria-required="true"
      />
      {errors.email && (
        <div
          id="email-error"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.email}
        </div>
      )}

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
        aria-label="A Password 8 or more character long"
        aria-describedby="pass-error"
        className={`relative ${
          password ? "w-[430px] border invalid:border-red-500" : "w-[430px]"
        }`}
        type={showPass ? "text" : "password"}
        inputMode="text"
        value={password}
        placeholder="Ex. not!aBadpasword99x84!"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])\S{8,}"
        aria-invalid={
          password.match(
            /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])\S{8,}/g
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
      {errors.pass && (
        <div
          id="pass-error"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.pass}
        </div>
      )}

      <label htmlFor="con-pass">
        Confirm Password<span aria-hidden="true">*</span>
      </label>
      <input
        id="con-pass"
        name="con-pass"
        aria-label="Confirm previously entered password"
        aria-describedby="con-pass-error"
        className={conPass ? "border invalid:border-red-500" : ""}
        type={showCon ? "text" : "password"}
        inputMode="text"
        value={conPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConPass(e.currentTarget.value)
        }
        pattern={password}
        aria-invalid={conPass.match(password) ? "false" : "true"}
        required
        aria-required="true"
      />
      {conPass && (
        <Show
          state={showCon}
          set={showConHandler}
        />
      )}
      {errors.conPass && <div
        id="con-pass-error"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {errors.conPass}
      </div>}

      {email && password && conPass ? (
        <button
          type="submit"
          aria-label="Create Account"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => formValid(e)}
        >
          Create Account
        </button>
      ) : (
        <button
          disabled
          aria-disabled="true"
          aria-label="Account requirements not met"
        >
          Create Account
        </button>
      )}
    </Reg2Container>
  );
};

export default Reg2;
