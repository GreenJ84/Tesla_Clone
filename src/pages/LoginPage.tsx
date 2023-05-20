/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import MinimalHeader from "../components/Layout/MinimalHeader";
import SmallFooter from "../components/Layout/SmallFooter";
import Login1 from "../components/LoginPage/Login1";
import Login2 from "../components/LoginPage/Login2";
import {
  Button2,
  Divide,
  LoginMainContainer,
  Revert,
} from "../app/Utils/StyledComponents/LoginComponents";

import { setLogin } from "../app/Store/User/userSlice";
import { AUTH, DB } from "../firebase/firebase";
import AltLogin from "../components/LoginPage/AltLogin";

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
          .then((userCredential) => {
            if (!userCredential.user) {
              return;
            }
            const user = userCredential.user;
            setDoc(
              doc(DB, "users", user.uid),
              {
                name: user.displayName,
                email: user.email,
              },
              { merge: true }
            );
            dispatch(setLogin(user));
            nav("/");
            return;
          })
          .catch((error) => {
            const errorMessage = error.message.split(": ")[1];
            setError(`${errorMessage}`);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message.split(": ")[1];
        setError(`${errorMessage}`);
      });
  };

  return (
    <>
      <MinimalHeader />
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

        <div className="relative">
          <Divide> Or </Divide>
        </div>
        {!altLogin ? (
          <Button2
            onClick={() => {
              setAltLogin(true);
            }}
          >
            Alternate Sign-In
          </Button2>
        ) : (
          <AltLogin />
        )}
        <br />
        <Button2 onClick={() => nav("/registration")}>Create Account</Button2>
      </LoginMainContainer>
      <SmallFooter />
    </>
  );
};

export default LoginPage;
