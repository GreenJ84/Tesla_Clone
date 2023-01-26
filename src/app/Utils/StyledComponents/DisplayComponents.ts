/** @format */

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  scroll-snap-align: start;
  background-image: ${(props: { bgImage: string }) =>
    `url("images/${props.bgImage}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ButtonWrap = styled.div`
  display: flex;
  position: relative;
  top: 240px;
  @media (max-width: 744px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 50px;
  margin: 8px 16px;
  width: 17vw;
  min-width: 35vw;
  @media (max-width: 744px) {
    flex-direction: column;
    min-width: 90vw;
    margin: 12px 0px;
  }
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const DownArrow = styled.img`
  margin-bottom: 35px;
  height: 40px;
  width: 80px;
  animation: animateDown infinite 1.5s;
  overflow-x: hidden;
`;
