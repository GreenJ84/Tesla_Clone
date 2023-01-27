/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { carData, carsData } from "../../../teslaCarInfo";
import { UserState } from "../User/userSlice";

export interface CarState {
  cars: carData[];
  cart: carData[];
  total: number;
}
export interface storeType{
  user: UserState
  car: CarState
}

const initialState: CarState = {
  cars: [...carsData],
  cart: [],
  total: 0,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
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
    setCarRef: (state, action) => {
      let [car] = state.cars.filter((item) => item.id === action.payload.id);
      let [...cars] = state.cars.filter(
        (item) => item.id !== action.payload.id
      );
      car.ref = action.payload.ref.current;
      state.cars = [...cars, car];
    },
    addToCart: (state, action) => {
      let car = state.cart.find((item) => {
        return item.id === action.payload;
      });
      if (car) return;
      let [_car] = state.cars.filter((item) => item.id === action.payload);
      state.cart = [...state.cart, _car];
    },
    removeFromCart: (state, action) => {
      let [..._car] = state.cart.filter((item) => item.id !== action.payload);

      state.cart = [..._car];
    },
  },
});

export const { setCarRef, addToCart, removeFromCart, setTotal, setQuantity } = carSlice.actions;
export const selectCars = (state: storeType) => state.car.cars;

export default carSlice.reducer;
