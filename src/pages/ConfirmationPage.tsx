/** @format */

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";

import Header from "../components/Layout/Header";

import { useUserData } from "../app/Store/User/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { DB } from "..";
import { collection, CollectionReference, doc, getCountFromServer, getDocs, limit, orderBy, query } from "firebase/firestore";
import { carData } from "../teslaCarInfo";
import { billAddress, shipAddress } from "./OrderPage";
import { Card } from "../components/OrderPage/Order2";

interface orderData {
  tag: string | null
  order: carData[] | null,
  shipping: shipAddress | null,
  billing: billAddress | null,
  card: Card | null,
  total: number | null,
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
    card:null,
    total: null,
  });
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!user) {
      nav('/login');
    }
    const getOrder = async () => {
      const userRef = user.user!.uid.slice(0, 8).toString().toLowerCase();

      const q = query(
        collection(DB, userRef, "account", "orders") as CollectionReference<orderData>,
        orderBy("timestamp", "desc"),
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
      {!empty && <Confetti
        className="overflow-y-hidden"
        width={width - 20}
        height={height - 20}
      />}
      <Header />
      <Container>
        {!empty ?
          <h1>Order Placement Confirmed</h1>
        :
          <h1>No Orders Placed ...yet</h1>
        }
        <p>
          Check the status of
          <Link to={"/account"}>
            {!empty ? " recent " : " future "}<span>orders</span>
          </Link>,{" "}
          <Link to={"/account"}>
            manage <span>returns</span>
          </Link>,
          or discover{" "}
          <Link to={"/"}>
            new <span>products</span>
          </Link>
        </p>

        {!empty ?
          <>
            <div>
              <p>Items count: {order.order?.length}</p>
              <p>Order identifier: {order.tag}</p>
              <p>Total Amount: {order.total}</p>
            </div>
            <div>
              {!empty && order.order?.map((product) => (
                <ListItem key={product.id}>
                  <img src={`/images/${product.backgroundImg}`} alt={product.title} />
                  <div>
                    <div>
                      <h3>{product.title}</h3>
                      <h3>${product.price}</h3>
                    </div>
                    <p>{product.description}</p>
                    <p>Amount ordered: {product.quantity}</p>
                  </div>
                </ListItem>
              ))}
            </div>
          </>
        :
          <div>
            <p> To get a confirmation you need to have to: <li>Complete an order for at least one
              <Link to={"/"}>
                {" "}<span>car</span>
              </Link></li>
            </p>
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
    font-weight: 600;
    margin-bottom: 16px;
  }
  >p{
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 60px;
  }
  span{
    cursor: pointer;
    border-bottom: 1.2px solid black;
    :hover{
      border-bottom: 2px solid black;
    }
  }
  >div:first-of-type{
    >p{
      font-size: 24px;
      margin-bottom: 20px;
      >li{
        position: relative;
        left: 40px;
        margin-top: 10px;
      }
    }
    >p:nth-of-type(3){
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1.1px;
    }
  }
`;

const ListItem = styled.li`
  display: flex;
  list-style: none;
  margin: 40px 0;
  height: 200px;
  align-items: center;
  >img{
    width: 160px;
    height: 160px;
    margin-right: 20px;
  }
  >div{
    >div{
      display: flex;
      justify-content: space-between;
      >h3{
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 5px;
        :nth-of-type(2){
          font-weight: 700;
        }
      }
    }
    >p{
      font-size: 18px;
      line-height: 20px;
      margin-bottom: 10px;
    }
  }
  }
`;
