/** @format */

import React, { useRef } from "react";

import Detail from "../components/DisplayPage/Detail";
import Header from "../components/Layout/Header";

const DisplayPage = () => {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ position: "relative" }}>
      <Header homeRef={homeRef} />
      <Detail />
    </div>
  );
};

export default DisplayPage;
