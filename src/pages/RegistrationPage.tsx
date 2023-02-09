/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import LogRegHeader from "../components/Layout/MinimalHeader";
import LogRegFooter from "../components/Layout/SmallFooter";
import Reg1 from "../components/RegistrationPage/Reg1";
import Reg2 from "../components/RegistrationPage/Reg2";
import { RegMainContainer } from "../app/Utils/StyledComponents/RegisrationComponents";

import { AUTH } from "../index";

const RegistrationPage = () => {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [secStep, setSecStep] = useState(false);
  const [error, setError] = useState("");

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("Passwords are not a match");
      return;
    }
    const auth = AUTH;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // firebase authenticated and signed in
        if (!auth.currentUser) return;
        sendEmailVerification(auth.currentUser);
        // eslint-disable-next-line no-restricted-globals
        confirm(`A verification email has been sent to ${auth.currentUser.email}`);

        updateProfile(auth.currentUser, {
          displayName: `${firstName}
            ${lastName ? ` ${lastName}` : ""}`
        })
          .then(() => {
            console.log('Profile updated');
          })
          .catch(err =>
            console.log("User update error has occured\n", err
            ));
        // redirect for app sign
        nav('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message.split(": ")[1];
        
        console.log("A registration error has occured\n", `Error ${errorCode}: ${errorMessage}`)
        setError(errorMessage);
        setSecStep(false);
      });
  }

  return (
    <>
      <LogRegHeader />
      <RegMainContainer>
        <p> Step {!secStep ? "1" : "2"} of 2</p>
        <h1>Create Account</h1>
        <form>
          {error ?
            <span>{ error }</span>
          : 
            ""
          }
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
      </RegMainContainer>
      <LogRegFooter />
    </>
  );
};

export default RegistrationPage;
