import React, { useState } from 'react'
import styled from 'styled-components'
import Captcha from './Captcha'

interface Step1 {
    firstName: [string, Function]
    lastName: [string, Function]
}

const Step1 = (props:Step1) => {
    const [fN, setFN] = props.firstName;
    const [lN, setLN] = props.lastName;
    const [captcha, setCaptcha] = useState("");
  return (
    <Container>
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
            pattern={`/[A-Za-z]{3,}/g`}
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
            pattern={`/[A-Za-z]{3,}/g`}
            required
        />
        <Captcha />
        <label htmlFor="CAPTCHA">
            Enter the characters in the image
        </label>
        <input 
            name="CAPTCHA" 
            type="text"
            value={captcha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCaptcha(e.currentTarget.value)
            }}
        />
        <p>
            By continuing, I understand and agree to Tesla's <span>Privacy Notice</span> and <span>Terms of Use</span> for creating a Tesla Account
        </p>
        {fN && lN && captcha ?
            <button>
                Next
            </button>
        :
            <button disabled>
                Next
            </button>
        }
    </Container>
  )
}

export default Step1

const Container = styled.div`
    display: flex;
    flex-direction: column;
    label{
        color: rgba(100,100,100);
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1.3px;
        margin-bottom: 8px;
    }
    input{
        font-size: 18px;
        font-weight: 500;
        padding: 10px 0 10px 13px;
        border-radius: 3px;
        background-color: rgba(240,240,240);
        margin-bottom: 30px;
    }
    p{
        font-size: 17px;
        color: rgba(100,100,100);
        margin-bottom: 30px;
        span{
            cursor: pointer;
            color: rgba(20,20,20);
            text-decoration: underline;
        }
    }
    button{
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1.2px;
        color: white;
        background-color: rgba(40, 65, 255, .8);
        border-radius: 4px;
    }
    button:hover{
        background-color: rgba(20, 35, 205, .8);
    }
    button:disabled{
        background-color: rgba(20, 35, 205, .4);
        cursor: not-allowed;
    }
`;