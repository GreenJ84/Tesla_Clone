import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setLogin, setLogout } from './app/Store/User/userSlice';
import DisplayPage from './pages/DisplayPage';
import HomePage from './pages/HomePage';

function App() {
  const dispatch = useDispatch();

  const auth = (user: any) => {
    if (true) {
      dispatch(setLogin(user))
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
      <Route path="/" element={ <HomePage />} />
      {/* Showcase Page */}
      <Route path="/cars/:id" element={ <DisplayPage />} />
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
