/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AUTH, DB } from "../firebase/firebase";

import MinimalHeader from "../components/Layout/MinimalHeader";
import SmallFooter from "../components/Layout/SmallFooter";
import Reg1 from "../components/RegistrationPage/Reg1";
import Reg2 from "../components/RegistrationPage/Reg2";
import AltLogin from "../components/LoginPage/AltLogin";

import { RegMainContainer } from "../app/Utils/StyledComponents/RegisrationComponents";
import { Button2, Divide } from "../app/Utils/StyledComponents/LoginComponents";

import { setLogin } from "../app/Store/User/userSlice";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [secStep, setSecStep] = useState(false);
  const [altLogin, setAltLogin] = useState(false);
  const [error, setError] = useState("");

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("Passwords are not a match");
      return;
    }
    createUserWithEmailAndPassword(AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            setDoc(
              doc(DB, "users", user.uid),
              {
                name: user.displayName,
                email: user.email,
              },
              { merge: true }
            );
          })
          .catch((err) =>
            console.error("User update error has occured\n", err)
          );

        sendEmailVerification(user);
        dispatch(setLogin(user));
        alert(`A verification email has been sent to ${user.email}`);
        nav("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message.split(": ")[1];

        console.error(
          "A registration error has occured\n",
          `Error ${errorCode}: ${errorMessage}`
        );
        setError(errorMessage);
        setSecStep(false);
      });
  };

  return (
    <>
      <MinimalHeader />
      <RegMainContainer>
        <p> Step {!secStep ? "1" : "2"} of 2</p>
        <h1>Create Account</h1>
        <form>
          {error ? <span>{error}</span> : ""}
          {!secStep ? (
            <Reg1
              firstName={[firstName, setFirstName]}
              lastName={[lastName, setLastName]}
              setStep={() => setSecStep(true)}
            />
          ) : (
            <Reg2
              email={[email, setEmail]}
              password={[password, setPassword]}
              confPassword={[confPassword, setConfPassword]}
              register={(e: React.MouseEvent<HTMLButtonElement>) => register(e)}
            />
          )}
        </form>

        <div className="relative mt-10 mb-10">
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
          <AltLogin
            close={() => {
              setAltLogin(false);
            }}
          />
        )}
      </RegMainContainer>
      <SmallFooter />
    </>
  );
};

export default RegistrationPage;
