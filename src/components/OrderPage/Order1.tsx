/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../app/Utils/StyledComponents/LoginComponents";

interface order1Props{
  fn: [string, Function]
  ln: [string, Function]
  add: [string, Function]
  add2: [string, Function]
  zip: [string, Function]
  city: [string, Function]
  state: [string, Function]
  phone: [string, Function]
  setStep: Function
}

const Order1 = (props: order1Props) => {
  const [firstName, setFirstName] = props.fn;
  const [lastName, setLastName] = props.ln;
  const [address, setAddress] = props.add;
  const [address2, setAddress2] = props.add2;
  const [zip, setZip] = props.zip;
  const [city, setCity] = props.city;
  const [state, setState] = props.state;
  const [phone, setPhone] = props.phone;
  const { setStep } = props;

  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState(true);

  const toggleChecked = () => {
    checked ?
      setChecked(false)
    :
      setChecked(true)
  }
  const toggleRadio = () => {
    radio ?
      setRadio(false)
    :
      setRadio(true)
  }

  return (
    <Container>
      <h1> Shipping </h1>
      <Form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFirstName(e.currentTarget.value)}
          />
          
          <label htmlFor="address">Address</label>
          <input
            name="address"
            type="text"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)}
          />
          
          <label htmlFor="zipCode">Zip Code</label>
          <input
            name="zipCode"
            type="text"
            value={zip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZip(e.currentTarget.value)}
          />
          
          <label htmlFor="state">State</label>
          <input
            name="state"
            type="state"
            value={state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
          />
          
          <label htmlFor="addess2">Address Line 2</label>
          <input
            name="addess2"
            type="text"
            value={address2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress2(e.currentTarget.value)}
          />
          
          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            value={city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.currentTarget.value)}
          />
          
          <label htmlFor="phoneNumber">Mobile Phone Number</label>
          <input
            name="phoneNumber"
            type="text"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.currentTarget.value)}
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
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFirstName(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
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
          <Form>
            <div>
              <label htmlFor="country">Country/Region</label>
              <input
                name="country"
                type="text"
              />
              <label htmlFor="address">Address Line 2</label>
              <input
                name="address"
                type="text"
              />
              
              <label htmlFor="state">State</label>
              <input
                name="state"
                type="state"
              />
            </div>
            <div>
              
              <label htmlFor="addess2">Address Line 1</label>
              <input
                name="addess2"
                type="text"
              />
              
              <label htmlFor="city">City</label>
              <input
                name="city"
                type="text"
              />
              <label htmlFor="zipCode">Zip Code</label>
              <input
                name="zipCode"
                type="text"
              />
            </div>
          </Form>
          
        </>
      :
        ""
      }
      <Button
        className="relative left-1 mt-8 !px-28"
        onClick={() => setStep()}
      >
        Next
      </Button>
    </Container>
  );
};

export default Order1;

const Container = styled.div`
  h1{
    font-size: 56px;
    font-weight: 500;
    letter-spacing: 1.2px;
  }
  > div{
    display: flex;
    align-items: center;
    >input{
      margin-right: 10px;
      border: 2.5px solid black;
      border-radius: 3px;
      appearance: none;
    }
    >input::before{
      position: relative;
      top: 2px;
      left: 7px;
      visibility: hidden;
      background: transparent;
      font-size: 16px;
      font-weight: 600;
      content: '✓';
      color: black;
    }
    >input:checked::before{
      visibility: visible;
    }
    > label{
      font-size: 20px;
      font-weight: 500;
      color: rgba(90, 90, 90);
    }
  }
  >h2:first-of-type{
    margin-top: 36px;
    margin-bottom: 8px;
  }
  >h2{
    font-size: 32px;
    font-weight: 550;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  input[type="radio"]{
    position: relative;
    margin-right: 4px;
    width: 28px;
    height: 28px;
    border: 1.5px solid rgba(80, 80, 80);
    border-radius: 50%;
    appearance: none;
  }
  input[type="radio"]:checked::after{
    content: "•";
    position: absolute;
    top: -37.5px;
    left: -0.5px;
    font-size: 60px;
    color: rgba(50, 50, 50);
  }
  input[type="radio"] + label{
    font-size: 20px;
  }
  >div{
    width: 47.5%;
    >label{
      display: block;
      font-size: 19px;
      font-weight: 600;
      color: rgba(110, 110, 110);
      margin-bottom: 8px;
    }
    >input{
      display: block;
      background-color: rgba(200, 200, 200, .22);
      border-radius: 5px;
      width: 100%;
      height: 50px;
      margin-bottom: 28px;
    }
  }
  `;
  const Form2 = styled.form`
  label{
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 20px;
  }
  div:last-of-type{
    margin-bottom: 32px;
  }
  input[type="radio"]{
    position: relative;
    margin-right: 4px;
    width: 28px;
    height: 28px;
    border: 1.5px solid rgba(80, 80, 80);
    border-radius: 50%;
    appearance: none;
  }
  input[type="radio"]:checked::after{
    content: "•";
    position: absolute;
    top: -37.5px;
    left: -0.5px;
    font-size: 60px;
    color: rgba(50, 50, 50);
  }
  input[type="radio"] + label{
    font-size: 20px;
  }
  }
  `;
