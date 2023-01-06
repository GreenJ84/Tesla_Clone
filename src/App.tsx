import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setLogin, setLogout } from './app/User/userSlice';

function App() {
  const dispatch = useDispatch();

  const auth = () => {
    if (true) {
      dispatch(setLogin())
    } else {
      dispatch(setLogout())
    }
  }

  return (
    <Routes>
      {/* Login Page */}
      <Route />
      {/* Registration Page */}
      <Route />
      {/* Home Page */}
      <Route />
      {/* Showcase Page */}
      <Route />
      {/* Cart Page */}
      <Route />
      {/* Order Page */}
      <Route />
      {/* Checkout Page */}
      <Route/>
  </Routes>
  );
}

export default App;
