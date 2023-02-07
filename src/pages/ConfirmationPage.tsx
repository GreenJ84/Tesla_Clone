/** @format */

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";

import Header from "../components/Layout/Header";

import { useUserData } from "../app/Store/User/userSlice";
import { useNavigate } from "react-router-dom";
import { DB } from "..";
import { collection, CollectionReference, getDocs, limit, orderBy, query } from "firebase/firestore";
import { carData } from "../teslaCarInfo";
import { billAddress, shipAddress } from "./OrderPage";
import { Card } from "../components/OrderPage/Order2";

interface orderData {
  order: carData[] | null,
  shipping: shipAddress | null,
  billing: billAddress | null,
  card: Card | null,
  total: number | null,
}

const ConfirmationPage = () => {
  const nav = useNavigate();
  const user = useUserData();
  const [empty, setEmpty] = useState(false)
  const [order, setOrder] = useState<orderData>({
    order: null,
    shipping: null,
    billing: null,
    card:null,
    total: null,
  });
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!user) {
      nav('/login');
    }
    const getOrder = async () => {
      const q = query(
        collection(DB, `orders-${user.user!.uid}`) as CollectionReference<orderData>,
        orderBy("timestamp"),
        limit(1))

      const queryRes = await getDocs(q);
      if (queryRes.empty) {
        setEmpty(true);
        return;
      }
      queryRes.forEach((order) => {
        setOrder(order.data())
      })
      }
    getOrder();
  }, []);


  return (
    <>
      <Confetti
        className="overflow-y-hidden"
        width={width - 20}
        height={height - 20}
      />
      <Header />
      <Container>
        {!empty && <h1>Order Placement Confirmed</h1>}
        <p>
          Check the status of 
          <span>{!empty ? "recent " : ""}orders</span>,
          <span>manage returns</span>, and discover <span>similar product</span>
        </p>

        {!empty ?
          <>
            <div>
              <p>Order Number {}</p>
              <p>Total Amount: {order.total}</p>
            </div>
            <div>
              {order.order!.map((product) => (
                <ListItem key={product.id}>
                  <img src={product.backgroundImg} alt={ product.title} />
                  <div>
                    <h3>{product.title}</h3>
                    <h3>{product.price}</h3>
                  </div>
                  <p>{product.description}</p>
                  <p>{product.quantity}</p>
                </ListItem>
              ))}
            </div>
          </>
        :
          <div>
            <p> No Orders have been placed with this account </p>
          </div>
        }
      </Container>
    </>
  );
};

export default ConfirmationPage;

const Container = styled.div`
  position: relative;
  width: 800px;
  margin: 0 auto;
  padding-top: 100px;
  >h1{
    font-size: 40px;
    margin-bottom: 32px;
  }
  > p{

  }
`;

const ListItem = styled.li``;
