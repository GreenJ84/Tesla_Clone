/** @format */

import React, { useEffect, useState } from "react";

import { Reg2Container, RegToolTip } from "../../app/Utils/StyledComponents/RegisrationComponents";
import Show from "../Layout/Show";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Reg2Props {
  email: [string, Function];
  password: [string, Function];
  confPassword: [string, Function];
  register: Function
}

const Reg2 = (props: Reg2Props) => {
  const [email, setEmail] = props.email;
  const [password, setPassword] = props.password;
  const [conPass, setConPass] = props.confPassword;
  const register = props.register;
  const [errors, setErrors] = useState({
    email: "",
    pass: "",
    conPass: ""
  })

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
    if (!formValid()){ return }
    register(e);
  };

  const formValid = () => {
    let res = true;
    let error = { ...errors }
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g)) {
      console.log("setting fn error");
      error.email = "Email is the incorrect format (example: name@email.com)";
      setErrors({...error})
      res = false;
    }
    if (!password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\w{8,}/g)) {
      console.log("setting ln error");
      error.pass = "Password must be longer than 8 characters with and contian at least 1 digit, 1 uppercase, and 1 lowercase letter";
      setErrors({...error})
      res = false;
    }
    if (!conPass.match(password)) {
      console.log("setting cap error");
      error.conPass = "Confirmation does not match";
      setErrors({...error})
      res = false;
    }
    return res
  }

  return (
    <Reg2Container>
      <label
        htmlFor=""
        inputMode="email"
      >
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
        pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        required
      />
      <div>{ errors.email }</div>
      <label
        htmlFor=""
        className="relative"
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
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        className={password ? "w-[430px] border invalid:border-red-500" : "w-[430px]"}
        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\w{8,}"
        required
      />
      <div>{ errors.pass }</div>
      <div>
        {password && (
          <Show
            state={showPass}
            set={showPassHandler}
          />
        )}
      </div>

      <label htmlFor="">Confirm Password</label>
      <input
        type={showCon ? "text" : "password"}
        value={conPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConPass(e.currentTarget.value)
        }
        className={conPass ? "border invalid:border-red-500" : ""}
        pattern={password}
        required
      />
      <div>{ errors.conPass }</div>
      <div>
        {conPass && (
          <Show
            state={showCon}
            set={showConHandler}
          />
        )}
      </div>
      {email && password && conPass ? (
        <button
          type="submit"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => registerHandler(e) }
        >Create Account</button>
      ) : (
        <button disabled>Create Account</button>
      )}
    </Reg2Container>
  );
};

export default Reg2;
