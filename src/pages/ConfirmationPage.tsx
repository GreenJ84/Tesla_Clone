/** @format */

import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";

import Header from "../components/Layout/Header";

import { useAppSelector } from "../app/Utils/hooks/useAppSelector";
import { useCartState } from "../app/Utils/hooks/useCartState";

const ConfirmationPage = () => {
  const orders = useCartState();
  const total = useAppSelector((state) => state.car.total);
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        className="overflow-y-hidden"
        width={width - 20}
        height={height - 20}
      />
      <Header />
      <Container>
        <h1>Order Placement Confirmed</h1>
        <p>
          Check the status of <span>recent orders</span>,{" "}
          <span>manage returns</span>, and discover <span>similar product</span>
        </p>

        <div>
          <p>Order Number {}</p>
          <p>Total Amount: {total}</p>
        </div>
        <div>
          {orders.map((product) => (
            <ListItem key={product.id}>
              <img src="" alt=""/>
              <div>
                <h3>{product.title}</h3>
                <h3>{product.price}</h3>
              </div>
              <p>{product.description}</p>
              <p>{product.quantity}</p>
            </ListItem>
          ))}
        </div>
      </Container>
    </>
  );
};

export default ConfirmationPage;

const Container = styled.div``;

const ListItem = styled.li``;
