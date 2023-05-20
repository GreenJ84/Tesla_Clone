/** @format */

import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  scroll-snap-align: start;
  background-image: ${(props: { bgImage: string }) =>
    `url("/images/${props.bgImage}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ButtonWrap = styled.div`
  display: flex;
  position: relative;
  top: 16vh;
  @media (max-width: 744px) {
    flex-direction: column;
    top: 8vh;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 6vh;
  margin: 2vh 16px;
  width: 36vw;
  max-width: 500px;
  @media only screen and (max-width: 744px) {
    flex-direction: column;
    min-width: 80vw;
    margin: 1.5vh 0px;
    height: 50px;
  }
  height: 60px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const DownArrow = styled.img`
  margin-bottom: 2vh;
  height: 60px;
  width: 100px;
  animation: animateDown infinite 1.5s;
  overflow-x: hidden;
  @media only screen and (max-width: 744px) {
    height: 40px;
    width: 80px;
  }
`;
