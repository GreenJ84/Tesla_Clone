/** @format */

import { CarStatContainer } from "../../app/Utils/StyledComponents/DetailComponents";

interface CarStats {
    value: string
    description: string
}

const CarStat = (props: CarStats) => {
    const { value, description } = props;
    return (
    <CarStatContainer>
            <h1>
                {value}
            </h1>
            <h2>
                {description}
            </h2>
    </CarStatContainer>
    );
};

export default CarStat;
