/** @format */

import styled from "styled-components";

export const socialIconStyle = "h-10 w-10 xl:h-16 xl:w-16";

export const DetailContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 130vh;
  background-image: ${(props: { bgImage: string }) =>
    `url("/images/${props.bgImage}")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;


export const CarStatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        color: white;
        font-size: 36px;
        font-weight: 600;
        text-shadow: 0px 0px 8px rgba(10,10,10);
    }
    h2{
        margin-top: 6px;
        color: lightgrey;
        font-size: 18px;
    }
`;