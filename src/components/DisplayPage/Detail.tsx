/** @format */

import React from "react";
import { CheckIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {DownArrow} from '../../app/Utils/StyledComponents/DisplayComponents';
import { addToCart } from "../../app/Store/Car/carSlice";
import { carsData } from "../../teslaCarInfo";
import CarStat from "./CarStat";

const Detail = () => {
  const { id } = useParams();
  const [product] = carsData.filter((car) => car.id === parseInt(id ?? ""));
  const dispatch = useDispatch();

  return (
        <div >
          {/* Product image */}
          <Container bgImage={product.backgroundImg2} className={"flex flex-col items-center"}>
            <div className="relative top-40 lg:top-48 2xl:top-52">
              <h1 className="text-6xl xl:text-7xl font-semibold tracking-loose text-gray-900 mb-.5 pb-0 border-b border-black">
                {product.title}
              </h1>
            </div>
            <DownArrow
          onClick={() => window.scrollTo({
                behavior: 'smooth',
                top: window.innerHeight
              })}
              className="absolute bottom-80 cursor mx-auto"
              src="/images/down-arrow.svg"
            />
        <div className="absolute flex text-5xl bottom-56 gap-x-28">
              { product.title === "Model Y" ?
                <CarStat value={`${product.stats.capacity} cu ft`} description="Cargo Space" />
              : 
                ""
              }
              <CarStat value={`${product.stats.range} mi`} description="Range (EPA est.)"/>
              { product.title !== "Model Y" ?
                <CarStat value={`${product.stats.acceleration} s`} description="0-60 mph"/>
              : 
                ""
              }
              { product.title !== "Model Y" && product.title !== "Model 3" ?
                <CarStat value={`${product.stats.topSpeed} mph`} description="Top Speed"/>
              :
                <CarStat value={`${product.stats.drive}`} description="Dual Motor"/>
              }
            </div>
            <button className="absolute bottom-32 py-1.5 px-40 text-2xl transition-colors ease-in-out duration-300 text-white border-white border-4 rounded-lg hover:bg-white hover:text-black">
              Order Now
            </button>
          </Container>
          {/* Product details */}
      <div className="relative flex flex-col w-3/4 md:w-5/6 2xl:w-2/3 mx-auto pt-10">
            <p className="text-xl mx-auto mb-24 tracking-widest">Est. delivery: Mar-Apr 2023</p>

            <p className={"text-2xl md:text-4xl xl:text-5xl text-slate-600 leading-relaxed  md:leading-relaxed xl:leading-relaxed 2xl:leading-loose pb-24"}>
              {product.description}
            </p>
            <div className="flex justify-between pb-10 mb-16 border-b-2">
              <div>
                <p className="text-4xl">
                  Price: <strong className="hover:drop-shadow-xl">${new Intl.NumberFormat("en-US").format(product.price)}</strong>
                </p>
                <p >
                  {product.inStock ? (
                    <CheckIcon
                      aria-hidden="true"
                      className="inline flex-shrink-0 h-6 w-6"
                    />
                  ) : (
                    <ClockIcon
                      aria-hidden="true"
                      className="inline flex-shrink-0 h-6 w-6"
                    />
                  )}
                  <em className="relative top-1 left-1 text-xl">{product.inStock ? "In Stock!" : "Out Of Stock!"}</em>
                </p>
              </div>
              <button
                className="h-14 px-8 border-4 border-black text-lg hover:bg-slate-900 hover:text-white hover:shadow-2xl"
                disabled={!product.inStock}
                onClick={() => {
                  dispatch(addToCart(product.id));
                }}
                type="button"
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="relative flex flex-col w-3/4 md:w-5/6 2xl:w-2/3 mx-auto mt-10 pb-24 mb-16 border-b-2">
            <h3 className="text-3xl xl:text-5xl font-semibold xl:mb-16">
              Highlights
            </h3>
            <ul className="relative grid grid-cols-2 gap-y-6 gap-x-12 xl:gap-x-32 left-12 mt-2">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-xl xl:text-3xl tracking-wider xl:tracking-widest mt-6 xl:mt-10 list-disc "
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col w-3/4 md:w-5/6 2xl:w-2/3 mx-auto pt-10">
            <h3 className="text-2xl xl:text-4xl tracking-widest">Share</h3>
            <ul className="flex gap-12 xl:gap-24 mt-8 xl:mt-16 mb-24">
              <li>
                <a href="/" >
                  <span className="sr-only">Share on Facebook</span>
                  <img
                    className="h-10 w-10 xl:h-16 xl:w-16"
                    src="/images/facebookIcon.svg"
                    alt="Facebook Icon"
                  />
                </a>
              </li>
              <li>
                <a href="/" >
                  <span className="sr-only">Share on Instagram</span>
                  
                  <img
                    className="h-10 w-10 xl:h-16 xl:w-16"
                    src="/images/instagramIcon.svg"
                    alt="Instagram Icon"
                  />
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="sr-only">Share on Twitter</span>
                  <img
                    className="h-10 w-10 xl:h-16 xl:w-16"
                    src="/images/twitterIcon.svg"
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
  position: relative;
  width: 100vw;
  height: 130vh;
  background-image: ${(props: { bgImage: string }) =>
  `url("/images/${props.bgImage}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;