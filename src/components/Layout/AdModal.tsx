/** @format */

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import { Close } from "../../app/Utils/StyledComponents/HeaderComponents";
import { StyledProps } from "../../app/Utils/StyledComponents/HeaderComponents";

const AdModal = () => {
    const [modalStatus, setModalStatus] = useState(true)

    return (
    <Container show={modalStatus}>
        <Close>
          <XMarkIcon
            style={{ cursor: "pointer" }}
            className="h-6 w-6 mt-2 mr-2"
            onClick={() => setModalStatus(false)}
          />
        </Close>
        <p>
            Until March 2023, certain new Model 3 and Model Y vehicles qualify for a $7,500 federal tax credit for eligible buyers. <span>Learn More</span>
        </p>
    </Container>
    );
};

export default AdModal;

const Container = styled.div`
    position: sticky;
    display: ${({ show }: StyledProps) => 
    show ? "block" : "none"
    };
    top: 0;
    width: 100vw;
    height: 100px;
    font-size: 22px;
    text-align: center;
    p{
        position: relative;
        top: -8px;
        span{
            cursor: pointer;
            border-bottom: 1.5px solid black;
        }
        span:hover{
            border-bottom: 3px solid black;
        }
    }
`;