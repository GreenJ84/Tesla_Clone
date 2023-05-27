/** @format */

import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getCountFromServer,
} from "firebase/firestore";

import CartItem from "../CartPage/CartItem";
import CardModal from "./CardModal";
import FinalOrder from "./FinalOrder";
import {
  Address,
  Order2Body,
  Order2Container,
  OrderButton,
} from "../../app/Utils/StyledComponents/OrderComponents";

import { useAppSelector } from "../../app/Utils/hooks/hooks";
import { clearCart } from "../../app/Store/Cart/cartSlice";

import { DB } from "../../firebase/firebase";
import { useUserData } from "../../app/Store/User/userSlice";

import { Payment, initialOrderState, setOrder, setPayment } from "../../app/Store/Order/orderSlice";

const Order2 = ({ setStep }: {setStep: Function}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useUserData();

  const [cardDetails, setCardDetails] = useState<Payment>({ ...initialOrderState.payment });
  const {shipping, billing} = useAppSelector(state => state.order);
  const cart = useAppSelector(state => state.cart);
  
  const [cardModal, setCardModal] = useState(false);
  const [wide, setWide] = useState(false);


  useEffect(() => {
    const toggleSize = () => {
      wide ? setWide(false) : setWide(true);
    };
    window.addEventListener("resize", toggleSize);

    return () => window.removeEventListener("resize", toggleSize);
  }, []);
  const toggleCardModal = () => {
    cardModal ? setCardModal(false) : setCardModal(true);
  };

  const edit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setStep();
  };

  const cardHandler = (value: keyof Payment, e: BaseSyntheticEvent) => {
    e.preventDefault();
    let copy = { ...cardDetails };
    copy[value] = e.currentTarget.value;
    setCardDetails({ ...copy });
  };

  const cardSubmission = (e: BaseSyntheticEvent) => { 
    e.preventDefault();
    toggleCardModal();
    dispatch(setPayment(cardDetails));
    dispatch(setOrder(cart));
  }

  const logOrder = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const userRef = user.user!.uid.slice(0, 8).toString().toLowerCase();
      const count = await getCountFromServer(
        collection(DB, userRef, "account", "orders")
      );

      const dataTag = `${userRef}-${count.data().count}`;

      await setDoc(doc(DB, userRef, "account", "orders", dataTag), {
        tag: dataTag,
        order: cart,
        shipping: shipping,
        billing: billing,
        card: cardDetails,
        timestamp: serverTimestamp(),
      });
      console.log("Saving Order");
      dispatch(clearCart());
      nav("/confirmation");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <>
      {/* {confirmation && <OrderReview />} */}
      {cardModal && (
        <CardModal
          toggle={toggleCardModal}
          submit={cardSubmission}
          setCard={[cardDetails, cardHandler]}
        />
      )}
      <Order2Body>
        <h1>Review and Pay</h1>
        {!wide ? <p>Order Summary ({cart.items.length} items)</p> : ""}
        <Order2Container>
          <div>
            <ul>
              {cart.items.map((product) => (
                <span key={product.id}>
                  <CartItem product={product} />
                </span>
              ))}
            </ul>
          </div>
          <div>
            {wide && (
              <p className="!text-3xl !font-bold">
                Order Summary ({cart.items.length} items)
              </p>
            )}
            <Address>
              <div>
                <h3>Shipping Address</h3>
                <button onClick={(e: BaseSyntheticEvent) => edit(e)}>
                  Edit
                </button>
              </div>
              <p>
                {shipping.firstName} {shipping.lastName}
              </p>
              <p>{shipping.address1}</p>
              {shipping.address2 ? <p>{shipping.address2}</p> : <p></p>}
              <p>
                {shipping.city}, {shipping.state} {shipping.zip}
              </p>
              <p>{shipping.phone}</p>
            </Address>

            <Address>
              <div>
                <h3>Billing Address</h3>
                <button onClick={(e: BaseSyntheticEvent) => edit(e)}>
                  Edit
                </button>
              </div>
              {billing.company ? <p>{billing.company}</p> : ""}
              <p>
                {billing.firstName} {billing.lastName}
              </p>
              <p>{billing.address1}</p>
              {billing.address2 ? <p>{billing.address2}</p> : ""}
              <p>
                {billing.city}, {billing.state} {billing.zip}
              </p>
              <p>{billing.country}</p>
            </Address>

            <p>Add Promo Code</p>

            <FinalOrder />
            <OrderButton onClick={() => toggleCardModal()}>Card</OrderButton>
            <p>Add Gift Card</p>
            <p>
              {" "}
              By continuing, I understand and agree to the General Terms and
              Conditions of Online Accessories Sales, <span>
                Terms of Use
              </span>{" "}
              and <span>Privacy Notice</span>.
            </p>
            {cardDetails.cardHolderName && cardDetails.cvv && cardDetails.expYear && cardDetails.cardNumber ? (
              <OrderButton
                className="px-8"
                onClick={(e: BaseSyntheticEvent) => {
                  logOrder(e);
                }}
              >
                Place Order
              </OrderButton>
            ) : (
              <OrderButton
                className="px-4"
                disabled
              >
                Place Order
              </OrderButton>
            )}
          </div>
        </Order2Container>
      </Order2Body>
    </>
  );
};

export default Order2;
