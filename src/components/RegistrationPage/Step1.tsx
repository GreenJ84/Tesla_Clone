import React, { useState } from 'react'
import Captcha from './Captcha'

interface Step1 {
    firstName: [string, Function]
    lastName: [string, Function]
    username: [string, Function]
}

const Step1 = (props:Step1) => {
    const [fN, setFN] = props.firstName;
    const [lN, setLN] = props.lastName;
    const [un, setUn] = props.username;
    const [capcha, setCapcha] = useState("");
  return (
    <>
        <label htmlFor="first-name">
            First Name
        </label>
        <input 
            name="first-name" 
            type="text"
            value={fN}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFN(e.currentTarget.value)
            }}
            required
        />
        <label htmlFor="last-name">
            Last Name
        </label>
        <input 
            name="last-name" 
            type="text"
            value={lN}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLN(e.currentTarget.value)
            }}
            required
        />
        <Captcha />
        <label htmlFor="CAPTCHA">
            Enter the characters in the image
        </label>
        <input 
            name="CAPTCHA" 
            type="text"
            value={""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

            }}
        />
        <p>
            By continuing, I understand and agree to Tesla's <span>Privacy Notice</span> and <span>Terms of Use</span> for creating a Tesla Account
        </p>
        <button>Next</button>
    </>
  )
}

export default Step1