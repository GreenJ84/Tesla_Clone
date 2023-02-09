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

  const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    register(e);
  };

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
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        required
      />

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
        className="w-[430px]"
        pattern="[A-Za-z!#$%&]+[1-9]+{8,}"
        required
      />
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
        pattern={password}
        required
      />
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
          onClick={ registerHandler }
        >Create Account</button>
      ) : (
        <button disabled>Create Account</button>
      )}
    </Reg2Container>
  );
};

export default Reg2;
