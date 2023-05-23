/** @format */

import React from "react";
import { CarStatContainer } from "../../app/Utils/StyledComponents/DetailComponents";

interface CarStats {
    value: string
    description: string
}

const CarStat = (props: CarStats) => {
    const { value, description } = props;
    return (
    <CarStatContainer>
            <h2>
                {value}
            </h2>
            <p>
                {description}
            </p>
    </CarStatContainer>
    );
};

export default CarStat;
