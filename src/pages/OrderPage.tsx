/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import Header from "../components/Layout/Header";
import Order1 from "../components/OrderPage/Order1";
import Order2 from "../components/OrderPage/Order2";
import SmallFooter from "../components/Layout/SmallFooter";
import { OrderPageContainer } from "../app/Utils/StyledComponents/OrderComponents";

import { useUserData } from "../app/Store/User/userSlice";


const OrderPage = () => {
  const nav = useNavigate();
  const user = useUserData();

  const [secStep, setSecStep] = useState(false);

  useEffect(() => {
    if (!user.isLoggedIn) {
      nav("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <OrderPageContainer>
        {secStep && (
          <button
            aria-label="Return to previous step"
            onClick={() => setSecStep(false)}
          >
            {" "}
            <ChevronLeftIcon className="relative right-1 w-6 h-6" />
            Back
          </button>
        )}
        <p
          aria-label="Checkout completion"
          className="2xl:mb-4"
        >
          Step {secStep ? 2 : 1} of 2
        </p>
        {!secStep ? (
          <Order1
            setStep={() => setSecStep(true)}
          />
        ) : (
          <Order2
            setStep={() => setSecStep(false)}
          />
        )}
      </OrderPageContainer>
      <SmallFooter />
    </>
  );
};

export default OrderPage;
