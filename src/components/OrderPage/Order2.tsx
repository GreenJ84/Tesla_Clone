/** @format */

import React from "react";
import styled from "styled-components";
import { useCartState } from "../../app/Utils/hooks/useCartState";
import { Button } from "../../app/Utils/StyledComponents/DisplayComponents";

interface order2Props{
  fn: string
  ln: string
  add: string
  add2: string
  zip: string
  city: string
  state: string
  phone: string
}

const Order2 = (props: order2Props) => {
  const { fn, ln, add, add2, zip, city, state, phone } = props;
  const _products = useCartState();
  let subTotal: number = 0.0;
  for (let product of _products) {
    subTotal += product.price;
  }

  const getTax = (value: number) => {
    return value * .103
  }

  return (
    <Container>
      <h1>Review and Pay</h1>
      <p>Order Summary({_products.length} items)</p>
      <ul>
      {_products.map((product) =>
        <ListItem>
          <img />
          <div>
            <p></p>
            <p></p>
          </div>
          <p></p>
        </ListItem>
      )}
      </ul>

      <div>
        <h1>Shipping Address</h1>
        <p>{fn} { ln }</p>
        <p>{ add }</p>
        {add2 ? <p>{add2}</p> : ""}
        <p>{city}, {state} {zip}</p>
        <p>{ phone }</p>
      </div>

      <div>
        <h1>Billing Address</h1>
        <p>{fn} { ln }</p>
        <p>{ add }</p>
        {add2 ? <p>{add2}</p> : ""}
        <p>{city}, {state} {zip}</p>
      </div>

      <p> Add Promo Code </p>

      <div>
        <div>
          <p>Subtotal</p>
          <p>Shipping</p>
          <p>Sales Tax</p>
          <h2>Total Due</h2>
        </div>
        <div>
          <p> { subTotal }</p>
          <p> Free </p>
          <p> { getTax(subTotal)} </p>
          <h2>{ subTotal + getTax(subTotal) }</h2>
        </div>
      </div>
      <button> Card </button>
      <p>Add Gift Card </p>
      <p> By continuing, I understand and agree to the General Terms and Conditions of Online Car and Accessories Sales, <span>Terms of Use</span> and <span>Privacy Notice</span>.</p>
      <Button> Place Order </Button>
    </Container>
  );
};

export default Order2;

const Container = styled.div`
  
`;

const ListItem = styled.li`

`;
