/** @format */

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  HomeIcon,
  InboxStackIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { setLogout } from "../../app/Store/User/userSlice";
import {
  ActiveIcon,
  IconStyle,
  NavListContainer,
} from "../../app/Utils/StyledComponents/AccountComponents";

const NavList = ({ toggle, wide }: { wide: boolean; toggle?: Function }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <NavListContainer
      role="menu"
      aria-orientation="vertical"
      aria-label="Account navigation"
      wide={wide}
    >
      <li
        role="button"
        aria-label="Account Menu toggle"
        onClick={() => toggle && toggle()}
      >
        <HomeIcon className={ActiveIcon} />
        Dashboard
      </li>
      <li>
        <UserIcon className={IconStyle} />
        Profile Settings
      </li>
      <li>
        <CreditCardIcon className={IconStyle} />
        Payment Method
      </li>
      <li>
        <InboxStackIcon className={IconStyle} />
        Loot Box
      </li>
      <li>
        <RectangleStackIcon className={IconStyle} />
        Order History
      </li>
      <li
        role="button"
        aria-label="Sign out of Account"
        onClick={() => {
          dispatch(setLogout());
          nav("/");
        }}
      >
        <ArrowRightOnRectangleIcon className={IconStyle} />
        Sign Out
      </li>
    </NavListContainer>
  );
};
export default NavList;
