/** @format */

import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, serverTimestamp, doc, setDoc, getCountFromServer } from "firebase/firestore"

import CartItem from "../CartPage/CartItem";
import CardModal from "./CardModal";
import FinalOrder from "./FinalOrder";
import { Address, Order2Body, Order2Container, OrderButton } from "../../app/Utils/StyledComponents/OrderComponents";

import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";
import { useCartState } from "../../app/Utils/hooks/useCartState";
import { completeOrder, setTotal } from "../../app/Store/Car/carSlice";
import { billAddress, shipAddress } from "../../pages/OrderPage";
import { DB } from "../../firebase";
import { useUserData } from "../../app/Store/User/userSlice";
import { carData } from "../../teslaCarInfo";

export interface Card {
  name: string
  number: string
  exp: string
  cvv: string
}
interface order2Props{
  ship: shipAddress
  bill: billAddress
  setStep: Function
}

const Order2 = (props: order2Props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useUserData();

  const [cardDet, setCardDet] = useState<Card>({
    name: "",
    number: "",
    exp: "",
    cvv: ""
  })
  const [cardModal, setCardModal] = useState(false);
  const [wide, setWide] = useState(false);

  const { ship, bill, setStep } = props;
  const _products: carData[] = useCartState() ;
  const subTotal = useAppSelector((state) => state.car.total)

  const getTax = (value: number) => {
    return value * .103
  }

  useEffect(() => {
    const toggleSize = () => {
      wide ?
        setWide(false)
      :
        setWide(true)
    }
    window.addEventListener("resize", toggleSize)

    return () => window.removeEventListener("resize", toggleSize)
  }, [])
  const toggleCardModal = () => {
    cardModal ?
      setCardModal(false)
      :
      setCardModal(true)
  }

  const edit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setStep()
  }

  const cardHandler = (value: keyof Card, e: BaseSyntheticEvent) => {
    let copy = { ...cardDet }
    copy[value] = e.currentTarget.value;
    setCardDet({...copy})
  }

  const logOrder = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    let total = subTotal + getTax(subTotal)
    try {
      const userRef = user.user!.uid.slice(0, 8).toString().toLowerCase()
      const count = await getCountFromServer(collection(DB, userRef, "account", "orders"))

      const dataTag = `${userRef}-${count.data().count}`

      await setDoc(doc(DB, userRef, "account", "orders", dataTag), {
        tag: dataTag,
        order: _products,
        shipping: ship,
        billing: bill,
        card: cardDet,
        total: total,
        timestamp: serverTimestamp()
      });
      console.log("Saving Order");
      dispatch(setTotal(total));
      dispatch(completeOrder())
      nav('/confirmation');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
    {cardModal ? 
        <CardModal toggle={toggleCardModal} setCard={[cardDet, cardHandler] } />
    :
      ""}
    <Order2Body>
      <h1>Review and Pay</h1>
        {!wide ?
          <p>Order Summary ({_products.length} items)</p>
        : ""}
      <Order2Container>
        <div>
          <ul>
          {_products.map((product) =>
            <span key={product.id}>
              <CartItem product={product} />
            </span>
          )}
          </ul>
        </div>
          <div >
            {wide ?
              <p className="!text-3xl !font-bold">Order Summary ({_products.length} items)</p>
            : " "}
          <Address>
            <div>
              <h3>Shipping Address</h3>
              <button
                onClick={(e: BaseSyntheticEvent) => edit(e)}
              >
                Edit
              </button>
            </div>
            <p>{ship.firstName} { ship.lastName }</p>
            <p>{ ship.address1 }</p>
            {ship.address2 ? <p>{ship.address2}</p> : <p></p>}
            <p>{ship.city}, {ship.state} {ship.zip}</p>
            <p>{ ship.phone }</p>
          </Address>

          <Address>
            <div>
              <h3>Billing Address</h3>
              <button
                onClick={(e: BaseSyntheticEvent) => edit(e)}
              >
                Edit
              </button>
            </div>
            {bill.companyName ?
              <p>{ bill.companyName }</p>
            : ""}
            <p>{bill.firstName} { bill.lastName }</p>
            <p>{ bill.address1 }</p>
            {bill.address2 ? <p>{bill.address2}</p> : ""}
            <p>{bill.city}, {bill.state} {bill.zip}</p>
            <p>{bill.country}</p>
          </Address>

          <p>
            Add Promo Code
          </p>

          <FinalOrder subTot={subTotal} />
          <OrderButton
            onClick={() => toggleCardModal()}
          >
            Card
          </OrderButton>
          <p>
            Add Gift Card
          </p>
          <p> By continuing, I understand and agree to the General Terms and Conditions of Online Accessories Sales, <span>Terms of Use</span> and <span>Privacy Notice</span>.</p>
          {cardDet.name && cardDet.cvv && cardDet.exp && cardDet.number ?
            <OrderButton
              className="px-8"
              onClick={(e: BaseSyntheticEvent) => {
                logOrder(e)
              }}
            >
              Place Order
            </OrderButton>
          :
            <OrderButton
              className="px-4"
              disabled
            >
              Place Order
            </OrderButton>
            }
          </div>
        </Order2Container>
    </Order2Body>
    </>
  );
};

export default Order2;