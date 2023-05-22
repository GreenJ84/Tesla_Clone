/** @format */

import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../OrderPage/Order2";
import {
  ConfirmationContainer,
  ConfirmationListItem,
} from "../../app/Utils/StyledComponents/ConfirmationComponents";

import { billAddress, shipAddress } from "../../pages/OrderPage";
import { carData } from "../../teslaCarInfo";

interface orderData {
  tag: string | null;
  order: carData[] | null;
  shipping: shipAddress | null;
  billing: billAddress | null;
  card: Card | null;
  total: number | null;
}

const Confirmation = ({
  order,
  empty,
}: {
  order: orderData;
  empty: boolean;
}) => {
  return (
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
            <h2>
              Order identifier: {order.tag}
              <br />
              <br />
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
                        ${new Intl.NumberFormat("en-US").format(product.price)}
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
        <div className="noOrder">
          <h2>To get a confirmation you need to have:</h2>
          <br />
          <p className="text-xl">
            Completed an order for at least one
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
  );
};

export default Confirmation;
