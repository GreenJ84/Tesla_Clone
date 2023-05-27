/** @format */

import React from "react";
import styled from "styled-components";

import { formatPrice, useAppSelector } from "../../app/Utils/hooks/hooks";

const FinalOrder = () => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <FinalOrderContainer>
      <div>
        <div>
          <p>Subtotal</p>
          <p>Shipping</p>
          <p>Sales Tax</p>
          <h2>Total Due</h2>
        </div>
        <div>
          <p> $ {formatPrice(cart.subTotal)}.00</p>
          <p> Free </p>
          <p> $ {formatPrice(cart.tax)} </p>
          <h2> $ {formatPrice(cart.total)}</h2>
        </div>
      </div>
    </FinalOrderContainer>
  );
};

export default FinalOrder;

const FinalOrderContainer = styled.div`
  margin-bottom: 50px;
  > div {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    line-height: 28px;
    > div {
      > p {
        color: rgba(60, 60, 60);
        margin-bottom: 10px;
      }
      > h2 {
        color: black;
        font-weight: 600;
        font-size: 26px;
        letter-spacing: 1.2px;
        margin-top: 20px;
      }
    }
    > div:nth-of-type(2) {
      text-align: end;
    }
  }
`;
