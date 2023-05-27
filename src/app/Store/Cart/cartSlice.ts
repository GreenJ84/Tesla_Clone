/** @format */

import { createSlice } from "@reduxjs/toolkit";

import { carData, carsData } from "../../../teslaCarInfo";


export interface CartState {
  items: carData[];
  subTotal: number;
  tax: number;
  total: number;
}

export const initialCartState: CartState = {
  items: [],
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const carSlice = createSlice({
  name: "car",
  initialState: initialCartState,
  reducers: {
    setQuantity: (state, action) => {
      let [car] = state.items.filter((item) => item.id === action.payload.id);
      let [...cars] = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      if (action.payload.quantity === 0) { 
        state.items = [...cars];
        state.subTotal = state.subTotal - car.price * car.quantity;
        return;
      }
      let diff = car.price * car.quantity - car.price * action.payload.quantity;
      car.quantity = action.payload.quantity;
      state.items = [...cars, car];
      state.subTotal = state.subTotal + diff;
      return;
    },
    addToCart: (state, action) => {
      let car = state.items.find((item) => {
        return item.id === action.payload;
      });
      if (car) {
        let [...cars] = state.items.filter(
          (item) => item.id !== action.payload);
        car.quantity += 1;
        state.items = [...cars, car];
        state.subTotal = state.subTotal + car.price;
      } else {
        let [_car] = carsData.filter((item) => item.id === action.payload);
        state.items = [...state.items, _car];
        state.subTotal = state.subTotal + _car.price;
      }
    },
    removeFromCart: (state, action) => {
      let [..._car] = state.items.filter((item) => item.id !== action.payload);
      state.items = [..._car];
      state.subTotal = state.items.reduce((acc, curr) => {
        acc += curr.price * curr.quantity;
        return acc;
      }, 0);
    },
    setTotal: (state, action) => {
      state.tax = action.payload * .103;
      state.total = state.subTotal * 1.103;
    },
    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
      state.tax = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, setTotal, setQuantity, clearCart } = carSlice.actions;

export default carSlice.reducer;
