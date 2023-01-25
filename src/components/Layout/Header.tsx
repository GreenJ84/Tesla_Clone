/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FaOpencart } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { RootState } from "../../app/Store/store";
import { selectCars } from "../../app/Store/Car/carSlice";
import { setLogout } from "../../app/Store/User/userSlice";
import { useCartState } from "../../app/Utils/hooks/useCartState";

import {
  Close,
  Container,
  Cover,
  Nav,
  SideMenu,
  SmallNav,
} from "../../app/Utils/StyledComponents/HeaderComponents";

interface HeaderType {
  homeRef?: React.RefObject<HTMLDivElement>;
  bgColor?: string;
}

const Header = (props: HeaderType) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { homeRef, bgColor } = props;
  const user = useSelector((state: RootState) => state.user);
  const cars = useSelector(selectCars);
  const [menuStatus, setMenuStatus] = useState(false);
  const cartData = useCartState();

  useEffect(() => {
    const sizeHandler = () => {
      if (window.innerWidth > 900) {
        setMenuStatus(false);
      }
    };
    window.addEventListener("resize", sizeHandler);
  });

  return (
    <Container className={bgColor ? bgColor : ""}>
      {/* Tesla Logo Display */}
      <Link to="/">
        <img
          className="relative top-2 left-2 w-40 h-5 xl:w-48 2xl:top-5 2xl:left-5 2xl:w-52"
          src="/images/logo.svg"
          alt="Tesla Logo"
        />
      </Link>
      {/* Cars Menu */}
      <Nav className="flex gap-6 pt-2.5">
        {cars.map((car) => (
          <h1
            className="cursor text-lg text-black bg-transparent rounded-lg px-2.5 py-1.5 hover:text-white hover:bg-gray-800 hover:bg-opacity-50 transition-colors hover:shadow-2xl"
            onClick={() => {
              homeRef
                ? homeRef.current?.scrollTo({
                    behavior: "smooth",
                    top: car.ref?.offsetTop,
                  })
                : nav(`/cars/${car.id}`);
            }}
            key={car.id}
          >
            {car.title}
          </h1>
        ))}
      </Nav>
      {/* Loggin, Logout, and Cart Menu */}
      <SideMenu>
        {user.isLoggedIn ? (
          <>
            <Link
              to="/cart"
              className="flex relative items-center"
            >
              <FaOpencart className="relative top-3 md:h-10 md:w-10 h-8 w-8" />
              <p className="absolute -top-0.5 right-1 md:-top-1 md:right-2 flex items-center justify-center bg-red-600 text-white h-5 w-5 md:h-6 md:w-6 text-sm font-bold rounded-full">
                {cartData.length}
              </p>
            </Link>
            <h1
              className="text-black text-lg bg-transparent rounded-lg px-2.5 py-1.5 hover:text-black hover:bg-gray-500 cursor hover:bg-opacity-30 transition-colors mr-5 hover:shadow-2xl"
              onClick={() => {
                dispatch(setLogout());
                window.location.reload();
              }}
            >
              Logout
            </h1>
          </>
        ) : (
          <h1
            className="hidden xl:inline-block text-black text-lg bg-transparent rounded-lg px-2.5 py-1.5 hover:text-black hover:bg-gray-500 cursor hover:bg-opacity-30 transition-colors mr-5 hover:shadow-2xl"
            onClick={() => nav("/login")}
          >
            Account
          </h1>
        )}

        <p
          style={{ cursor: "pointer", borderRadius: "5px" }}
          className="xl:bg-transparent bg-slate-300 px-6 py-2 text-lg text-black font-medium"
          onClick={() => setMenuStatus(true)}
        >
          Menu
        </p>
      </SideMenu>
      <Cover show={menuStatus} />
      {/* Right side drop in Nav, under 800px  */}
      <SmallNav show={menuStatus}>
        {/* Close button for Burger Nav */}
        <Close>
          <XMarkIcon
            style={{ cursor: "pointer" }}
            className="h-6 w-6"
            onClick={() => setMenuStatus(false)}
          />
        </Close>
        <ul>
          {cars.map((car) => (
            <li
              key={car.id}
              onClick={() => {
                homeRef
                  ? homeRef.current?.scrollTo({
                      behavior: "smooth",
                      top: car.ref?.offsetTop,
                    })
                  : nav(`/cars/${car.id}`);
              }}
            >
              <h1> {car.title}</h1>
            </li>
          ))}
        </ul>
      </SmallNav>
    </Container>
  );
};

export default Header;
