/** @format */

import styled from "styled-components";
import { storeType } from "../../app/Store/Car/carSlice";
import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";

const OrderSummary = () => {
  const subTotal = useAppSelector((state: storeType) => state.car.total);
  return (
    <Container>
      <h1>Order Summary</h1>
      <div>
        <>
          <p>Shipping</p>
          <p>Sales Tax</p>
          <p>Subtotal</p>
        </>
        <>
          <p>Free</p>
          <p>Calculated at checkout</p>
          <p>{subTotal}</p>
        </>
      </div>
    </Container>
  );
};

export default OrderSummary;

const Container = styled.div``;
