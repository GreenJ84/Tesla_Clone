/** @format */

import React from "react";
import { Button, LoginContainer, Underline } from "../../app/Utils/StyledComponents/LoginComponents";

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



  return (
    <LoginContainer>
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
      {error ? <div>{error}</div> : ""}
      {password ? (
        <Button onClick={buttonHandler}>Sign In</Button>
      ) : (
        <Button disabled>Sign In</Button>
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