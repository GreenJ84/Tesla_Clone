/** @format */

import React from "react";
import { Form } from "react-router-dom";

import { Address } from "../../app/Store/Order/orderSlice";

interface ShippingProps {
  shipping: [Address, React.Dispatch<React.SetStateAction<Address>>];
  errors: Address;
}

const ShippingField = ({ shipping, errors }: ShippingProps) => {
  const [shipAdd, setShipAdd] = shipping;

  // Handle updating all shipping fields
  const shipHandler = (
    value: keyof Address,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let shipCopy = { ...shipAdd };
    shipCopy[value] = e.currentTarget.value;
    setShipAdd({ ...shipCopy });
  };

  return (
    <Form>
      <div>
        <label htmlFor="shippingFirstName">
          First Name<span aria-hidden="true">*</span>
        </label>
        <input
          id="shippingFirstName"
          name="shippingFirstName"
          aria-describedby="shippingFirstNameError"
          className={shipAdd.firstName && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. John"
          value={shipAdd.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("firstName", e)
          }
          pattern="^[A-Za-z\s-]{2,}$"
          aria-invalid={
            shipAdd.firstName.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
          }
          autoComplete="given-name"
          aria-autocomplete="both"
          required
          aria-required="true"
        />
        <div
          id="shippingFirstNameError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.firstName}
        </div>

        <label htmlFor="shippingAddress1">
          Address Line 1<span aria-hidden="true">*</span>
        </label>
        <input
          id="shippingAddress1"
          name="shippingAddress1"
          aria-describedby="shippingAddress1Error"
          className={shipAdd.address1 && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. 1503 Sunny Lane St."
          value={shipAdd.address1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("address1", e)
          }
          pattern="^[A-Za-z0-9\s-.,]*$"
          aria-invalid={
            shipAdd.address1.match(/^[A-Za-z0-9\s-.,]*$/) ? "false" : "true"
          }
          autoComplete="street-address"
          aria-autocomplete="both"
          required
          aria-required="true"
        />
        <div
          id="shippingAddress1Error"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.address1}
        </div>

        <label htmlFor="zipCode">
          Zip Code<span aria-hidden="true">*</span>
        </label>
        <input
          id="zipCode"
          name="zipCode"
          aria-describedby="shippingZipError"
          className={shipAdd.zip && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. 73391"
          value={shipAdd.zip}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("zip", e)
          }
          pattern="^\d{5}(-\d{4})?$"
          aria-invalid={
            shipAdd.zip.match(/^\d{5}(-\d{4})?$/) ? "false" : "true"
          }
          autoComplete="zip-code"
          aria-autocomplete="both"
          required
          aria-required="true"
        />
        <div
          id="shippingZipError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.zip}
        </div>

        <label htmlFor="shippingState">
          State<span aria-hidden="true">*</span>
        </label>
        <input
          id="shippingState"
          name="shippingState"
          aria-describedby="shippingStateError"
          className={shipAdd.state && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. Alabama"
          value={shipAdd.state}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("state", e)
          }
          pattern="^[A-Za-z\s-]{2,}$"
          aria-invalid={
            shipAdd.state.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
          }
          autoComplete="state"
          aria-autocomplete="both"
          required
          aria-required="true"
        />
        <div
          id="shippingStateError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.state}
        </div>
      </div>

      <div>
        <label htmlFor="shippingLastName">
          Last Name<span aria-hidden="true">*</span>
        </label>
        <input
          id="shippingLastName"
          name="shippingLastName"
          aria-describedby="shippingLastNameError"
          className={shipAdd.lastName && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. Smith"
          value={shipAdd.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("lastName", e)
          }
          pattern="^[A-Za-z\s-]{2,}$"
          aria-invalid={
            shipAdd.lastName.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
          }
          autoComplete="family-name"
          required
          aria-required="true"
        />
        <div
          id="shippingLastNameError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.lastName}
        </div>

        <label htmlFor="shippingAddress2">Address Line 2</label>
        <input
          id="shippingAddress2"
          name="shippingAddress2"
          aria-describedby="shippingAddress2Error"
          className={shipAdd.address2 && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. Apt #1-21"
          value={shipAdd.address2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("address2", e)
          }
          pattern="^[A-Za-z0-9\s-.,#]*$"
          aria-invalid={
            shipAdd.lastName.match(/^[A-Za-z0-9\s-.,#]*$/) ? "false" : "true"
          }
          autoComplete="building-address"
          required
          aria-required="true"
        />
        <div
          id="shippingAddress2Error"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.address2}
        </div>

        <label htmlFor="shippingCity">
          City<span aria-hidden="true">*</span>
        </label>
        <input
          id="shippingCity"
          name="shippingCity"
          aria-describedby="shippingCityError"
          className={shipAdd.city && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. Los Angeles"
          value={shipAdd.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("city", e)
          }
          pattern="^[A-Za-z\s-]{2,}$"
          aria-invalid={
            shipAdd.lastName.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
          }
          autoComplete="city"
          required
          aria-required="true"
        />
        <div
          id="shippingCityError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.city}
        </div>

        <label htmlFor="phoneNumber">
          Phone Number<span aria-hidden="true">*</span>
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          aria-describedby="phoneNumberError"
          className={shipAdd.phone && "border invalid:border-red-500"}
          type="text"
          inputMode="text"
          placeholder="Ex. 555-555-5555"
          value={shipAdd.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            shipHandler("phone", e)
          }
          pattern="^[A-Za-z0-9\s-._,#]*$"
          aria-invalid={
            shipAdd.phone?.match(/^[A-Za-z0-9\s-._,#]*$/) ? "false" : "true"
          }
          autoComplete="phone-number"
          required
          aria-required="true"
        />
        <div
          id="phoneNumberError"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {errors.phone}
        </div>
      </div>
    </Form>
  );
};

export default ShippingField;
