/** @format */

import React, { BaseSyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"

import styled from "styled-components";
import { Body } from "../../pages/CartPage";
import CartItem from "../CartPage/CartItem";
import CardModal from "./CardModal";
import FinalOrder from "./FinalOrder";

import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";
import { useCartState } from "../../app/Utils/hooks/useCartState";
import { setTotal } from "../../app/Store/Car/carSlice";
import { billAddress, shipAddress } from "../../pages/OrderPage";
import { DB } from "../..";

interface order2Props{
  ship: shipAddress
  bill: billAddress
  setStep: Function
}

const Order2 = (props: order2Props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState(false);
  const [card, setCard] = useState(false);

  const { ship, bill, setStep } = props;
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
  const edit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setStep()
  }
  const logOrder = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    let total = subTotal + getTax(subTotal)
    try {
      const docRef = await addDoc(collection(DB, "orders"), {
        order: _products,
        shipping: ship,
        billing: bill,
        total: total,
      });
      console.log("Saving Order");
      dispatch(setTotal(total));
      console.log("Order written with ID: ", docRef.id);
      nav('/confirmation');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Order2Body>
      <h1>Review and Pay</h1>
      <p>Order Summary ({_products.length} items)</p>
      <Container>
        <ul>
        {_products.map((product) =>
          <li key={product.id}>
            <CartItem product={product} />
          </li>
        )}
        </ul>

        <Address>
          <div>
            <h3>Shipping Address</h3>
            <button
              onClick={(e: BaseSyntheticEvent) => edit(e)}
            >
              Edit
            </button>
          </div>
          <p>{ship.firstName} { ship.lastName }</p>
          <p>{ ship.address1 }</p>
          {ship.address2 ? <p>{ship.address2}</p> : <p></p>}
          <p>{ship.city}, {ship.state} {ship.zip}</p>
          <p>{ ship.phone }</p>
        </Address>

        <Address>
          <div>
            <h3>Billing Address</h3>
            <button
              onClick={(e: BaseSyntheticEvent) => edit(e)}
            >
              Edit
            </button>
          </div>
          {bill.companyName ?
            <p>{ bill.companyName }</p>
          : ""}
          <p>{bill.firstName} { bill.lastName }</p>
          <p>{ bill.address1 }</p>
          {bill.address2 ? <p>{bill.address2}</p> : ""}
          <p>{bill.city}, {bill.state} {bill.zip}</p>
          <p>{bill.country}</p>
        </Address>

        <p>
          Add Promo Code
        </p>

        <FinalOrder subTot={subTotal} />
        <Button
          
          onClick={() => toggleCardModal}
        >
          Card
        </Button>
        {cardModal ? 
          <CardModal setCard={() => setCard(true) } />
        :
          ""}
        <p>
          Add Gift Card
        </p>
        <p> By continuing, I understand and agree to the General Terms and Conditions of Online Accessories Sales, <span>Terms of Use</span> and <span>Privacy Notice</span>.</p>
        {card ?
          <Button
            className="px-8"
            onClick={(e: BaseSyntheticEvent) => {
              logOrder(e)
            }}
          >
            Place Order
          </Button>
        :
          <Button
            className="px-4"
            disabled
          >
            Place Order
          </Button>
          }
        </Container>
    </Order2Body>
  );
};

export default Order2;

const Order2Body = styled(Body)`
  >h1{
    position: relative;
    bottom: 16px;
    font-size: 60px;
    font-weight: 500;
  }
  >p{
    font-size: 19px;
    letter-spacing: 1.05px;
  }
`;

const Container = styled.div`
  display: flex;
  >ul{
    padding: 50px 0;
    margin-bottom: 70px;
    border-bottom: 1px solid grey;
  }
  >p:first-of-type{
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 34px;
    color: rgba(30,30,30)
  }
  >p:nth-of-type(2){
    font-size: 18px;
    font-weight: 350;
    letter-spacing: 1.04px;
    margin-bottom: 32px;
  }
  >p:nth-of-type(3){
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 30px;
    letter-spacing: 1.04px;
    word-spacing: 1.2px;
    color: rgba(90, 90, 90);
    >span{
      color: inherit;
      border-bottom: 1.5px solid black;
      :hover{
        border-bottom: 2px solid black;
        color: black;
      }
    }
    
  }
  @media screen and (min-width: 1280px) {

  }
  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }
`;

const Address = styled.div`
  letter-spacing: 1.1px;
  line-height: 28px;
  margin-bottom: 27px;
  >div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    >h3{
      font-size: 20px;
      font-weight: 350;
      color: rgba(90, 90, 90);
      margin-bottom: 6px;
    }
    >button{
      position: relative;
      right: 26px;
      font-size: 20px;
      color: rgba(80, 80, 80);
      border-bottom: 1.5px solid rgba(80, 80, 80);
      line-height: 24px;
      :hover{
        border-bottom: 3px solid rgba(80, 80, 80);
        line-height: 25.5px;
        color: black;
      }
    }
  }
  >p{
      font-size: 20px;
      font-weight: 500;
      color: black;
  }
`;

const Button = styled.button`
padding: 10px 40px;
margin-bottom: 28px;
font-size: 20px;
font-weight: 600;
letter-spacing: 1.2px;
color: white;
background-color: rgba(40, 65, 255, 0.8);
border-radius: 4px;
:hover {
  background-color: rgba(20, 35, 205, 0.8);
}
:disabled {
  background-color: rgba(0, 65, 205, 0.4);
  cursor: not-allowed;
}
`;
