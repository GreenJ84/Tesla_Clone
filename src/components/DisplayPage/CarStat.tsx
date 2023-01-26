/** @format */

import React from "react";
import styled from "styled-components";

interface CarStats {
    value: string
    description: string
}

const CarStat = (props: CarStats) => {
    const { value, description } = props;
    return (
    <Container>
            <h1>
                {value}
            </h1>
            <h2>
                {description}
            </h2>
    </Container>
    );
};

export default CarStat;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        color: white;
        font-size: 36px;
        font-weight: 600;
        text-shadow: 0px 0px 8px rgba(255,255,255, 0.4);
    }
    h2{
        margin-top: 6px;
        color: lightgrey;
        font-size: 18px;
    }
`;
