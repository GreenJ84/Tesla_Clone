/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/store";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
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
