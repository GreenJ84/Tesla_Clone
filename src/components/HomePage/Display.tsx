/** @format */

import React, { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import { selectCars } from "../../app/Store/Car/carSlice";
import { useAppSelector } from "../../app/Utils/hooks/useAppSelector";

import { Container, ButtonWrap, Button, DownArrow } from "./DisplayComponents";

interface DisplayProps {
  id: number;
  title: string;
  backgroundImg: string;
  slide: (e: BaseSyntheticEvent, idx: number) => void;
}

const Display = (props: DisplayProps) => {
  const nav = useNavigate();
  const cars = useAppSelector(selectCars);

  return (
    <Container
      bgImage={props.backgroundImg}
    >
      <Fade direction="up">
        <div style={{ paddingTop: "15vh", textAlign: "center" }}>
          <h1 className="text-6xl font-medium text-black">{props.title}</h1>
          <a
            aria-label="Offsite link to Tesla's actual test drive registration"
            href="https://www.tesla.com/drive"
            rel="noreferrer"
            target="_blank"
            className="text-xl border-b-2 hover:border-b-4 border-slate-800"
          >
            Schedule a Demo Drive
          </a>
        </div>
      </Fade>
      <Fade direction="up">
        <ButtonWrap>
          <Button
            role="link"
            aria-label="Car Navigation"
            className="text-white bg-[rgba(20,20,20,.85)] opacity-95 hover:animate-bounce"
            onClick={() => {
              nav("/cars/" + props.id);
            }}
          >
            Custom Order
          </Button>
          <Button
            role="link"
            aria-label="Cart Navigation"
            className="text-black bg-[rgba(255,255,255,.7)] opacity-90 hover:animate-bounce"
            onClick={() => {
              nav("/cart");
            }}
          >
            View Inventory
          </Button>
        </ButtonWrap>
      </Fade>
      {props.id !== cars.length ? (
        <DownArrow
          role="link"
          aria-label="Next Car Window Slide"
          onClick={(e: BaseSyntheticEvent) => props.slide(e, props.id)}
          className="cursor mx-auto"
          src="images/down-arrow.svg"
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Display;
