/** @format */

import { useEffect, useState } from "react";
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

import Header from "../components/Layout/Header";
import { billAddress, shipAddress } from "./OrderPage";
import { Card } from "../components/OrderPage/Order2";
import {
  ConfirmationContainer,
  ConfirmationListItem,
} from "../app/Utils/StyledComponents/ConfirmationComponents";

import { DB } from "../firebase";
import { useUserData } from "../app/Store/User/userSlice";
import { carData } from "../teslaCarInfo";
import SmallFooter from "../components/Layout/SmallFooter";

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
  const [empty, setEmpty] = useState(false);
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
    if (!user) {
      nav("/login");
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
        setEmpty(true);
        return;
      }
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
          <Link to={"/account"}>
            {!empty ? " recent " : " future "}
            <span>orders</span>
          </Link>
          ,{" "}
          <Link to={"/account"}>
            manage <span>returns</span>
          </Link>
          , or discover{" "}
          <Link to={"/"}>
            new <span>products</span>
          </Link>
        </p>

        {!empty ? (
          <>
            <div>
              <p>Order identifier: {order.tag}</p>
              <p>Total Amount: {order.total}</p>
            </div>
            <div>
              {!empty &&
                order.order?.map((product) => (
                  <ConfirmationListItem key={product.id}>
                    <img
                      src={`/images/${product.backgroundImg}`}
                      alt={product.title}
                    />
                    <div>
                      <div>
                        <h3>{product.title}</h3>
                        <h3>${product.price}</h3>
                      </div>
                      <p>{product.description}</p>
                      <p>Amount ordered: {product.quantity}</p>
                    </div>
                  </ConfirmationListItem>
                ))}
            </div>
            <p className={"mt-8 tracking-wider"}>
              Items count:
              <span className={"!border-b-0 ml-4"}>{order.order?.length}</span>
            </p>
          </>
        ) : (
          <div>
            <p>
              {" "}
              To get a confirmation you need to have to:{" "}
              <li>
                Complete an order for at least one
                <Link to={"/"}>
                  {" "}
                  <span>car</span>
                </Link>
              </li>
            </p>
          </div>
        )}
      </ConfirmationContainer>
      <SmallFooter />
    </>
  );
};

export default ConfirmationPage;
