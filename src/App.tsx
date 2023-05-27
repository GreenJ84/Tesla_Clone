/** @format */

import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import lazySizes from "lazysizes";

import { AUTH } from "./firebase/firebase";
import { setLogin, setLogout } from "./app/Store/User/userSlice";

import HomePage from "./pages/HomePage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const DisplayPage = lazy(() => import("./pages/DisplayPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const ConfirmationPage = lazy(() => import("./pages/ConfirmationPage"));


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(AUTH, (user) => {
      if (user) {
        dispatch(setLogin(user));
      } else {
        dispatch(setLogout());
      }
    });
    lazySizes.init();
  }, []);

  return (
    <div className="relative min-h-[100vh]">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/registration"
            element={<RegistrationPage />}
          />
          <Route
            path="/account"
            element={<AccountPage />}
          />
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/cars/:id"
            element={<DisplayPage />}
          />
          <Route
            path="/cart"
            element={<CartPage />}
          />
          <Route
            path="/order"
            element={<OrderPage />}
          />
          <Route
            path="/confirmation"
            element={<ConfirmationPage />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
