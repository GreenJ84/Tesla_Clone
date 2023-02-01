/** @format */

import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import MinimalHeader from "../components/Layout/MinimalHeader";
import SmallFooter from "../components/Layout/SmallFooter";
import Login1 from "../components/LoginPage/Login1";
import Login2 from "../components/LoginPage/Login2";
import { setLogin } from "../app/Store/User/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [secStep, setSecStep] = useState(false);
  const [error, setError] = useState("");

  const login = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setLogin(user));
        nav("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message.split(": ")[1];
        console.log(`Error ${errorCode}: ${errorMessage}`);
        setError(errorMessage);
      });
  }

  return (
    <>
      <MinimalHeader />
      <Container>
        <h1>Sign In</h1>
        {secStep ? (
          <div className="flex justify-between mb-6">
            <h4 className="text-lg">{email}</h4>
            <div className="relative">
              <Underline
                onClick={() => setSecStep(false)}
              >
                Change
              </Underline>
            </div>
          </div>
        ) : (
          ""
        )}
        <form>
          {error ? 
            <span>{ error }</span>
          :
            ""}
          {!secStep ? (
            <Login1
              email={[email, setEmail]}
              setStep={() => setSecStep(true)}
            />
          ) : (
            <Login2
              password={[password, setPassword]}
              login={() => login}
            />
          )}
        </form>
        <div className="relative">
          <Divide> Or </Divide>
        </div>
        <Button2>Alternate Sign-In</Button2>
        <br />
        <Button2 onClick={() => nav("/registration")}>Create Account</Button2>
      </Container>
      <SmallFooter />
    </>
  );
};

export default LoginPage;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 100px;
  width: 430px;
  margin: 0 auto;
  h1 {
    font-size: 44px;
    font-weight: 550;
    letter-spacing: 1.6px;
    margin-bottom: 20px;
  }
`;

const Underline = styled.p`
  cursor: pointer;
  display: block;
  margin: auto;
  width: 80px;
  font-size: 19px;
  letter-spacing: 1.4px;
  :after {
    content: "";
    position: absolute;
    bottom: 0.5px;
    left: -3px;
    height: 0;
    width: 95%;
    border-bottom: 1.4px solid black;
    transition: width 0.3s ease;
  }
  :hover:after {
    border-bottom: 3px solid black;
  }
`;

const Divide = styled.p`
  font-size: 18px;
  font-weight: 620;
  color: rgba(90, 90, 90);
  text-align: center;
  letter-spacing: 1.4px;
  margin-bottom: 64px;
  :before,
  :after {
    content: "";
    position: absolute;
    bottom: 76px;
    height: 0;
    width: 42%;
    border-bottom: 1.4px solid rgba(200, 200, 200, 0.5);
    transition: width 0.3s ease;
  }
  :before {
    left: 0px;
  }
  :after {
    right: 0px;
  }
`;

const Button2 = styled.button`
  padding: 10px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: black;
  background-color: rgba(220, 220, 220, 0.3);
  border-radius: 4px;
  :hover {
    background-color: rgba(220, 220, 220, 0.5);
  }
`;
