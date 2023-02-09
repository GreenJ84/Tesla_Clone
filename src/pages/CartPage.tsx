/** @format */

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Layout/Header";
import OrderSummary from "../components/CartPage/OrderSummary";
import CartItem from "../components/CartPage/CartItem";
import { Cart, CartContainer, Checkout, EmptyCart, OrderBody } from "../app/Utils/StyledComponents/OrderComponents";

import { useCartState } from "../app/Utils/hooks/useCartState";
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
    <>
      <Header />
      <OrderBody className="py-2 mx-auto">
        <h1
          style={{ "maxWidth": "1400px", "position": "relative" }}
          className="pt-32 xl:pt-32 mb-2 xl:mb-0 xl:mx-auto pb-8 border-b-[1.5px] xl:border-none text-3xl xl:text-5xl font-semibold"> Cart </h1>
        <CartContainer>
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
        </CartContainer>
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
      </OrderBody>
    </>
  );
};

export default CartPage;