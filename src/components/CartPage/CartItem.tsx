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
        aria-label={`${product.title} display image`}
        src={`/images/${product.backgroundImg}`}
        alt={product.title}
      />
      <div>
        <h3>{product.title}</h3>
        <div className="flex">
          <label>Quantity:</label>
          {window.location.pathname !== "/order" ? (
            <input
              type="number"
              inputMode="numeric"
              value={product.quantity}
              aria-label="Updatable purchase quantity"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  setQuantity({
                    id: product.id,
                    quantity: parseInt(e.currentTarget.value),
                  })
                )
              }
              min={0}
              max={3}
            />
          ) : (
            <input
              type="number"
              inputMode="numeric"
              value={product.quantity}
              aria-label="Confirmed purchase quantity"
              readOnly
              aria-readonly="true"
            />
          )}
          <button
            aria-label="Remove all of this product from Cart"
            onClick={() => {
              dispatch(removeFromCart(product.id));
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <p
        aria-label={`Subtotal for ${
          product.quantity > 1 && `all ${product.quantity} of`
        } this product`}
      >
        ${useCommas(product.price)}.00
      </p>
    </CartItemContainer>
  );
};

export default CartItem;
