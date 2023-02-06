/** @format */

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserData } from "../app/Store/User/userSlice";
import Header from "../components/Layout/Header";
import Order1 from "../components/OrderPage/Order1";
import Order2 from "../components/OrderPage/Order2";

const OrderPage = () => {
  const nav = useNavigate();
  const user = useUserData();

  interface Address {
    firstName: string
    lastName: string
    address1: string
    address2: string
    zip: string
    city: string
    state: string
    phone: string
  }

  const [shipAdd, setShipAdd] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    phone: ""
  });
  const [billAdd, setBillAdd] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    phone: ""
  });

  const shipHandler = (value: keyof Address, e: React.ChangeEvent<HTMLInputElement>) => {
    let shipCopy = {...shipAdd};
    shipCopy[value] = e.currentTarget.value;
    setShipAdd(shipAdd => ({...shipCopy}))
  }
  const billShipSame = () => {
    setBillAdd({...shipAdd})
  }
  const billHandler = (value: keyof Address, e: React.ChangeEvent<HTMLInputElement>) => {
    let billCopy = {...billAdd};
    billCopy[value] = e.currentTarget.value;
    setBillAdd(billAdd => ({...billCopy}))
  }

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
            <button onClick={() => setSecStep(false)}> <ChevronLeftIcon className="relative right-1 w-6 h-6"/>Back</button>
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
  width: 670px;
  margin: 7vh auto 0;
  >button{
    position: relative;
    right: 2px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 24px;
    color: rgba(80, 80, 80, .9);
  }
  >button:hover{
    color: black;
  }
  >p{
    font-size: 20px;
    letter-spacing: 1.1px;
    word-spacing: 1.4px;
  }
`;
