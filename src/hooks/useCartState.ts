
import { CarState } from "../app/Car/carSlice"
import { useAppSelector  } from "../app/store"
import { UserState } from "../app/User/userSlice"

export const useCartState = () => useAppSelector((state: {user: UserState, car: CarState}) => state.car.cart)
