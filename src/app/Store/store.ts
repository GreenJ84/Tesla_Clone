/** @format */

import { configureStore } from "@reduxjs/toolkit";

import { carsData } from "../../teslaCarInfo";
import carReducer from "./Car/carSlice";
import userReducer from "./User/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["your/action/type"],
        ignoredActionPaths: ["payload.ref"],
        ignoredPaths: [
          ...carsData.map((_, index) => {
            return `car.cars.${index}.ref`;
          }),
        ],
      },
      immutableCheck: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
