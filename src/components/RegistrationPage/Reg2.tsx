/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import Show from "../Layout/Show";

interface Reg2Props {
  email: [string, Function];
  password: [string, Function];
}

const Reg2 = (props: Reg2Props) => {
  const [email, setEmail] = props.email;
  const [password, setPassword] = props.password;
  const [conPass, setConPass] = useState("");

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

  return (
    <Container>
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
        <ToolTip
          id="passTip"
          className="invisible"
        >
          Password must be at least 8 characters and include at least one number
          and one letter
        </ToolTip>
      </label>
      <input
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        className="w-[430px]"
        pattern="/[A-Za-z!#$%&]+[1-9]+{8,}/g"
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
        <button>Create Account</button>
      ) : (
        <button disabled>Create Account</button>
      )}
    </Container>
  );
};

export default Reg2;

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
    margin-bottom: 30px;
  }
  div {
    position: relative;
    width: 1;
    height: 0;
  }
  button {
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(40, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(20, 35, 205, 0.8);
  }
  button:disabled {
    background-color: rgba(0, 65, 205, 0.4);
    cursor: not-allowed;
  }
`;

const ToolTip = styled.span`
  position: absolute;
  bottom: -114px;
  left: -140px;
  width: 500px;
  padding: 26px 30px;
  background-color: white;
  font-weight: 450;
  box-shadow: 0px 10px 20px rgba(20, 20, 20, 0.2);
  z-index: 10;
`;
