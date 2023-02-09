/** @format */

import React from "react";
import styled from "styled-components";
import { useCommas } from "../../app/Utils/hooks/useCommas";

const FinalOrder = (props: { subTot: number }) => {
  const { subTot } = props;

  const getTax = (value: number) => {
    return Math.round(value * 0.103 * 100) / 100;
  };

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
          <p> $ {useCommas(subTot)}.00</p>
          <p> Free </p>
          <p> $ {useCommas(getTax(subTot))} </p>
          <h2> $ {useCommas(subTot + getTax(subTot))}</h2>
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
