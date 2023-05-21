/** @format */

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AdModalContainer, Close } from "../../app/Utils/StyledComponents/LayoutComponents";

const AdModal = () => {
    const [modalStatus, setModalStatus] = useState(true)

    return (
    <AdModalContainer show={modalStatus}>
        <Close>
          <XMarkIcon
            style={{ cursor: "pointer" }}
            className="absolute top-2 right-2 h-6 w-6 mt-2 mr-2"
            onClick={() => setModalStatus(false)}
          />
        </Close>
        <p>
            Until March 2023, certain new Model 3 and Model Y vehicles qualify for a $7,500 federal tax credit for eligible buyers. <span>Learn More</span>
        </p>
    </AdModalContainer>
    );
};

export default AdModal;