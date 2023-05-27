/** @format */

import React from "react";

import { CartItemContainer } from "../../app/Utils/StyledComponents/CartComponents";

import { removeFromCart, setQuantity } from "../../app/Store/Cart/cartSlice";
import { formatPrice, useAppDispatch } from "../../app/Utils/hooks/hooks";
import { carData } from "../../teslaCarInfo";

interface CartProps {
  product: carData;
}

const CartItem = (props: CartProps) => {
  const { product } = props;
  const dispatch = useAppDispatch();

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
        ${formatPrice(product.price)}
      </p>
    </CartItemContainer>
  );
};

export default CartItem;
