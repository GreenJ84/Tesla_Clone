/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Layout/Header";
import OrderSummary from "../components/CartPage/OrderSummary";
import CartItem from "../components/CartPage/CartItem";
import SmallFooter from "../components/Layout/SmallFooter";

import {
  Cart,
  CartContainer,
  Checkout,
  EmptyCart,
  CartBody,
} from "../app/Utils/StyledComponents/CartComponents";

import { useAppDispatch, useAppSelector } from "../app/Utils/hooks/hooks";
import { setTotal } from "../app/Store/Cart/cartSlice";

const CartPage = () => {
  const {items, subTotal} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const nav = useNavigate();


  return (
    <>
      <Header />
      <CartBody className="py-2 mx-auto">
        <h1
          id="cart-title"
          aria-label="All Items currently in your cart"
          style={{ maxWidth: "1400px", position: "relative" }}
          className="pt-32 xl:pt-32 mb-2 xl:mb-0 xl:mx-auto pb-8 border-b-[1.5px] xl:border-none text-3xl xl:text-5xl font-semibold"
        >
          Shopping Cart Items
        </h1>
        <CartContainer>
          <Cart aria-describedby="cart-title">
            {items.length > 0 ? (
              <>
                {items.map((product, idx) => (
                  <CartItem
                    aria-label={`Cart Item: ${product.title}, is selected with a Quantity of ${product.quantity}`}
                    aria-posinset={idx}
                    aria-setsize={items.length}
                    key={product.id}
                    product={product}
                  />
                ))}
              </>
            ) : (
              <EmptyCart aria-label="No Cart Items available">
                <h3>No items in Cart</h3>
                <button
                  aria-label="Home page return"
                  onClick={() => nav("/")}
                >
                  Return Shopping
                </button>
              </EmptyCart>
            )}
          </Cart>
          <OrderSummary subTot={subTotal} disabled={items.length! === 0} />
        </CartContainer>
        <Checkout>
          {items.length! > 0 ? (
            <button
              aria-label="Continue to Order page to checkout"
              onClick={() => {
                dispatch(setTotal(subTotal));
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
        </Checkout>
      </CartBody>
      <SmallFooter />
    </>
  );
};

export default CartPage;
