import React from 'react'
import styled from 'styled-components';

const SmallFooter = () => {
  return (
    <SmallFooterContainer >
        <p>Tesla © 2023</p>
        <p>Privacy & Legal</p>
        <p>Contact</p>
    </SmallFooterContainer>
  )
}

export default SmallFooter

const SmallFooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content:space-around;
  width: 100%;
  max-width: 500px;
  p{
    font-size: 22px;
    font-weight: 550;
    color: rgba(110,110,110);
    margin-bottom: 20px;
    line-height: 18px;
  }
  p:hover{
    color: black;
    border-bottom: 2px solid black;
    line-height: 16px;
  }
@media only screen and (min-width: 1400px){
  max-width: 600px;
}
`;