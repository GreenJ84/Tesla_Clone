/** @format */

import React, { useEffect, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import {
  Reg2Container,
  RegToolTip,
} from "../../app/Utils/StyledComponents/RegisrationComponents";
import Show from "../Layout/Show";

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
  const [showCon, setShowCon] = useState(false);
  const showPassHandler = () => {
    showPass ? setShowPass(false) : setShowPass(true);
  };
  const showConHandler = () => {
    showCon ? setShowCon(false) : setShowCon(true);
  };

  useEffect(() => {
    let hover = document.getElementById("pass")!;
    let tip = document.getElementById("passTip")!;

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

  const registerHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formValid()) {
      return;
    }
    register(e);
  };

  const formValid = () => {
    let res = true;
    let error = { ...errors };
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g)) {
      error.email = "Email is the incorrect format (example: name@email.com)";
      res = false;
    }
    if (!password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\w{8,}/g)) {
      error.pass =
        "Password must be longer than 8 characters with and contian at least 1 digit, 1 uppercase, and 1 lowercase letter";
      res = false;
    }
    if (!password.match(conPass)) {
      error.conPass = "Confirmation does not match";
      res = false;
    }
    setErrors({ ...error });
    return res;
  };

  return (
    <Reg2Container>
      <label
        htmlFor="email"
        inputMode="email"
      >
        Email
      </label>
      <input
        id="email"
        aria-describedby="email-error"
        name="email"
        placeholder="Ex. example.email@gmail.com"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
        pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        autoComplete="email"
        required
      />
      <div id="email-error">{errors.email}</div>

      <label
        htmlFor="password"
        className="relative"
        inputMode="text"
      >
        Password
        <InformationCircleIcon
          id="pass"
          className="relative inline bottom-[3px] w-4 h-4 ml-1"
        />
        <RegToolTip
          id="passTip"
          className="invisible"
        >
          Password must be at least 8 characters and include at least one number
          and one letter
        </RegToolTip>
      </label>
      <input
        id="password"
        aria-describedby="pass-error"
        name="password"
        placeholder="Ex. not!aBadpasword99x84!"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        className={`relative ${
          password ? "w-[430px] border invalid:border-red-500" : "w-[430px]"
        }`}
        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])\S{8,}"
        required
      />
      {password && (
        <Show
          state={showPass}
          set={showPassHandler}
        />
      )}
      <div id="pass-error">{errors.pass}</div>

      <label htmlFor="con-pass">Confirm Password</label>
      <input
        id="con-pass"
        aria-describedby="con-pass-error"
        name="con-pass"
        type={showCon ? "text" : "password"}
        value={conPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConPass(e.currentTarget.value)
        }
        className={conPass ? "border invalid:border-red-500" : ""}
        pattern={password}
        required
      />
      {conPass && (
        <Show
          state={showCon}
          set={showConHandler}
        />
      )}
      <div id="con-pass-error">{errors.conPass}</div>

      {email && password && conPass ? (
        <button
          type="submit"
          aria-label="Create Account"
          onClick={(e: React.FormEvent<HTMLButtonElement>) =>
            registerHandler(e)
          }
        >
          Create Account
        </button>
      ) : (
        <button
          disabled
          aria-disabled="true"
          aria-label="Create Account"
        >
          Create Account
        </button>
      )}
    </Reg2Container>
  );
};

export default Reg2;
