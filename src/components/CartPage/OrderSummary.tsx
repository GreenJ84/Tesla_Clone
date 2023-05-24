/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { OrderSumaryContainer } from "../../app/Utils/StyledComponents/CartComponents";

import { setTotal } from "../../app/Store/Car/carSlice";
import { useCommas } from "../../app/Utils/hooks/useCommas";

const OrderSummary = ({
  subTot,
  disabled = true,
}: {
  subTot: number;
  disabled: boolean;
}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <OrderSumaryContainer>
      <h2 aria-label="Order Cost summary estimates">Order Summary</h2>
      <div>
        <div>
          <p>Shipping</p>
          <p>Sales Tax</p>
          <p>Subtotal</p>
        </div>
        <div>
          <p aria-label="No cost for Shipping">Free</p>
          <p aria-label="Taxes will be calculated at Checkout">
            Calculated at checkout
          </p>
          <p aria-label="Subtotal for current Cart">${useCommas(subTot)}.00</p>
        </div>
      </div>
      {!disabled ? (
        <button
          aria-label="Continue to Order page to checkout"
          onClick={() => {
            dispatch(setTotal(subTot));
            nav("/order");
          }}
        >
          Checkout
        </button>
      ) : (
        <button
          disabled
          aria-disabled="true"
          aria-label="Cannot proceed without any Items to order"
        >
          Checkout
        </button>
      )}
    </OrderSumaryContainer>
  );
};

export default OrderSummary;
