/** @format */

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/Layout/Header";
import AdModal from "../components/Layout/AdModal";
import Display from "../components/HomePage/Display";

import { selectCars } from "../app/Store/Car/carSlice";

const HomePage = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const cars = useSelector(selectCars);

  return (
    <>
      <AdModal />
      <div style={{ position: "relative" }}>
        <Header homeRef={homeRef} />
        <Container ref={homeRef}>
          {cars.map((car) => (
            <Display
              id={car.id}
              title={car.title}
              backgroundImg={car.backgroundImg}
            />
          ))}
        </Container>
      </div>
    </>
  );
};

export default HomePage;

const Container = styled.main`
  overflow-y: auto;
  text-align: center;
  height: 100vh;
  scroll-snap-type: y mandatory;
`;
