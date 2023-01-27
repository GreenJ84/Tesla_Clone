/** @format */

import React from "react";
import styled from "styled-components";
import { Button } from "../../app/Utils/StyledComponents/LoginComponents";

interface Login2Props {
  email: string;
  password: [string, Function];
  setStep: Function;
}

const Login2 = (props: Login2Props) => {
  const [email, setEmail] = props.password;
  const { setStep } = props;

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep();
  };

  return (
    <Container>
      <label
        htmlFor=""
        className="relative"
      >
        Password
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
      <a href="/">Forgot Password?</a>
    </Container>
  );
};

export default Login2;

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
  a {
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    letter-spacing: 1.4px;
    margin-bottom: 60px;
  }
  a:after {
    content: "";
    position: absolute;
    bottom: 200px;
    left: 130px;
    height: 0;
    width: 38%;
    border-bottom: 1.4px solid black;
    transition: width 0.3s ease;
  }
  a:hover:after {
    border-bottom: 3px solid black;
  }
`;
