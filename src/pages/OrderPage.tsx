/** @format */

import React, { useState } from "react";
import Order1 from "../components/OrderPage/Order1";
import Order2 from "../components/OrderPage/Order2";

const OrderPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  const [secStep, setSecStep] = useState(false)

  return (
    <>
      {secStep ? 
        <p onClick={() => setSecStep(false)}>Back</p>
      :
        ""
      }
      <p>Step { secStep ? '2' : "1" } of 2</p>
      {secStep ?
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
    </>
  );
};

export default OrderPage;
