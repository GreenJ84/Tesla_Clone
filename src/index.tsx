/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/Store/store";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env!.API_KEY,
  authDomain: "tesla-gclone.firebaseapp.com",
  projectId: "tesla-gclone",
  storageBucket: "tesla-gclone.appspot.com",
  messagingSenderId: process.env!.MSG_ID,
  appId: process.env!.APP_ID,
};
export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
