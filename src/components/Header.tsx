/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FaOpencart } from 'react-icons/fa';

import { RootState } from "../app/Store/store";
import { selectCars } from "../app/Store/Car/carSlice";
import { setLogout } from "../app/Store/User/userSlice";
import { useCartState } from "../app/Utils/hooks/useCartState";

import {
  Close,
  Container,
  Nav,
  SideMenu,
  SmallNav,
} from "../app/Utils/StyledComponents";

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

  return (
    <Container className={ bgColor ? bgColor : "" }>
      {/* Tesla Logo Display */}
      <Link to="/">
        <img
          src="/images/logo.svg"
          alt="Tesla Logo"
        />
      </Link>
      {/* Cars Menu */}
      <Nav>
        {cars.map(( car ) => (
          <h1
            className=""
            onClick={() => {
              homeRef
                ?
                  homeRef.current?.scrollTo({
                    behavior: 'smooth',
                    top: car.ref?.offsetTop
                  })
                :
                  nav(`/cars/${ car.id }`)
            }}
            key={ car.id }
          >
            {car.title}
          </h1>
        ))}
      </Nav>
      {/* Loggin, Logout, and Cart Menu */}
      <SideMenu>
        {user.isLoggedIn
          ?
            <h1
              onClick={() => {
                dispatch(setLogout());
                window.location.reload();
              }}
            >
              Logout
            </h1>
          :
            <h1
              onClick={() => nav('/login')}
            >
              Sign In
            </h1>
        }
          <Link to="/cart">
            <FaOpencart />
            <p>
              {cartData.length}
            </p>
          </Link>

          <div
            style={{ "cursor": "pointer" }}
            
            onClick={() => setMenuStatus(true)}
          />
      </SideMenu>
      {/* Right side drop in Nav, under 800px  */}
      <SmallNav show={menuStatus}>
        {/* Close button for Burger Nav */}
        <Close></Close>
        <ul>
          {cars.map((car) => 
            <li
              onClick={() => {
                homeRef
                  ?
                    homeRef.current?.scrollTo({
                      behavior: 'smooth',
                      top: car.ref?.offsetTop
                    })
                  :
                    nav(`/cars/${ car.id }`)
              }}
            >
              <h1> { car.title }</h1>
            </li>
          )}
        </ul>
      </SmallNav>
    </Container>
  );
};

export default Header;
