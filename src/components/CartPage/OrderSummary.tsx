/** @format */

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { OrderSumaryContainer } from "../../app/Utils/StyledComponents/CartComponents";

import { setTotal } from "../../app/Store/Car/carSlice";

const OrderSummary = (props: { subTot: number }) => {
  const dispatch = useDispatch()
  const nav = useNavigate();

  return (
    <OrderSumaryContainer>
      <h1>Order Summary</h1>
      <div>
        <div>
          <p>Shipping</p>
          <p>Sales Tax</p>
          <p>Subtotal</p>
        </div>
        <div>
          <p>Free</p>
          <p>Calculated at checkout</p>
          <p>${props.subTot}.00</p>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(setTotal(props.subTot));
          nav('/order');
        }}
      >
        Checkout
      </button>
    </OrderSumaryContainer>
  );
};

export default OrderSummary;
