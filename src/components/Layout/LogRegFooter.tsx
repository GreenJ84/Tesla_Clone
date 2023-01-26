import React from 'react'
import styled from 'styled-components';

const LogRegFooter = () => {
  return (
    <Container >
        <p>Tesla © 2023</p>
        <p>Privacy & Legal</p>
        <p>Contact</p>
    </Container>
  )
}

export default LogRegFooter

const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content:space-around;
    margin-bottom: 10px;
    width: 360px;
    p{
        font-weight: 550;
        color: rgba(110,110,110);
        margin-bottom: 24px;
        line-height: 18px;
    }
    p:hover{
        color: black;
        border-bottom: 3px solid black;
        margin-bottom: 21px;
    }
`;