/** @format */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { setLogin, setLogout } from "./app/Store/User/userSlice";

import CartPage from "./pages/CartPage";
import DisplayPage from "./pages/DisplayPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import RegistrationPage from "./pages/RegistrationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AccountPage from "./pages/AccountPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogin(user));
      } else {
        dispatch(setLogout());
      }
    });
  }, []);

  return (
    <div className="relative min-h-[100vh]">
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
    </div>
  );
}

export default App;
