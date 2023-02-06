/** @format */

import { useDispatch } from "react-redux";
import styled from "styled-components";

import OrderSummary from "../components/CartPage/OrderSummary";

import { useCartState } from "../app/Utils/hooks/useCartState";
import CartItem from "../components/CartPage/CartItem";
import Header from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";
import { setTotal } from "../app/Store/Car/carSlice";

const CartPage = () => {
  const _products = useCartState();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const subTotal = _products.reduce((acc, curr) => {
    acc += curr.price * curr.quantity;
    return acc;
  }, 0);

  return (
    <Body className="mx-auto">
      <Header />
      <h1 style={{ "maxWidth": "1400px","position":"relative" }} className="mt-32 xl:mt-20 mb-2 xl:mb-0 xl:mx-auto pb-8 border-b-[1.5px] xl:border-none text-3xl xl:text-5xl font-semibold"> Cart </h1>
      <Container>
        <Cart>
          {_products.length > 0 ?
            <>
              {_products.map((product) => (
                <span key={product.id}>
                  <CartItem product={product} />
                </span>
              ))}
            </>
          :
            <EmptyCart>
              <h3>No items in Cart</h3>
              <button
                onClick={() => nav('/')}
              > Return Shopping </button>
            </EmptyCart>
          }
        </Cart>
        <OrderSummary subTot={ subTotal } />
      </Container>
      <Checkout>
        {_products.length! > 0 ?
          <button
            onClick={() => {
              dispatch(setTotal(subTotal));
              nav('/order')
            }}
          >
            Checkout
          </button>
        :
          <button disabled>
            Checkout
          </button>
        }
      </Checkout>
    </Body>
  );
};

export default CartPage;
const Body = styled.div`
@media screen and (min-width: 1280px) {
  padding: 0 40px;
}
@media screen and (max-width: 1280px) {
  width: 700px;
  padding-bottom: 200px;
}
`;

const Container = styled.div`
  display: flex;
  margin-bottom: 200px;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (min-width: 1280px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }
  @media screen and (max-width: 0px) {
    flex-direction: row;
  }
`;

const Cart = styled.div`
  border-bottom: 1.5px solid rgba(225, 225, 225);
  @media screen and (min-width: 1280px) {
    width: 640px;
    margin-right: 35px;
    border: none;

  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 1.2px;
    margin: 20px 0 40px;
  }
  button{
    padding: 10px 0;
    margin-bottom: 40px;
    width: 30%;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
`;

const Checkout = styled.div`
  visibility: hidden;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  left:0;
  padding: 20px 0;
  background-color: white;
  box-shadow: 0 0 10px rgba(200, 200, 200);
  button {
    padding: 10px 0;
    width: 640px;
    max-width: 90vw;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
  button:disabled {
    background-color: rgba(0, 35, 205, 0.4);
  }
  bottom: 0;
  @media screen and (max-width: 11280px) {
    visibility: visible;
  }
`;