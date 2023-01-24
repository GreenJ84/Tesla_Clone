/** @format */

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import styled from "styled-components";

import { selectCars, setCarRef } from "../app/Store/Car/carSlice";
import { useAppDispatch } from "../app/Utils/hooks/useAppDispatch";
import { useAppSelector } from "../app/Utils/hooks/useAppSelector";

interface DisplayProps {
  id: number;
  title: string;
  backgroundImg: string;
  homeRef: React.RefObject<HTMLDivElement>;
}

const CarDisplay = (props: DisplayProps) => {
  let myRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCars);

  useEffect(() => {
    if (myRef.current) {
      dispatch(setCarRef({ id: props.id, ref: myRef }));
    }
  }, [myRef.current]);

  return (
    <Container
      ref={myRef}
      bgImage={props.backgroundImg}
    >
      <Fade direction="up">
        <div style={{ paddingTop: "15vh", textAlign: "center" }}>
          <h1 className="text-6xl font-medium text-black">{props.title}</h1>
          <p className="text-xl border-b-2 hover:border-b-4 border-slate-800">Schedule a Demo Drive</p>
        </div>
      </Fade>
      <Fade direction="up">
        <ButtonWrap>
          <Link to={`/cars/${props.id}`}>
            <Button className="text-white bg-slate-800 opacity-95 hover:animate-bounce">
              Custom Order
            </Button>
          </Link>
          <Link to={`/cart`}>
            <Button className="text-black bg-slate-300 opacity-90 hover:animate-bounce">
              View Inventory
            </Button>
          </Link>
        </ButtonWrap>
      </Fade>
      {props.id !== cars.length ?
        <DownArrow
          onClick={() =>
            props.homeRef?.current?.scrollTo({
              behavior: "smooth",
              top: cars[props.id].ref.offsetTop,
            })
          }
          className="cursor mx-auto"
          src="images/down-arrow.svg"
        />
      :
        <div style={{ "marginBottom": "35px", "height": "40px", "width": "80px"}}></div>}
    </Container>
  );
};

export default CarDisplay;

const Container = styled.div`
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

const ButtonWrap = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 744px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 50px;
  margin: 8px 16px;
  width: 17vw;
  min-width: 300px;
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

const DownArrow = styled.img`
  margin-bottom: 35px;
  height: 40px;
  width: 80px;
  animation: animateDown infinite 1.5s;
  overflow-x: hidden;
`;
