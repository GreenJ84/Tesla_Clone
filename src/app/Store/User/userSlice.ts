/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { useAppSelector } from "../store";

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export const useUserData = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
