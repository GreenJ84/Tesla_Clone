/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Card } from "../components/OrderPage/Order2";
import SmallFooter from "../components/Layout/SmallFooter";
import {
  ConfirmationContainer,
  ConfirmationListItem,
} from "../app/Utils/StyledComponents/ConfirmationComponents";

import { billAddress, shipAddress } from "./OrderPage";
import { useUserData } from "../app/Store/User/userSlice";
import { carData } from "../teslaCarInfo";

interface orderData {
  tag: string | null;
  order: carData[] | null;
  shipping: shipAddress | null;
  billing: billAddress | null;
  card: Card | null;
  total: number | null;
}

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
    total: null,
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
      <ConfirmationContainer>
        {!empty ? (
          <h1>Order Placement Confirmed</h1>
        ) : (
          <h1>No Orders Placed ...yet</h1>
        )}
        <p>
          Check the status of
          {!empty ? " recent " : " future "}
          <Link
            aria-label="Acount Page link"
            to={"/account"}
          >
            <span>orders</span>
          </Link>
          {!empty && (
            <Link
              aria-label="Acount Page link"
              to={"/account"}
            >
              , manage <span>returns</span>
            </Link>
          )}
          , or discover{" "}
          <Link
            aria-label="Home Page return"
            to={"/"}
          >
            new <span>products</span>
          </Link>
        </p>

        {!empty ? (
          <>
            <div>
              <h2>Order identifier: {order.tag}</h2>
              <h2>
                Total Amount: $
                {new Intl.NumberFormat("en-US").format(order.total!)}
              </h2>
            </div>
            <ul aria-label="Order Items list">
              {!empty &&
                order.order?.map((product, idx) => (
                  <ConfirmationListItem
                    aria-label="Order Item"
                    aria-posinset={idx + 1}
                    aria-setsize={order.order?.length}
                    key={product.id}
                  >
                    <img
                      src={`/images/${product.backgroundImg}`}
                      alt={product.title}
                    />
                    <div>
                      <div>
                        <h3>{product.title}</h3>
                        <h3>
                          $
                          {new Intl.NumberFormat("en-US").format(product.price)}
                        </h3>
                      </div>
                      <p>{product.description}</p>
                      <p>Amount ordered: {product.quantity}</p>
                    </div>
                  </ConfirmationListItem>
                ))}
            </ul>
            <p className={"mt-8 tracking-wider"}>
              Items count:
              <span className={"!border-b-0 ml-4"}>{order.order?.length}</span>
            </p>
          </>
        ) : (
          <div className="relative top-32">
            <h2>To get a confirmation you need to have:</h2>
            <br />
            <p className="relative left-12 text-xl">
              - Completed an order for at least one
              <Link
                aria-label="Home Page return"
                to={"/"}
              >
                {" "}
                <span>item</span>
              </Link>
            </p>
          </div>
        )}
      </ConfirmationContainer>
      <SmallFooter />
    </>
  );
};

export default ConfirmationPage;
