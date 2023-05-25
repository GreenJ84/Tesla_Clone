/** @format */

import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import cartReducer, { CartState } from "./Cart/cartSlice";
import userReducer, { UserState } from "./User/userSlice";
import orderReducer, { OrderState } from "./Order/orderSlice";

export interface storeType {
  user: UserState;
  cart: CartState;
  order: OrderState;
}

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedUserReducer = persistReducer<UserState>(
  { ...persistConfig, blacklist: ["isLoggedIn"] },
  userReducer
);
const persistedCartReducer = persistReducer<CartState>(
  { ...persistConfig },
  cartReducer
);
const persistedOrderReducer = persistReducer<OrderState>(
  { ...persistConfig },
  orderReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    car: persistedCartReducer,
    order: persistedOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "user/setLogin",
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoredActionPaths: ["user.user"],
        ignoredPaths: ["user.user"],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
