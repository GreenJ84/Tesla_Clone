/** @format */

import styled from "styled-components";
import { storeType } from "../../app/Store/Car/carSlice";
import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";

const OrderSummary = (props: { subTot: number}) => {
  const subTotal = useAppSelector((state: storeType) => state.car.total);
  return (
    <Container>
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
      <button>
        Checkout
      </button>
    </Container>
  );
};

export default OrderSummary;

const Container = styled.div`
  h1{
    margin-top: 45px;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 1.2px;
  }
  >div{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    >div>p{
      color: rgba(80, 80, 80);
      margin-bottom: 10px;
    }
    >div>p:last-child{
      color: black;
      font-weight: 600;
      font-size: 26px;
      letter-spacing: 1.2px;
      margin-top: 20px;
    }
    >div:nth-of-type(2){
      text-align: end;
    }
  }
  button{ 
    visibility: hidden;
  }
@media screen and (min-width: 1280px) {
  margin: 0;
  width: 540px;
  padding: 0 40px;
  height: 360px;
  box-shadow: 0 10px 30px rgba(150, 150, 150, .6);
  border-radius: 10px;
  button {
    visibility: visible;
    padding: 10px 0;
    width: 460px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    margin-top: 20px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
}
`;
