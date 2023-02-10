/** @format */

import React from "react";
import { useDispatch } from "react-redux";

import { CartItemContainer } from "../../app/Utils/StyledComponents/CartComponents";

import { removeFromCart, setQuantity } from "../../app/Store/Car/carSlice";
import { carData } from "../../teslaCarInfo";
import { useCommas } from "../../app/Utils/hooks/useCommas";

interface CartProps {
  product: carData;
}

const CartItem = (props: CartProps) => {
  const { product } = props;
  const dispatch = useDispatch();

  return (
    <CartItemContainer>
      <img
        src={`/images/${product.backgroundImg}`}
        alt={product.title}
      />
      <div>
        <p>{product.title}</p>
        <div className="flex">
          <p>
            Quantity:
            {window.location.pathname !== "/order" ? 
              <input
                type="number"
                value={product.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setQuantity(
                    {
                      id: product.id,
                      quantity: parseInt(e.currentTarget.value)
                    }
                  ))
                }
                min={0}
                max={3}
              />
            :
              <input
              type="number"
              value={product.quantity}
              readOnly
            />
            }
          </p>
          <button
            onClick={() => {
              dispatch(removeFromCart(product.id))
            }}
          >Remove</button>
        </div>
      </div>
      <p>${useCommas(product.price)}.00</p>
    </CartItemContainer>
  );
};

export default CartItem;
