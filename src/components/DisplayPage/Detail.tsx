/** @format */

import { CheckIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addToCart } from "../../app/Store/Car/carSlice";
import { carsData } from "../../teslaCarInfo";

const Detail = () => {
  const { id } = useParams();
  const [product] = carsData.filter((car) => car.id === parseInt(id ?? ""));
  const dispatch = useDispatch();

  return (
        <div >
          {/* Product image */}
          <Container bgImage={product.backgroundImg}>
          </Container>
          {/* Product details */}
          <div>
            <h1 >
              {product.title}
            </h1>
            <div >
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  aria-hidden="true"
                />
              ))}
              <p>
                {3} out of 5 stars
              </p>
            </div>
            <p >
              {product.description}
            </p>
            <p >
              Price- ${new Intl.NumberFormat("en-US").format(product.price)}
            </p>
            <p >
              {product.inStock ? (
                <CheckIcon
                  aria-hidden="true"
                />
              ) : (
                <ClockIcon
                  aria-hidden="true"
                />
              )}
              {product.inStock ? "In Stock!" : "Out Of Stock!"}
            </p>
            <button
              disabled={!product.inStock}
              onClick={() => {
                dispatch(addToCart(product.id));
              }}
              type="button"
            >
              Add to cart
            </button>
          </div>

          <div>
            <h3>
              Highlights
            </h3>
            <ul role="list">
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Share</h3>
            <ul role="list">
              <li>
                <a href="#" >
                  <span >Share on Facebook</span>
                  <img
                    src="images/facebookIcon.svg"
                    alt="Facebook Icon"
                  />
                </a>
              </li>
              <li>
                <a href="#" >
                  <span >Share on Instagram</span>
                  <img
                    src="images/instagramIcon.svg"
                    alt="Instagram Icon"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <span >Share on Twitter</span>
                  <img
                    src="images/twitterIcon.svg"
                    alt="Twitter Icon"
                  />
                </a>
              </li>
            </ul>
          </div>
      </div>
  );
};

export default Detail;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${(props: { bgImage: string }) =>
    `url("images/${props.bgImage}")`};
`;