/** @format */

import React, { useRef } from "react";
import Header from "../components/Header";

const HomePage = () => {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header homeRef={homeRef} />
      {/* Need The Rolling selector body */}
    </>
  );
};

export default HomePage;
