/** @format */

import { useState } from "react";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import LogRegHeader from "../components/Layout/MinimalHeader";
import LogRegFooter from "../components/Layout/SmallFooter";
import Reg1 from "../components/RegistrationPage/Reg1";
import Reg2 from "../components/RegistrationPage/Reg2";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [secStep, setSecStep] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    if (password !== confPassword) {
      setError("Passwords are not a match");
      return;
    }
    const auth = getAuth();
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
      <Container>
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
              register={register}
            />
          )}
        </form>
      </Container>
      <LogRegFooter />
    </>
  );
};

export default RegistrationPage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 100px;
  width: 430px;
  margin: 0 auto;
  p {
    position: relative;
    top: 12px;
    font-weight: 600;
    color: rgba(100, 100, 100);
    margin-bottom: 15px;
  }
  h1 {
    font-size: 44px;
    font-weight: 550;
    letter-spacing: 1.6px;
    margin-bottom: 20px;
  }
`;
