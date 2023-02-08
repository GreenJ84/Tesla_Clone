/** @format */

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import { selectCars, setCarRef } from "../../app/Store/Car/carSlice";
import { useAppDispatch } from "../../app/Utils/hooks/useAppDispatch";
import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";

import {
  Container,
  ButtonWrap,
  Button,
  DownArrow,
} from "./DisplayComponents";

interface DisplayProps {
  id: number;
  title: string;
  backgroundImg: string;
  homeRef: React.RefObject<HTMLDivElement>;
}

const Display = (props: DisplayProps) => {
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
          <a
            href="https://www.tesla.com/drive"
            target="_blank"
            className="text-xl border-b-2 hover:border-b-4 border-slate-800"
          >
            Schedule a Demo Drive
          </a>
        </div>
      </Fade>
      <Fade direction="up">
        <ButtonWrap>
          <Link to={`/cars/${props.id}`}>
            <Button className="text-white bg-[rgba(20,20,20,.85)] opacity-95 hover:animate-bounce">
              Custom Order
            </Button>
          </Link>
          <Link to={`/cart`}>
            <Button className="text-black bg-[rgba(255,255,255,.7)] opacity-90 hover:animate-bounce">
              View Inventory
            </Button>
          </Link>
        </ButtonWrap>
      </Fade>
      {props.id !== cars.length ? (
        <DownArrow
          onClick={() =>
            props.homeRef?.current &&
              props.homeRef.current.scrollTo({
                behavior: "smooth",
                top: cars[props.id].ref!.current ?
                    cars[props.id].ref!.current!.offsetTop
                  :
                    window.innerHeight * props.id
              })
          }
          className="cursor mx-auto"
          src="images/down-arrow.svg"
        />
      ) : (
        <div
          style={{ marginBottom: "35px", height: "40px", width: "80px" }}
        ></div>
      )}
    </Container>
  );
};

export default Display;
