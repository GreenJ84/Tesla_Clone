/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { DB } from "../firebase/firebase";

import Header from "../components/Layout/Header";
import SmallFooter from "../components/Layout/SmallFooter";
import Confirmation, {orderData} from "../components/ConfirmationPage/Confirmation";

import { useUserData } from "../app/Store/User/userSlice";

const ConfirmationPage = () => {
  const nav = useNavigate();
  const user = useUserData();
  const [empty, setEmpty] = useState(true);
  const [order, setOrder] = useState<orderData>({
    tag: null,
    order: null,
    shipping: null,
    billing: null,
    card: null,
  });
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!user.user) {
      nav("/login");
      return;
    }
    const getOrder = async () => {
      const userRef = user.user!.uid.slice(0, 8).toString().toLowerCase();

      const q = query(
        collection(
          DB,
          userRef,
          "account",
          "orders"
        ) as CollectionReference<orderData>,
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const queryRes = await getDocs(q);
      if (queryRes.empty) {
        return;
      }
      setEmpty(false);
      queryRes.forEach((order) => {
        setOrder(order.data());
      });
    };
    getOrder();
  }, []);

  return (
    <>
      {!empty && (
        <Confetti
          className="overflow-y-hidden"
          width={width - 20}
          height={height - 20}
        />
      )}
      <Header />
      <Confirmation empty={ empty } order={ order } />
      <SmallFooter />
    </>
  );
};

export default ConfirmationPage;
