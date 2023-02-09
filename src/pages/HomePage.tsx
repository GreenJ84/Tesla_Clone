/** @format */

import { useRef } from "react";
import Header from "../components/Layout/Header";
import HomeBody from "../components/HomePage/HomeBody";
import AdModal from "../components/Layout/AdModal";

const HomePage = () => {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AdModal />
      <div style={{"position":"relative"}}>
        <Header />
        <HomeBody homeRef={homeRef} />
      </div>
    </>
  );
};

export default HomePage;
