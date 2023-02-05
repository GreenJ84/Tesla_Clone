/** @format */

import React from "react";
import styled from "styled-components";
import { Button } from "../../app/Utils/StyledComponents/LoginComponents";

interface Login2Props {
  password: [string, Function];
  login: Function;
}

const Login2 = (props: Login2Props) => {
  const [password, setPassword] = props.password;
  const { login } = props;

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(e);
  };

  return (
    <Container>
      <label
        htmlFor="password"
        className="relative"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
        className="w-[430px]"
        required
        pattern="([A-Za-z!#$%&]+[1-9]+){8,}"
      />
      {password ? (
        <Button onClick={buttonHandler}>Sign In</Button>
      ) : (
        <Button disabled>Sign In</Button>
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
    bottom: 276px;
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
