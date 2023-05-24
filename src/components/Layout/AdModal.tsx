/** @format */

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AdModalContainer, Close } from "../../app/Utils/StyledComponents/LayoutComponents";

const AdModal = () => {
    const [modalStatus, setModalStatus] = useState(true)

    return (
    <AdModalContainer show={modalStatus}>
        <Close
          onClick={() => setModalStatus(false)}
        >
          <XMarkIcon
            style={{ cursor: "pointer" }}
            className="h-6 w-6"
          />
        </Close>
        <p>
            Up to $7,500 federal tax credit for Model Y and Model 3&emsp;<span>Learn More</span>
        </p>
    </AdModalContainer>
    );
};

export default AdModal;