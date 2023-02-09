/** @format */

import React, { BaseSyntheticEvent, useState } from "react";
import { Button } from "../../app/Utils/StyledComponents/LoginComponents";
import { Form, Form2, Order1Container } from "../../app/Utils/StyledComponents/OrderComponents";
import { billAddress, shipAddress } from "../../pages/OrderPage";


interface order1Props{
  ship: [shipAddress, Function]
  bill: [billAddress, Function, Function]
  setStep: Function
}

const Order1 = (props: order1Props) => {
  const [shipAdd, shipHandler] = props.ship;
  const [billAdd, billHandler, billShipSame] = props.bill;
  const { setStep } = props;

  const [checked, setChecked] = useState(true);
  const toggleChecked = () => {
    checked ?
    setChecked(false)
    :
    setChecked(true)
  }

  const [radio, setRadio] = useState(true);
  const toggleRadio = () => {
    radio ?
      setRadio(false)
    :
      setRadio(true)
  }

  const submitAddress = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    if (checked) {
      billShipSame()
    }
    setStep()
  }

  return (
    <Order1Container>
      <h1> Shipping </h1>
      <Form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            value={shipAdd.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>shipHandler("firstName", e)}
          />
          
          <label htmlFor="address">Address Line 1</label>
          <input
            name="address1"
            type="text"
            value={shipAdd.address1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("address1",e)}
          />
          
          <label htmlFor="zipCode">Zip Code</label>
          <input
            name="zipCode"
            type="text"
            value={shipAdd.zip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("zip", e)}
          />
          
          <label htmlFor="state">State</label>
          <input
            name="state"
            type="state"
            value={shipAdd.state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("state", e)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={shipAdd.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("lastName", e)}
          />
          
          <label htmlFor="addess2">Address Line 2</label>
          <input
            name="address2"
            type="text"
            value={shipAdd.address2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("address2", e)}
          />
          
          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            value={shipAdd.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("city", e)}
          />
          
          <label htmlFor="phoneNumber">Mobile Phone Number</label>
          <input
            name="phoneNumber"
            type="text"
            value={shipAdd.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => shipHandler("phone", e)}
          />
        </div>
      </Form>
      <h1 className="mt-6">Billing</h1>
      <div>
        <input
          className="w-8 h-8"
          type="checkbox"
          defaultChecked={checked}
          onChange={() => toggleChecked()}
        />
        <label> Billing address is the same as shipping </label>
      </div>
      {!checked ? 
        <>
          <h2>Account Details</h2>
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                type="text"
                value={billAdd.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("firstName", e)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={billAdd.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => billHandler("lastName", e)}
              />
            </div>
          </Form>
          <h2> Billing Address</h2>
          <Form2 >
            <div>
              <label htmlFor="accountType" className={radio ? "font-semibold"
                : ""} >
                <input
                  type="radio"
                  name="accountType"
                  defaultChecked={radio}
                  onClick={() => { toggleRadio(); console.log(radio) }}
                />
                Personal</label>
            </div>
            <div>
                <label htmlFor="accountType" className={!radio ? "font-semibold"
                : ""}>
                <input
                  type="radio"
                  name="accountType"
                  defaultChecked={!radio}
                  onClick={() => { toggleRadio(); console.log(radio) }}
                />
                Business</label>
            </div>
          </Form2>
          {radio && <Form>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input
                name="companyName"
                type="text"
                value={billAdd.companyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("companyName", e)}
              />
            </div>
          </Form>}
          <Form>
            <div>
              <label htmlFor="country">Country/Region</label>
              <input
                name="country"
                type="text"
                value={billAdd.country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("country", e)}
              />
              <label htmlFor="address2">Address Line 2</label>
              <input
                name="address2"
                type="text"
                value={billAdd.address2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("address2", e)}
              />
              
              <label htmlFor="state">State</label>
              <input
                name="state"
                type="state"
                value={billAdd.state}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("state", e)}
              />
            </div>
            <div>
              <label htmlFor="addess1">Address Line 1</label>
              <input
                name="addess1"
                type="text"
                value={billAdd.address1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("address1", e)}
              />
              
              <label htmlFor="city">City</label>
              <input
                name="city"
                type="text"
                value={billAdd.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("city", e)}
              />
              <label htmlFor="zip">Zip Code</label>
              <input
                name="zip"
                type="text"
                value={billAdd.zip}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>billHandler("zip", e)}
              />
            </div>
          </Form>
          
        </>
      :
        ""
      }
      {checked && shipAdd.firstName && shipAdd.lastName && shipAdd.address1 && shipAdd.city && shipAdd.state && shipAdd.zip && shipAdd.phone ?
        <Button
          className="relative left-1 mt-8 !px-28"
          onClick={(e: BaseSyntheticEvent) => submitAddress(e)}
        >
          Next
        </Button>
      :
      !checked && shipAdd.firstName && shipAdd.lastName && shipAdd.address1 && shipAdd.city && shipAdd.state && shipAdd.zip && shipAdd.phone && billAdd.firstName && billAdd.lastName && billAdd.address1 && billAdd.city && billAdd.state && billAdd.zip ?
        <Button
          className="relative left-1 mt-8 !px-28"
          onClick={(e: BaseSyntheticEvent) => submitAddress(e)}
        >
          Next
        </Button>
      :
        <Button
        className="relative left-1 mt-8 !px-28"
        disabled> Next </Button>}
    </Order1Container>
  );
};

export default Order1;