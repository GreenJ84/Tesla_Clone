/** @format */

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useCartState = () =>
  useAppSelector((state: RootState) => state.cart);
export const useOrderState = () =>
  useAppSelector((state: RootState) => state.order);

const choices =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const useCaptcha = () => {
  const setCaptcha = () => {
    let characters = "";
    let n = Math.round((Math.random() * 100 + 1) * (Math.random() * 10 + 1));

    for (let i = 0; i < 5 + (n % 4); i++) {
      characters += choices[Math.round((Math.random() * 620) % 61)];
    }

    return characters;
  };
  let captcha = setCaptcha();
  return [captcha, setCaptcha];
};

export const formatPrice = (num: number): string => {
  const formatter = new Intl.NumberFormat();
  const formattedValue = formatter.format(num);
  return "$" + formattedValue;
};
