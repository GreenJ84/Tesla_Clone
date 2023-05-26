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
  phone?: string;
  company?: string;
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

export const initialOrderState: OrderState = {
  shipping: {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    phone: "",
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
    company: "",
  },
  payment: {
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expMonth: "",
    expYear: "",
    postalCode: "",
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

export const { setShipping, setBilling, setPayment, setOrder } =
  orderSlice.actions;

export default orderSlice.reducer;

const validateAddress = (address: Address, errors: Address): boolean => { 
  let noErrors = true;
  // First Name Validation
  if (!address.firstName.match(/^[A-Za-z\s-]{2,}$/)) { 
    noErrors = false;
    errors.firstName = "First Name must be 2 or more characters";
  } else { errors.firstName = ""; }
  // Last Name Validation
  if (!address.lastName.match(/^[A-Za-z\s-]{2,}$/)) { 
    noErrors = false;
    errors.lastName = "Last Name must be 2 or more characters";
  } else { errors.lastName = ""; }
  // Address 1 Validation
  if (!address.address1.match(/^[A-Za-z0-9\s-.,]*$/)) { 
    noErrors = false;
    errors.address1 = "Street Address must only be alphanumeric characters, hyphens, commas, periods, or spaces";
  } else { errors.address1 = ""; }
  // Address 2 Validation
  if (!address.address2.match(/^[A-Za-z0-9\s-.,#]*$/)) { 
    noErrors = false;
    errors.address1 = "Building Address must only be alphanumeric characters, hyphens, commas, periods, pound signs or spaces";
  } else { errors.address2 = ""; }
  // City Validation
  if (!address.city.match(/^[A-Za-z\s-]{2,}$/)) { 
    noErrors = false;
    errors.city = "City must only be alphanumeric characters, spaces, and hyphens";
  } else { errors.city = ""; }
  // State Validation
  if (!address.state.match(/^[A-Za-z\s-]{2,}$/)) { 
    noErrors = false;
    errors.state = "State must only be alphabetic characters";
  } else { errors.state = ""; }
  // Zip Validation
  if (!address.zip.match(/^\d{5}(-\d{4})?$/)) { 
    noErrors = false;
    errors.zip = "Zip code must be 5 digits or 9 digits seperated with a hyphen";
  } else { errors.zip = ""; }
  return noErrors;
}

export const validateShipping = (shipping: Address, errors: Address): boolean => { 
  let noErrors = true;
  noErrors = validateAddress(shipping, errors);
  // Validate Phone Number
  if (!shipping.phone?.match(/^[A-Za-z0-9\s-._,#]*$/)) {
    noErrors = false;
    errors.phone = "Phone number must be in a correct format with optional leading + seperated by hypens, periods, or spaces";
  } else { errors.phone = ""; }

  return noErrors;
}

export const validateBilling = (billing: Address, errors: Address): boolean => { 
  let noErrors = true;
  noErrors = validateAddress(billing, errors);
  // Validate Company Name
  if (!billing.company?.match(/^[A-Za-z\s-.,']{2,}$/)) {
    noErrors = false;
    errors.company = "Company name must must only be alphanumeric characters, hyphens, commas, periods, pound signs or spaces";
  } else { errors.company = ""; }
  // Validate Country Name
  if (!billing.country?.match(/^[A-Za-z\s-]{2,}$/)) {
    noErrors = false;
    errors.country = "Country must only be alphabetic characters";
  } else { errors.country = ""; }

  return noErrors;
}