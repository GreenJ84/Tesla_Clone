/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { carsData } from "../../teslaCarInfo";
import carReducer, { CarState } from "./Car/carSlice";
import userReducer, { UserState } from "./User/userSlice";

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedUserReducer = persistReducer<UserState>(persistConfig, userReducer)
const persistedCarReducer = persistReducer<CarState>(persistConfig, carReducer)

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    car: persistedCarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setLogin", FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ["payload.ref", "user.user"],
        ignoredPaths: [
          ...carsData.map((_, index) => {
            return `car.cars.${index}.ref`;
          }),
        "user.user"],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
