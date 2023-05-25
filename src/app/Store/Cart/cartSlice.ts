/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { carData, carsData } from "../../../teslaCarInfo";


export interface CartState {
  cart: carData[];
  subTotal: number;
  total: number;
}

export const initialCartState: CartState = {
  cart: [],
  subTotal: 0,
  total: 0,
};

export const carSlice = createSlice({
  name: "car",
  initialState: initialCartState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setQuantity: (state, action) => {
      let [car] = state.cart.filter((item) => item.id === action.payload.id);
      let [...cars] = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      car.quantity = action.payload.quantity;
      state.cart = [...cars, car];
    },
    addToCart: (state, action) => {
      let car = state.cart.find((item) => {
        return item.id === action.payload;
      });
      if (car) {
        let car = state.cart.filter((item) => item.id === action.payload)[0];
        let [...cars] = state.cart.filter(
          (item) => item.id !== action.payload);
        car.quantity += 1;
        state.cart = [...cars, car];
      }
      else {
        let [_car] = carsData.filter((item) => item.id === action.payload);
        state.cart = [...state.cart, _car];
      }
    },
    removeFromCart: (state, action) => {
      let [..._car] = state.cart.filter((item) => item.id !== action.payload);
      state.cart = [..._car];
      state.total = state.cart.reduce((acc, curr) => {
        acc += curr.price * curr.quantity;
        return acc;
      }, 0);
    },
    completeOrder: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, setTotal, setQuantity, completeOrder } = carSlice.actions;

export default carSlice.reducer;
