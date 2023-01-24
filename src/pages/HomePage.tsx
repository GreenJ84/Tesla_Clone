/** @format */

import React, { useRef } from "react";
import Header from "../components/Header";
import HomeBody from "../components/HomeBody";

const HomePage = () => {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header homeRef={homeRef} />
      <HomeBody homeRef={homeRef}/>
    </>
  );
};

export default HomePage;
