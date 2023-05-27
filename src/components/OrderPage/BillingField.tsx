/** @format */

import React, { useState } from "react";

import { Form, Form2 } from "../../app/Utils/StyledComponents/OrderComponents";

import { Address } from "../../app/Store/Order/orderSlice";

interface BillingProps {
  shipAdd: Address;
  billing: [Address, React.Dispatch<React.SetStateAction<Address>>];
  errors: Address;
}

const BillingField = ({ shipAdd, billing, errors }: BillingProps) => {
  const [billAdd, setBillAdd] = billing;
  // Handle updating all billing fields
  const billHandler = (
    value: keyof Address,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let billCopy = { ...billAdd };
    billCopy[value] = e.currentTarget.value;
    setBillAdd({ ...billCopy });
  };

  const [personalBilling, setPersonalBilling] = useState(true);
  const toggleRadio = () => {
    personalBilling ? setPersonalBilling(false) : setPersonalBilling(true);
  };
  return (
    <>
      <h2>Account Details</h2>
      <Form>
        <div>
          <label htmlFor="billingFirstName">
            First Name<span aria-hidden="true">*</span>
          </label>
          <input
            id="billingFirstName"
            name="billingFirstName"
            aria-describedby="billingFirstNameError"
            className={billAdd.firstName && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.firstName}
            value={billAdd.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("firstName", e)
            }
            pattern="^[A-Za-z\s-]{2,}$"
            aria-invalid={
              billAdd.firstName.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingFirstNameError"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.firstName}
          </div>
        </div>

        <div>
          <label htmlFor="billingLastName">
            Last Name<span aria-hidden="true">*</span>
          </label>
          <input
            id="billingLastName"
            name="billingLastName"
            aria-describedby="billingLastNameError"
            className={billAdd.lastName && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.lastName}
            value={billAdd.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("lastName", e)
            }
            pattern="^[A-Za-z\s-]{2,}$"
            aria-invalid={
              billAdd.lastName.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingLastNameError"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.lastName}
          </div>
        </div>
      </Form>

      <h2> Billing Address</h2>
      <Form2>
        <div>
          <label
            htmlFor="personalAccount"
            className={personalBilling ? "font-semibold" : ""}
          >
            <input
              type="radio"
              name="personalAccount"
              defaultChecked={true}
              checked={personalBilling}
              onClick={() => {
                toggleRadio();
              }}
            />
            Personal
          </label>
        </div>
        <div>
          <label
            htmlFor="companyAccount"
            className={!personalBilling ? "font-semibold" : ""}
          >
            <input
              type="radio"
              name="companyAccount"
              checked={!personalBilling}
              onClick={() => {
                toggleRadio();
                console.log(personalBilling);
              }}
            />
            Business
          </label>
        </div>
      </Form2>
      <Form>
        <div>
          {!personalBilling && (
            <>
              <label htmlFor="billingCompany">
                Company Name<span aria-hidden="true">*</span>
              </label>
              <input
                id="billingCompany"
                name="billingCompany"
                aria-describedby="billingCompanyError"
                className={billAdd.company && "border invalid:border-red-500"}
                type="text"
                inputMode="text"
                placeholder="Ex. My Company Inc."
                value={billAdd.company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  billHandler("company", e)
                }
                pattern="^[A-Za-z\s-.,']{2,}$"
                aria-invalid={
                  billAdd.company?.match(/^[A-Za-z\s-.,']{2,}$/)
                    ? "false"
                    : "true"
                }
                autoComplete="on"
                aria-autocomplete="both"
                required
                aria-required="true"
              />
              <div
                id="billingCompanyError"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                {errors.company}
              </div>
            </>
          )}

          <label htmlFor="billingCountry">
            Country/Region<span aria-hidden="true">*</span>
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="billingCountry"
            name="billingCountry"
            aria-describedby="billingCountryError"
            className={billAdd.country && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder="Ex. USA"
            value={billAdd.country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("country", e)
            }
            pattern="^[A-Za-z\s-]{2,}$"
            aria-invalid={
              billAdd.country?.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingCountryError"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.country}
          </div>

          <label htmlFor="billingAddress2">Address Line 2</label>
          <input
            id="billingAddress2"
            name="billingAddress2"
            aria-describedby="billingAddress2Error"
            className={billAdd.address2 && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.address2}
            value={billAdd.address2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("address2", e)
            }
            pattern="^[A-Za-z0-9\s-.,#]*$"
            aria-invalid={
              billAdd.address2.match(/^[A-Za-z0-9\s-.,#]*$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingAddress2Error"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.address2}
          </div>

          <label htmlFor="billingState">
            State<span aria-hidden="true">*</span>
          </label>
          <input
            id="billingState"
            name="billingState"
            aria-describedby="billingStateError"
            className={billAdd.state && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.state}
            value={billAdd.state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("state", e)
            }
            pattern="^[A-Za-z\s-]{2,}$"
            aria-invalid={
              billAdd.state.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingStateError"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.state}
          </div>
        </div>

        {/* Right Form side */}
        <div>
          {!personalBilling && <div className="h-[114px]"></div>}

          <label htmlFor="billingAddress1">
            Address Line 1<span aria-hidden="true">*</span>
          </label>
          <input
            id="billingAddress1"
            name="billingAddress1"
            aria-describedby="billingAddress1Error"
            className={billAdd.address1 && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.address1}
            value={billAdd.address1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("address1", e)
            }
            pattern="^[A-Za-z0-9\s-.,]*$"
            aria-invalid={
              billAdd.address1.match(/^[A-Za-z0-9\s-.,]*$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingAddress1Error"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.address1}
          </div>

          <label htmlFor="billingCity">
            City<span aria-hidden="true">*</span>
          </label>
          <input
            id="billingCity"
            name="billingCity"
            aria-describedby="billingCityError"
            className={billAdd.city && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.city}
            value={billAdd.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("city", e)
            }
            pattern="^[A-Za-z\s-]{2,}$"
            aria-invalid={
              billAdd.city.match(/^[A-Za-z\s-]{2,}$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingCityError"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.city}
          </div>

          <label htmlFor="billingZip">
            Zip Code<span aria-hidden="true">*</span>
          </label>
          <input
            id="billingZip"
            name="billingZip"
            aria-describedby="billingZipError"
            className={billAdd.zip && "border invalid:border-red-500"}
            type="text"
            inputMode="text"
            placeholder={shipAdd.zip}
            value={billAdd.zip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              billHandler("zip", e)
            }
            pattern="^\d{5}(-\d{4})?$"
            aria-invalid={
              billAdd.zip.match(/^\d{5}(-\d{4})?$/) ? "false" : "true"
            }
            autoComplete="on"
            aria-autocomplete="both"
            required
            aria-required="true"
          />
          <div
            id="billingZipError"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {errors.zip}
          </div>
        </div>
      </Form>
    </>
  );
};

export default BillingField;
