/** @format */

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserData } from "../app/Store/User/userSlice";
import Header from "../components/Layout/Header";
import Order1 from "../components/OrderPage/Order1";
import Order2 from "../components/OrderPage/Order2";
export interface Address {
  firstName: string
  lastName: string
  address1: string
  address2: string
  zip: string
  city: string
  state: string
}
export interface shipAddress extends Address{
  phone: string
}
export interface billAddress extends Address{
  companyName: string
  country: string
}

const OrderPage = () => {
  const nav = useNavigate();
  const user = useUserData();

  const [shipAdd, setShipAdd] = useState<shipAddress>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    phone: ""
  });
  const [billAdd, setBillAdd] = useState<billAddress>({
    companyName: "",
    country: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
  });

  const shipHandler = (value: keyof Address, e: React.ChangeEvent<HTMLInputElement>) => {
    let shipCopy = {...shipAdd};
    shipCopy[value] = e.currentTarget.value;
    setShipAdd(shipAdd => ({...shipCopy}))
  }
  const billShipSame = () => {
    let { phone, ...ship } = shipAdd;
    setBillAdd(
      {
        ...ship,
        companyName: "",
        country: "USA"
    })
  }
  const billHandler = (value: keyof billAddress, e: React.ChangeEvent<HTMLInputElement>) => {
    let billCopy = {...billAdd};
    billCopy[value] = e.currentTarget.value;
    setBillAdd(billAdd => ({...billCopy}))
  }

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
            ship={[shipAdd, shipHandler]}
            bill={[billAdd, billHandler, billShipSame]}
            setStep={() => setSecStep(true)}
          />
          :
          <Order2
          ship={shipAdd}
          bill={billAdd}
          setStep={() => setSecStep(false)}
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
