/** @format */

import React, { useEffect, useState } from "react";
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
  const _cartData = useCartState();

  useEffect(() => {
    const sizeHandler = () => {
      if (window.innerWidth > 900) {
        setMenuStatus(false);
      }
    };
    window.addEventListener("resize", sizeHandler);
  });

  return (
    <NavContainer className={bgColor ? bgColor : ""}>
      {/* Tesla Logo Display */}
      <Link to="/">
        <img
          className="relative top-2 left-2 w-40 h-5 xl:w-48 2xl:top-5 2xl:left-5 2xl:w-52"
          src={
            window.location.pathname === "/cars/1"
              ? "/images/logo2.svg"
              : "/images/logo.svg"
          }
          alt="Tesla Logo"
        />
      </Link>
      {/* Cars Menu */}
      <Nav className="flex gap-6 pt-2.5">
        {cars.map((car) => (
          <h1
            className={ window.location.pathname === '/cars/1' ?
              "cursor text-lg 2xl:text-2xl text-white bg-transparent rounded-lg px-2.5 py-1.5 hover:text-white transition-colors hover:shadow-2xl hover:bg-[rgba(0,0,0)] duration-700"
            :
              "cursor text-lg 2xl:text-2xl text-black bg-transparent rounded-lg px-2.5 py-1.5 hover:text-white hover:bg-gray-800 hover:bg-opacity-50 transition-colors hover:shadow-2xl"
            }
            onClick={() => {
              homeRef
                ? homeRef.current?.scrollTo({
                    behavior: "smooth",
                    top: (car.id-1)*window.innerHeight,
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
            <button
              className={ window.location.pathname === "/cars/1" ?
                "invisible xl:visible text-white text-lg 2xl:text-2xl font-normal bg-transparent rounded-lg px-6 py-2 hover:text-white cursor transition-colors mr-5 hover:shadow-3xl hover:bg-[rgba(0,0,0)] duration-700"
              :
                "invisible xl:visible text-black text-lg 2xl:text-2xl font-normal bg-transparent rounded-lg px-6 py-2 hover:text-white cursor transition-colors mr-5 hover:shadow-3xl duration-700 hover:bg-gray-800 hover:bg-opacity-50"
              }
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Logout
            </button>
        ) : (
          <button
            className={ window.location.pathname === "/cars/1" ?
              "invisible xl:visible text-white text-lg 2xl:text-2xl font-normal bg-transparent rounded-lg px-6 py-2 hover:text-white cursor transition-colors mr-5 hover:shadow-3xl hover:bg-[rgba(0,0,0)] duration-700"
            :
              "invisible xl:visible text-black text-lg  2xl:text-2xl font-normal bg-transparent rounded-lg px-6 py-2 hover:text-white cursor transition-colors mr-5 hover:shadow-3xl  hover:bg-gray-800 hover:bg-opacity-50 duration-700"
            }
            onClick={() => nav("/login")}
          >
            Account
          </button>
        )}

        {user.isLoggedIn &&
            <Link
              to="/cart"
              className="invisible xl:visible flex relative top-1 right-2 xl:right-0"
            >
              <button
              className={ window.location.pathname === "/cars/1" ?
                "invisible xl:visible text-white text-lg 2xl:text-2xl font-normal bg-transparent rounded-lg px-6 py-2 hover:text-white cursor transition-colors mr-5 hover:shadow-3xl hover:bg-[rgba(0,0,0)] duration-700"
              :
                "invisible xl:visible text-black text-lg 2xl:text-2xl font-normal bg-transparent rounded-lg px-6 py-2 hover:text-white cursor transition-colors mr-5 hover:shadow-3xl  hover:bg-gray-800 hover:bg-opacity-50 duration-700"
              }
              >
                Cart
              </button>
              {_cartData.length > 0 &&
                <p className="absolute -top-.5 right-3 flex items-center justify-center bg-blue-600 text-white h-5 w-5 md:h-5 md:w-5 text-xs font-bold rounded-full">
                  {_cartData.reduce((acc, curr) => {
                      acc += curr.quantity;
                      return acc;
                    }, 0)}
                </p>
              }
            </Link>
        }

        <button
          style={{ cursor: "pointer", borderRadius: "5px" }}
          className={
            window.location.pathname === "/cars/1"
              ? "xl:bg-transparent bg-[rgba(80,80,80,.8)] hover:bg-[rgba(0,0,0)] transition-colors duration-700 px-6 py-2 text-sm md:text-lg 2xl:text-2xl text-white font-medium"
              : "xl:bg-transparent bg-[rgba(0,0,0,.1)]  hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-700 px-6 py-2 text-sm md:text-lg 2xl:text-2xl hover:text-white font-medium"
          }
          onClick={() => setMenuStatus(true)}
        >
          Menu
        </button>
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
                nav(`/cars/${car.id}`);
              }}
            >
              <h1> {car.title}</h1>
            </li>
          ))}
          <li
            onClick={ user.isLoggedIn ? () => nav("/account") : () => nav('/login')}
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
                nav('/cart');
              }}
              >
                <h1 className="flex items-center">Cart {_cartData.length > 0 ? 
                    <span className="flex items-center justify-center ml-4 bg-blue-600 text-white h-6 w-6 text-xs font-bold rounded-full">
                    {_cartData.reduce((acc, curr) => {
                      acc += curr.quantity;
                      return acc;
                    }, 0)}
                    </span>
                  :
                    ""
                  }
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
