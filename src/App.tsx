/** @format */

import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setLogin, setLogout } from "./app/Store/User/userSlice";
import CartPage from "./pages/CartPage";
import DisplayPage from "./pages/DisplayPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  const dispatch = useDispatch();

  const auth = (user: any) => {
    if (true) {
      dispatch(setLogin(user));
    } else {
      dispatch(setLogout());
    }
  };

  return (
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
      {/* Order Page */}
      <Route path={"/order"} element={ <OrderPage /> } />
      {/* Checkout Page */}
      <Route />
    </Routes>
  );
}

export default App;
