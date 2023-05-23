/** @format */

import styled from "styled-components";

export const socialIconStyle = "h-10 w-10 xl:h-16 xl:w-16";

export const DetailContainer = styled.section`
  position: relative;
  width: 100vw;
  height: 130vh;
  background-image: ${(props: { bgImage: string }) =>
    `url("/images/${props.bgImage}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, .9), rgba(255, 255, 255, .8), rgba(255, 255, 255, .6), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  }
`;


export const CarStatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2{
        color: white;
        font-size: 36px;
        font-weight: 600;
        text-shadow: 0px 1px 18px rgba(10,10,10);
    }
    p{
        margin-top: 6px;
        color: lightgrey;
        font-size: 18px;
    }
`;