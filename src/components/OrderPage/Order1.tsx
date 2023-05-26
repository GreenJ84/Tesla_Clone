/** @format */

import React, { useState } from "react";

import { Button } from "../../app/Utils/StyledComponents/LoginComponents";
import ShippingField from "./ShippingField";
import BillingField from "./BillingField";
import { Order1Container } from "../../app/Utils/StyledComponents/OrderComponents";

import {
  Address,
  initialOrderState,
  setBilling,
  setShipping,
  validateBilling,
  validateShipping,
} from "../../app/Store/Order/orderSlice";
import { useAppDispatch } from "../../app/Utils/hooks/hooks";


const Order1 = ({ setStep }: { setStep: Function }) => {
  const dispatch = useAppDispatch();
  const [shipAdd, setShipAdd] = useState<Address>({
    ...initialOrderState.shipping,
  });
  const [shipError, setShipError] = useState<Address>({
    ...initialOrderState.shipping,
  });
  const [billAdd, setBillAdd] = useState<Address>({
    ...initialOrderState.billing,
  });
  const [billError, setBillError] = useState<Address>({
    ...initialOrderState.billing,
  });

  // Reference for same Billing as Shipping
  const [sameBilling, setSameBilling] = useState(true);
  const toggleChecked = () => {
    sameBilling ? setSameBilling(false) : setSameBilling(true);
  };

  // Quick handle for same Billing update
  const billShipSame = () => {
    let { phone, ...ship } = shipAdd;
    setBillAdd({
      ...ship,
      company: "",
      country: "USA",
    });
  };

  // Handle form submission
  const submitAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let noErrors = true;
    let shipErr = { ...shipError };
    let billErr = { ...billError };
    // Validate Shipping
    noErrors = validateShipping(shipAdd, shipErr);
    // Validate Billing
    if (sameBilling) {
      billShipSame();
    } else {
      noErrors = validateBilling(billAdd, billErr);
    }
    // Update Errors
    setShipError({ ...shipErr });
    setBillError({ ...billErr });
    // Handle Success
    if (noErrors) {
      dispatch(setShipping(shipAdd));
      dispatch(setBilling(billAdd));
      setStep();
    }
  };

  return (
    <Order1Container>
      <h1> Shipping </h1>
      <ShippingField
        shipping={[shipAdd, setShipAdd]}
        errors={billError}
      />

      <h1 className="mt-6">Billing</h1>
      <div>
        <input
          className="w-8 h-8"
          type="checkbox"
          defaultChecked={sameBilling}
          onChange={() => toggleChecked()}
        />
        <label> Billing address is the same as shipping </label>
      </div>
      {!sameBilling && (
        <BillingField
          shipAdd={shipAdd}
          billing={[billAdd, setBillAdd]}
          errors={billError}
        />
      )}

      {sameBilling &&
      shipAdd.firstName &&
      shipAdd.lastName &&
      shipAdd.address1 &&
      shipAdd.city &&
      shipAdd.state &&
      shipAdd.zip &&
      shipAdd.phone ? (
        <Button
          className="relative left-1 mt-8 !px-28"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitAddress(e)}
        >
          Next
        </Button>
      ) : !sameBilling &&
        shipAdd.firstName &&
        shipAdd.lastName &&
        shipAdd.address1 &&
        shipAdd.city &&
        shipAdd.state &&
        shipAdd.zip &&
        shipAdd.phone &&
        billAdd.firstName &&
        billAdd.lastName &&
        billAdd.address1 &&
        billAdd.city &&
        billAdd.state &&
        billAdd.zip ? (
        <Button
          type="submit"
          className="relative left-1 mt-8 !px-28"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitAddress(e)}
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          className="relative left-1 mt-8 !px-28"
          disabled
        >
          {" "}
          Next{" "}
        </Button>
      )}
    </Order1Container>
  );
};

export default Order1;
