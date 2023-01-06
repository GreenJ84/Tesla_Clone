/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { carsData } from "../teslaCarInfo";

export const store = configureStore({
  reducer: {
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.ref"],
        // Ignore these paths in the state
        ignoredPaths: [
          ...carsData.map((_, index) => {
            return `car.cars.${index}.ref`;
            }),
        ],
      },
      immutableCheck: true
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
