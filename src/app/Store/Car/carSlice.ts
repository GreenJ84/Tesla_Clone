/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { carData, carsData } from "../../../teslaCarInfo";

export interface CartState {
  cart: carData[];
  subTotal: number;
  total: number;
}

const initialState: CartState = {
  cart: [],
  subTotal: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let car = state.cart.find((item) => {
        return item.id === action.payload;
      });
      if (car) {
        let car = state.cart.filter((item) => item.id === action.payload)[0];
        car.quantity += 1;

        let [...cars] = state.cart.filter((item) => item.id !== action.payload);
        state.cart = [...cars, car];

        const newSubTotal = state.subTotal + car.price;
        state.subTotal = newSubTotal;
      } else {
        let [_car] = carsData.filter((item) => item.id === action.payload);
        state.cart = [...state.cart, _car];

        const newSubTotal = state.subTotal + _car.price;
        state.subTotal = newSubTotal;
      }
    },
    updateCart: (state, action) => {
      let [car] = state.cart.filter((item) => item.id === action.payload.id);
      const priceDiff = (action.payload.quantity - car.quantity) * car.price;
      car.quantity = action.payload.quantity;

      const [...cars] = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = [...cars, car];

      const newSubTotal = state.subTotal + priceDiff;
      state.subTotal = newSubTotal;
    },
    removeFromCart: (state, action) => {
      let [..._car] = state.cart.filter((item) => item.id !== action.payload);
      state.cart = [..._car];
      state.subTotal = state.cart.reduce((acc, curr) => {
        acc += curr.price * curr.quantity;
        return acc;
      }, 0);
    },
    setTotal: (state, action) => {
      state.total = action.payload * 0.103;
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  updateCart,
  removeFromCart,
  setTotal,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
