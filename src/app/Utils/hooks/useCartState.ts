/** @format */

import { RootState } from "../../Store/store";
import { useAppSelector } from "./useAppSelector";


export const useCartState = () =>
  useAppSelector((state: RootState) => state.car.cart);
