/** @format */

import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Close,
  NavContainer,
  Cover,
  Nav,
  SideMenu,
  SmallNav,
} from "../../app/Utils/StyledComponents/LayoutComponents";

import { XMarkIcon } from "@heroicons/react/24/solid";

import { RootState } from "../../app/Store/store";
import { selectCars } from "../../app/Store/Car/carSlice";
import { setLogout } from "../../app/Store/User/userSlice";
import { useCartState } from "../../app/Utils/hooks/useCartState";

interface HeaderType {
  bgColor?: string;
  slide?: (e: BaseSyntheticEvent, idx: number) => void;
}

const toggleStyle =
  "cursor px-6 py-2 2xl:text-2xl rounded-lg hover:shadow-3xl hover:text-white transition-colors duration-700";
const buttonStyle = `invisible xl:visible text-lg font-normal bg-transparent ${toggleStyle}`;
const whiteBGStyle = "text-white hover:bg-[rgba(0,0,0)]";
const blackBGStyle = "text-black hover:bg-gray-800 hover:bg-opacity-50";

const Header = (props: HeaderType) => {
  const { bgColor, slide } = props;
  const nav = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const cars = useSelector(selectCars);
  const _cartData = useCartState();

  const [menuStatus, setMenuStatus] = useState([false, false]);

  useEffect(() => {
    const sizeHandler = () => {
      if (window.innerWidth > 1279) {
        setMenuStatus([false, menuStatus[1]]);
      } else {
        setMenuStatus([true, menuStatus[1]]);
      }
    };
    window.addEventListener("resize", sizeHandler);
    return () => window.removeEventListener("resize", sizeHandler);
  // eslint-disable-next-line
  }, []);

  return (
    <NavContainer className={bgColor ? bgColor : ""}>
      {/* Tesla Logo Display */}
      <Link
        to="/"
        aria-label="Home Return"
      >
        <img
          className="relative top-2 left-2 w-40 h-5 xl:w-48 2xl:top-5 2xl:left-5 2xl:w-52"
          src={
            window.location.pathname === "/cars/1"
              ? "/images/logo2.svg"
              : "/images/logo.svg"
          }
          alt="Tesla Inc. company Logo"
        />
      </Link>
      {/* Cars Menu */}
      <Nav
        aria-label="Product Selection Navigation"
        className="flex gap-6 pt-2.5"
      >
        {cars.map((car) => (
          <h1
            className={`${buttonStyle} ${
              window.location.pathname === "/cars/1"
                ? whiteBGStyle
                : blackBGStyle
            }`}
            onClick={(e: BaseSyntheticEvent) => {
              slide ? slide(e, car.id - 1) : nav(`/cars/${car.id}`);
            }}
            key={car.id}
          >
            {car.title}
          </h1>
        ))}
      </Nav>
      {/* Loggin, Logout, and Cart Menu */}
      <SideMenu aria-label="Account Navigation">
        {user.isLoggedIn ? (
          <button
            className={`${buttonStyle} ${
              window.location.pathname === "/cars/1"
                ? whiteBGStyle
                : blackBGStyle
            }`}
            onClick={() => {
              dispatch(setLogout());
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className={`${buttonStyle} ${
              window.location.pathname === "/cars/1"
                ? whiteBGStyle
                : blackBGStyle
            }`}
            onClick={() => nav("/login")}
          >
            Account
          </button>
        )}

        {user.isLoggedIn && (
          <>
            <button
              role="link"
              aria-label="View Cart"
              onClick={() => nav("/cart")}
              className={`relative ${buttonStyle} ${
                window.location.pathname === "/cars/1"
                  ? whiteBGStyle
                  : blackBGStyle
              }`}
            >
              Cart
              {_cartData.length > 0 && (
                <p className="absolute top-0 right-2 flex items-center justify-center bg-blue-600 text-white h-5 w-5 md:h-5 md:w-5 text-xs font-bold rounded-full">
                  {_cartData.reduce((acc, curr) => {
                    acc += curr.quantity;
                    return acc;
                  }, 0)}
                </p>
              )}
            </button>
          </>
        )}
        {menuStatus[0] && (
          <button
            aria-label="Side Menu Collapse Toggle"
            style={{ cursor: "pointer", borderRadius: "5px" }}
            className={`text-sm md:text-lg font-medium xl:bg-opacity-80 ${toggleStyle} ${
              window.location.pathname === "/cars/1"
                ? `bg-[rgba(80,80,80,.8)] ${whiteBGStyle}`
                : `bg-[rgba(0,0,0,.1)] xl:bg-[rgba(0,0,0,.03)] ${blackBGStyle}`
            }`}
            onClick={() => setMenuStatus([menuStatus[0], true])}
          >
            Menu
          </button>
        )}
      </SideMenu>

      <Cover show={menuStatus[1]} />
      {/* Right side drop in Nav, under 800px  */}
      <SmallNav show={menuStatus[1]}>
        {/* Close button for Burger Nav */}
        <Close>
          <XMarkIcon
            style={{ cursor: "pointer" }}
            className="h-6 w-6"
            onClick={() => setMenuStatus([menuStatus[0], false])}
          />
        </Close>
        <ul>
          {cars.map((car) => (
            <li
              key={car.id}
              onClick={() => {
                nav(`/cars/${car.id}`);
              }}
            >
              <h1> {car.title}</h1>
            </li>
          ))}
          <li
            onClick={
              user.isLoggedIn ? () => nav("/account") : () => nav("/login")
            }
          >
            <h1>Account</h1>
          </li>
          {user.isLoggedIn && (
            <>
              <li
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                <h1>Logout</h1>
              </li>
              <li
                onClick={() => {
                  nav("/cart");
                }}
              >
                <h1 className="flex items-center">
                  Cart{" "}
                  {_cartData.length > 0 ? (
                    <span className="flex items-center justify-center ml-4 bg-blue-600 text-white h-6 w-6 text-xs font-bold rounded-full">
                      {_cartData.reduce((acc, curr) => {
                        acc += curr.quantity;
                        return acc;
                      }, 0)}
                    </span>
                  ) : (
                    ""
                  )}
                </h1>
              </li>
            </>
          )}
        </ul>
      </SmallNav>
    </NavContainer>
  );
};

export default Header;
