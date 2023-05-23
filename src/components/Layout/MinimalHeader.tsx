/** @format */

import React from "react";
import { Link } from "react-router-dom";

import { GlobeAltIcon } from "@heroicons/react/24/outline";

import {
  NavContainer,
  SideMenu,
} from "../../app/Utils/StyledComponents/LayoutComponents";

export const LogRegHeader = () => {
  return (
    <NavContainer>
      {/* Tesla Logo Display */}
      <Link
        to="/"
        aria-label="Home Return"
      >
        <img
          className="relative top-2 left-2 w-24 md:w-40 md:h-5 xl:w-48 2xl:top-5 2xl:left-5 2xl:w-52"
          src="/images/logo.svg"
          alt="Tesla Inc. company Logo"
        />
      </Link>
      <SideMenu>
        <p className="cursor bg-transparent hover:bg-[rgba(220,220,220,.5)] transition-colors duration-700 pl-1 pr-1 py-4 text-lg text-black font-semibold rounded-[6px]">
          <GlobeAltIcon className="inline w-9 h-7" />
          en-US
        </p>
      </SideMenu>
    </NavContainer>
  );
};

export default LogRegHeader;
