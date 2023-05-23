/** @format */

import React, { useEffect, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/outline";

import PopupMenu from "./PopupMenu";
import AccountResources from "./AccountResources";
import NavList from "./NavList";
import {
  AccountContainer,
  AccountMain,
  ActiveIcon,
  SideMenuContainer,
} from "../../app/Utils/StyledComponents/AccountComponents";

const Account = () => {
  const [wide, setWide] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const checkWindow = () => {
      if (window.innerWidth > 1560) {
        setWide(true);
      } else {
        setWide(false);
      }
    };
    window.addEventListener("resize", checkWindow);
    return () => window.removeEventListener("resize", checkWindow);
  }, []);

  const toggleMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  return (
    <>
      <AccountContainer wide={wide}>
        {wide ? (
          <SideMenuContainer>
            <NavList
              wide={false}
            />
          </SideMenuContainer>
        ) : (
          menu && <PopupMenu toggle={() => toggleMenu} />
        )}
        <AccountMain wide={wide}>
          {wide ? (
            <h1>Dashboard</h1>
          ) : (
            <h1
              onClick={() => toggleMenu()}
              className="cursor flex items-center mb-8 text-[26px] tracking-wide font-[600]"
            >
              <HomeIcon className={ActiveIcon} />
              Dashboard
              <ChevronDownIcon className="ml-4 w-7 h-7" />
            </h1>
          )}
          <AccountResources
            img="https://tesla-cdn.thron.com/delivery/public/image/tesla/f7ede95a-84bc-436f-952a-8317732c0fdf/s24cey/std/636x300/solar-marketing_636x300"
            title="Order Tesla Solar"
            desc="Produce energy to power your Tesla life"
            link="View Solar"
            site="https://www.tesla.com/energy/design"
          />
          <AccountResources
            img="https://tesla-cdn.thron.com/delivery/public/image/tesla/19cd4858-858c-4e41-adcb-a7399da113a8/aaovse/std/636x300/dscf6059-4"
            title="Reserve a Car"
            desc="Browse our models"
            link="Shop Now"
            site="/"
          />
          <AccountResources
            img="https://tesla-cdn.thron.com/delivery/public/image/tesla/73bbc04a-67ec-47f6-9e07-86183688bd46/jzqmrw/std/636x300/third-party-car_636x300"
            title="Purchased a car from a third party?"
            link="Add"
          />
        </AccountMain>
      </AccountContainer>
    </>
  );
};

export default Account;
