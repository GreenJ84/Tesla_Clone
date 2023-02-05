/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserData } from "../app/Store/User/userSlice";
import Header from "../components/Layout/Header";
import SmallFooter from "../components/Layout/SmallFooter";
import Order1 from "../components/OrderPage/Order1";
import Order2 from "../components/OrderPage/Order2";

const OrderPage = () => {
  const nav = useNavigate();
  const user = useUserData();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  const [secStep, setSecStep] = useState(false);

  useEffect(() => {
    if (!user.isLoggedIn) {
      nav('/login')
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        {secStep ? 
          <>
            <p onClick={() => setSecStep(false)}>Back</p>
            <p>Step 2 of 2</p>
          </>
        :
          ""
        }
        {!secStep ?
          <Order1
            fn={[firstName, setFirstName]}
            ln={[lastName, setLastName]}
            add={[address, setAddress]}
            add2={[address2, setAddress2]}
            zip={[zip, setZip]}
            city={[city, setCity]}
            state={[state, setState]}
            phone={[phone, setPhone]}
            setStep={() => setSecStep(true)}
          />
          :
          <Order2
          fn={firstName}
          ln={lastName}
          add={address}
          add2={address2}
          zip={zip}
          city={city}
          state={state}
          phone={phone}
          />
        }
      </Container>
    </>
  );
};

export default OrderPage;

const Container = styled.div`
  position: relative;
  width: 660px;
  margin: 5vh auto 0;
`;
