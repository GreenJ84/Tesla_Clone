/** @format */

import React from "react";
import styled from "styled-components";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface show {
  state: boolean;
  set: Function;
}

const Show = (props: show) => {
  return (
    <ShowContainer onClick={() => props.set()}>
      {props.state ? <EyeIcon /> : <EyeSlashIcon />}
    </ShowContainer>
  );
};

export default Show;

const ShowContainer = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  transform: translateY(-70px) translateX(385px);
  cursor: pointer;
`;
