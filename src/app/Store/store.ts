/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import carReducer, { CartState } from "./Cart/cartSlice";
import userReducer, { UserState } from "./User/userSlice";

export interface storeType{
  user: UserState
  car: CartState
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}

const persistedUserReducer = persistReducer<UserState>({ ...persistConfig, blacklist: ['isLoggedIn'] }, userReducer)
const persistedCarReducer = persistReducer<CartState>({ ...persistConfig}, carReducer)

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    car: persistedCarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setLogin", FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [ "user.user"],
        ignoredPaths: ["user.user"],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;