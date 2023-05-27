/** @format */

import React, { BaseSyntheticEvent } from "react";
import styled from "styled-components";

import { XMarkIcon } from "@heroicons/react/24/solid";

import { Button } from "../../app/Utils/StyledComponents/LoginComponents";

import { Payment } from "../../app/Store/Order/orderSlice";

interface cardProps {
  toggle: Function;
  setCard: [Payment, Function];
  submit: Function;
}

const todayDate = () => {
  let date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
  }`;
};

const CardModal = (props: cardProps) => {
  const { toggle, submit } = props;
  const [card, setCard] = props.setCard;
  return (
    <Container>
      <div>
        <button
          className="absolute top-8 right-8"
          onClick={(e: BaseSyntheticEvent) => toggle(e)}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <h1>Card </h1>
        <label htmlFor="card name">Name on Card</label>
        <input
          name="card name"
          type="text"
          value={card.cardHolderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCard("name", e)
          }
        />

        <label htmlFor="card number">Card Number</label>
        <input
          name="card number"
          type="text"
          value={card.cardNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCard("number", e)
          }
        />

        <CardDetail>
          <div>
            <label htmlFor="expiration">Expiration</label>
            <input
              name="expiration"
              type="month"
              min={todayDate()}
              value={card.expMonth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCard("exp", e)
              }
            />
          </div>
          <div>
            <label htmlFor="expiration">Expiration</label>
            <input
              name="expiration"
              type="year"
              min={todayDate().slice(0, 4)}
              value={card.expYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCard("exp", e)
              }
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              name="cvv"
              type="text"
              value={card.cvv}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCard("cvv", e)
              }
            />
          </div>
        </CardDetail>
        {card.cardHolderName &&
        card.cardNumber &&
        card.expMonth &&
        card.expYear &&
        card.cvv ? (
          <Button onClick={(e: BaseSyntheticEvent) => submit(e)}>
            {" "}
            Continue{" "}
          </Button>
        ) : (
          <Button disabled> Continue </Button>
        )}
      </div>
    </Container>
  );
};

export default CardModal;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-transition: 0.5s;
  z-index: 500;
  overflow: auto;
  transition: all 0.3s linear;
  > div {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 63vh;
    width: 89vw;
    max-width: 970px;
    margin: auto;
    padding: 130px 80px 100px;
    z-index: 1000;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 10px 60px rgba(80, 80, 80, 0.5);
    > h1 {
      font-size: 34px;
      font-weight: 550;
      margin-bottom: 14px;
    }
    label {
      font-size: 18px;
      font-weight: 550;
      color: rgba(80, 80, 80);
      margin-bottom: 9px;
    }
    input {
      height: 50px;
      background-color: rgba(80, 80, 80, 0.07);
      border-radius: 5px;
      margin-bottom: 30px;
    }
  }
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: start;
  > div:first-of-type {
    margin-right: 4%;
  }
  > div {
    display: flex;
    flex-direction: column;
    width: 30%;
    input {
      height: 50px;
      background-color: rgba(80, 80, 80, 0.07);
      border-radius: 5px;
      margin-bottom: 30px;
    }
  }
`;
