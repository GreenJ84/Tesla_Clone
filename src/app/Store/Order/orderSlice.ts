/** @format */

import { createSlice } from "@reduxjs/toolkit";

import { CartState, initialCartState } from "../Cart/cartSlice";

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  state: string;
  country?: string;
}
export interface Payment {
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expMonth: string;
    expYear: string;
    postalCode: string;
}
export interface OrderState {
    shipping: Address;
    billing: Address;
    payment: Payment;
    order: CartState;

}

const initialOrderState: OrderState = {
    shipping: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        zip: "",
        city: "",
        state: "",
    },
    billing: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        zip: "",
        city: "",
        state: "",
        country: "",
    },
    payment: {
        cardHolderName: "",
        cardNumber: "",
        cvv: "",
        expMonth: "",
        expYear: "",
        postalCode: ""
    },
    order: initialCartState,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    setShipping: (state, action) => { 
        state.shipping = action.payload;
    },
    setBilling: (state, action) => { 
        state.billing = action.payload;
    },
    setPayment: (state, action) => { 
        state.payment = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setShipping, setBilling, setPayment, setOrder } = orderSlice.actions;

export default orderSlice.reducer;