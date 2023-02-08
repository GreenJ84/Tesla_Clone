/** @format */

import { Link } from "react-router-dom";

import { GlobeAltIcon } from "@heroicons/react/24/outline";


import {
  Container,
  SideMenu,
} from "../../app/Utils/StyledComponents/HeaderComponents";

export const LogRegHeader = () => {

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
          className="cursor bg-transparent hover:bg-[rgba(220,220,220,.5)] transition-colors duration-700 pl-1 pr-3 py-4 mt-2 text-lg text-black font-semibold rounded-[6px]"
        >
          <GlobeAltIcon className="inline w-9 h-7"/>en-US
        </p>
      </SideMenu>
    </Container>
  );
};

export default LogRegHeader;
