/** @format */

import { CarState } from "../../Store/Car/carSlice";
import { useAppSelector } from "../../Store/store";
import { UserState } from "../../Store/User/userSlice";

export const useCartState = () =>
  useAppSelector((state: { user: UserState; car: CarState }) => state.car.cart);
