/** @format */

import React, { BaseSyntheticEvent, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/Layout/Header";
import AdModal from "../components/Layout/AdModal";
import Display from "../components/HomePage/Display";

import { selectCars } from "../app/Store/Car/carSlice";

const HomePage = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const cars = useSelector(selectCars);

  const slideIntoView = (e: BaseSyntheticEvent, idx: number) => {
    e.preventDefault();
    homeRef.current?.children[idx].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AdModal />
      <Header
        slide={slideIntoView}
      />
      <Container ref={homeRef}>
        {cars.map((car) => (
          <Display
            key={car.id}
            id={car.id}
            slide={slideIntoView}
            title={car.title}
            backgroundImg={car.backgroundImg}
          />
        ))}
      </Container>
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
