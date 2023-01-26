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
            <h1>{ value }</h1>
            <h2>{ description }</h2>
    </Container>
    );
};

export default CarStat;

const Container = styled.div`

`;
