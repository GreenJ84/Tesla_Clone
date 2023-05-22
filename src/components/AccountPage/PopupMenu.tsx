/** @format */

import React from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

import NavList from "./NavList";
import {
  CloseIcon,
  PopupMenuContainer,
} from "../../app/Utils/StyledComponents/AccountComponents";

const PopupMenu = (props: { toggle: Function }) => {
  return (
    <PopupMenuContainer>
      <XMarkIcon
        role="button"
        aria-label="Close Menu"
        onClick={props.toggle()}
        className={CloseIcon}
      />
      <NavList
        toggle={props.toggle()}
        wide={true}
      />
    </PopupMenuContainer>
  );
};

export default PopupMenu;
