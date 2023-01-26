/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { GlobeAltIcon } from "@heroicons/react/24/outline";


import {
  Container,
  SideMenu,
} from "../../app/Utils/StyledComponents/HeaderComponents";

const Header = () => {

  return (
    <Container>
      {/* Tesla Logo Display */}
      <Link to="/">
        <img
          className="relative top-2 left-2 w-40 h-5 xl:w-48 2xl:top-5 2xl:left-5 2xl:w-52"
          src="/images/logo.svg"
          alt="Tesla Logo"
        />
      </Link>
      <SideMenu>
        <p
          style={{ cursor: "pointer", borderRadius: "5px" }}
          className="bg-transparent hover:bg-[rgba(210,210,210,.8)] hover:bg-[rgba(0,0,0)] transition-colors duration-700 pl-1 pr-3 py-4 mt-2 text-lg text-black font-semibold"
        >
          <GlobeAltIcon className="inline w-9 h-7"/>en-US
        </p>
      </SideMenu>
    </Container>
  );
};

export default Header;
