/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AUTH } from "../firebase/firebase";

import MinimalHeader from "../components/Layout/MinimalHeader";
import SmallFooter from "../components/Layout/SmallFooter";
import Login1 from "../components/LoginPage/Login1";
import Login2 from "../components/LoginPage/Login2";
import AltLogin from "../components/LoginPage/AltLogin";

import {
  Button2,
  Divide,
  LoginMainContainer,
  Revert,
} from "../app/Utils/StyledComponents/LoginComponents";

import { setLogin } from "../app/Store/User/userSlice";
import { Cover } from "../app/Utils/StyledComponents/LayoutComponents";

const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secStep, setSecStep] = useState(false);
  const [altLogin, setAltLogin] = useState(false);
  const [error, setError] = useState("");

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setPersistence(AUTH, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(AUTH, email, password)
          .then(userCredential => {
            dispatch(setLogin(userCredential.user));
            nav("/");
            return;
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(`${errorMessage}`);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setError(`${errorMessage}`);
      });
  };

  return (
    <>
      <MinimalHeader />
      {altLogin &&
        <>
          <AltLogin
            close={() => {
              setAltLogin(false);
            }}
        />
      </>}
      <Cover show={ altLogin } />
      <LoginMainContainer>
        <h1>Sign In</h1>
        {secStep ? (
          <div className="flex justify-between mb-6">
            <h4 className="text-lg">{email}</h4>
            <div className="relative">
              <Revert onClick={() => setSecStep(false)}>Change</Revert>
            </div>
          </div>
        ) : (
          ""
        )}

        <form>
          {!secStep ? (
            <Login1
              email={[email, setEmail]}
              setStep={() => setSecStep(true)}
            />
          ) : (
            <Login2
              password={[password, setPassword]}
              login={(e: React.MouseEvent<HTMLButtonElement>) => login(e)}
              error={error}
            />
          )}
        </form>

        <div className="relative mt-10 mb-10">
          <Divide> Or </Divide>
        </div>
        <Button2
          onClick={() => {
            setAltLogin(true);
          }}
        >
          Alternate Sign-In
        </Button2>
        <br />
        <Button2 onClick={() => nav("/registration")}>Create Account</Button2>
      </LoginMainContainer>
      <SmallFooter />
    </>
  );
};

export default LoginPage;
