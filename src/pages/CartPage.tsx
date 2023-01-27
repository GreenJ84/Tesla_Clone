/** @format */

import { useDispatch } from "react-redux";
import styled from "styled-components";

import OrderSummary from "../components/CartPage/OrderSummary";
import ShopHeader from "../components/Layout/ShopHeader";
import SmallFooter from "../components/Layout/SmallFooter";

import { useCartState } from "../app/Utils/hooks/useCartState";
import CartItem from "../components/CartPage/CartItem";

const CartPage = () => {
  const _products = useCartState();
  const dispatch = useDispatch();

  return (
    <>
      <ShopHeader />
      <h1> Cart </h1>
      <Container>
        <Cart>
          <>
            {_products.map((product) => (
              <span key={product.id}>
                <CartItem product={product} />
              </span>
            ))}
          </>
        </Cart>
        <OrderSummary />
      </Container>
      <SmallFooter />
      <Checkout />
    </>
  );
};

export default CartPage;

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Cart = styled.div``;

const Checkout = styled.button`
  position: fixed;
  visibility: hidden;
  bottom: 0;
  @media screen and (max-width: 1100px) {
    visibility: visible;
  }
`;
