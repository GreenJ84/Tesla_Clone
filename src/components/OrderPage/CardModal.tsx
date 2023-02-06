import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { BaseSyntheticEvent } from 'react'
import styled from 'styled-components';
import { Button } from '../../app/Utils/StyledComponents/LoginComponents';
import { Card } from './Order2';

interface cardProps{
  toggle: Function
  setCard: [Card, Function]
}

const CardModal = (props: cardProps) => {
  const { toggle } = props;
  const [ card, setCard ] = props.setCard;
  return (
    <Container>
      <div>
        <button
          className="absolute top-8 right-8"
          onClick={(e: BaseSyntheticEvent) => toggle()}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        <h1>Card </h1>
        <label htmlFor="card name">Name on Card</label>
        <input
          name="card name"
          type="text"
          value={card.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setCard("name",e.currentTarget.value)
          }
        />

        <label htmlFor="card number">Card Number</label>
        <input
          name="card number"
          type="text"
          value={card.number}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setCard("number", e.currentTarget.value)
          }
        />

        <CardDetail>
          <div>
            <label htmlFor="expiration">Expiration</label>
            <input
              name="expiration"
              type="month"
              value={card.exp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCard("exp", e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              name="cvv"
              type="text"
              value={card.cvv}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCard("cvv", e.currentTarget.value)}
            />
          </div>
        </CardDetail>
        {card.name && card.number && card.exp && card.cvv ?
          <Button

          > Continue </Button>
        :
          <Button disabled> Continue </Button>}
      </div>
    </Container>
  )
}

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
  >div{
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
    box-shadow: 0px 10px 60px rgba(80, 80, 80, .5);
    >h1{
      font-size: 34px;
      font-weight: 550;
      margin-bottom: 14px;
    }
    label{
      font-size: 18px;
      font-weight: 550;
      color: rgba(80, 80, 80);
      margin-bottom: 9px;
    }
    >input{
      height: 50px;
      background-color: rgba(80, 80, 80, .07);
      border-radius: 5px;
      margin-bottom: 30px;
    }
  }
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: start;
  >div:first-of-type{
    margin-right: 4%;
  }
  >div{
    display: flex;
    flex-direction: column;
    width: 30%;
    >input{
      height: 50px;
      background-color: rgba(80, 80, 80, .07);
      border-radius: 5px;
      margin-bottom: 30px;
    }
  }
`;