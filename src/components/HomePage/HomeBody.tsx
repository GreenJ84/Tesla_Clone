/** @format */

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Display from "./Display";

import { selectCars } from "../../app/Store/Car/carSlice";

interface HomeProps {
  homeRef: React.RefObject<HTMLDivElement>;
}

const HomeBody = (props: HomeProps) => {
  const { homeRef } = props;
  const cars = useSelector(selectCars);

  return (
    <Container ref={homeRef}>
      {cars.map((car) => (
        <div key={car.id}>
          <Display
            id={car.id}
            title={car.title}
            homeRef={homeRef}
            backgroundImg={car.backgroundImg}
          />
        </div>
      ))}
    </Container>
  );
};

export default HomeBody;

const Container = styled.div`
  overflow-y: auto;
  text-align: center;
  height: 100vh;
  scroll-snap-type: y mandatory;
`;
