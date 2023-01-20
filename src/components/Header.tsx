/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectCars } from "../app/Store/Car/carSlice";
import { storeType } from "../app/Store/store";
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
  const user = useSelector((state: storeType) => state.user);
  const cars = useSelector(selectCars);
  const [menuStatus, setMenuStatus] = useState(false);
  const cartData = useCartState();

  return (
    <Container>
      <Link to="/">
        <img
          src="/images/logo.svg"
          alt="Tesla Logo"
        />
      </Link>
      <Nav>
        {cars.map((car) => (
          <h1
            className=""
            onClick={() => {}}
            key=""
          >
            {car.title}
          </h1>
        ))}
      </Nav>
      <SideMenu></SideMenu>
      {/* Right side drop in Nav, under 800px  */}
      <SmallNav>
        {/* Close button for Burger Nav */}
        <Close></Close>
      </SmallNav>
    </Container>
  );
};

export default Header;
