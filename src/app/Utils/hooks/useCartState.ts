/** @format */

import { storeType, useAppSelector } from "../../Store/store";

export const useCartState = () =>
  useAppSelector((state: storeType) => state.car.cart);
