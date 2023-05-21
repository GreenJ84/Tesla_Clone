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
  width: 35px;
  height: 35px;
  cursor: pointer;
  transform: translateY(-40px) translateX(390px);
  @media only screen and (min-width: 1400px) {
    transform: translateY(-40px) translateX(510px);
  }
`;
