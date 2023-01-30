/** @format */

import React, { useState } from "react";
import styled from "styled-components";

interface order1Props{
  fn: [string, Function]
  ln: [string, Function]
  add: [string, Function]
  add2: [string, Function]
  zip: [string, Function]
  city: [string, Function]
  state: [string, Function]
  phone: [string, Function]
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

  const [checked, setChecked] = useState(true);

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
          
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            name="phoneNumber"
            type="text"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.currentTarget.value)}
          />
        </div>
      </Form>
      <h1>Billing</h1>
      <input
        type="checkbox"
        defaultChecked={checked}
      />
      <label> Billing address same as shipping </label>
      {!checked ? 
        <>
          <h2>Account Detail</h2>
          <Form>
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFirstName(e.currentTarget.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
            />
          </Form>
          <h2> Billing Address</h2>
          <Form>
            <div>
              <label htmlFor="country">Country/Region</label>
              <input
                name="country"
                type="text"
              />
              <label htmlFor="address">Address</label>
              <input
                name="address"
                type="text"
              />
              
              <label htmlFor="zipCode">Zip Code</label>
              <input
                name="zipCode"
                type="text"
              />
              
              <label htmlFor="state">State</label>
              <input
                name="state"
                type="state"
              />
            </div>
            <div>
              
              <label htmlFor="addess2">Address Line 2</label>
              <input
                name="addess2"
                type="text"
              />
              
              <label htmlFor="city">City</label>
              <input
                name="city"
                type="text"
              />
            </div>
          </Form>
        </>
      :
        ""
      }
    </Container>
  );
};

export default Order1;

const Container = styled.div``;
const Form = styled.form`
  display: flex;
  label{
    display: block;
  }
  input{
    display: block;
    background-color: rgba(200, 200, 200, .4);
    border-radius: 5px;
  }`;
