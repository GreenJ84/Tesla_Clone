/** @format */

import { useState } from "react";
import styled from "styled-components";

import LogRegHeader from "../components/Layout/MinimalHeader";
import LogRegFooter from "../components/Layout/SmallFooter";
import Reg1 from "../components/RegistrationPage/Reg1";
import Reg2 from "../components/RegistrationPage/Reg2";

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secStep, setSecStep] = useState(false);

  return (
    <>
      <LogRegHeader />
      <Container>
        <p> Step {!secStep ? "1" : "2"} of 2</p>
        <h1>Create Account</h1>
        <form>
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
