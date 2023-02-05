/** @format */

import React, { useDebugValue, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setTotal } from "../../app/Store/Car/carSlice";
import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";
import { useCartState } from "../../app/Utils/hooks/useCartState";
import { Button } from "../../app/Utils/StyledComponents/DisplayComponents";
import CardModal from "./CardModal";

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
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState(false);
  const [card, setCard] = useState(false);

  const { fn, ln, add, add2, zip, city, state, phone } = props;
  const _products = useCartState();
  const subTotal = useAppSelector((state) => state.car.total)

  const getTax = (value: number) => {
    return value * .103
  }
  const toggleCardModal = () => {
    cardModal ?
      setCardModal(false)
      :
      setCardModal(true)
  }

  return (
    <Container>
      <h1>Review and Pay</h1>
      <p>Order Summary({_products.length} items)</p>
      <ul>
      {_products.map((product) =>
        <ListItem key={product.id}>
          <img
            src={`/images/${product.backgroundImg}`}
            alt={product.title}
          />
          <div>
            <p>{product.title}</p>
            <p>
              Quantity: { product.quantity }
            </p>
          </div>
          <p>${product.price}.00</p>
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
      <button
        onClick={() => toggleCardModal}
      >
        Card
      </button>
      {cardModal ? 
        <CardModal setCard={() => setCard(true) } />
      :
        ""}
      <p>Add Gift Card </p>
      <p> By continuing, I understand and agree to the General Terms and Conditions of Online Car and Accessories Sales, <span>Terms of Use</span> and <span>Privacy Notice</span>.</p>
      {card ?
        <Button
          onClick={() => {
            dispatch(setTotal(subTotal + getTax(subTotal)));
            nav('/confirmation');
          }}
        >
          Place Order
        </Button>
      :
        <Button
          disabled
        >
          Place Order
        </Button>
      }
    </Container>
  );
};

export default Order2;

const Container = styled.div`
  
`;

const ListItem = styled.li`

`;
