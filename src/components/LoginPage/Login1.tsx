import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface Login1Props{
    email: [string, Function]
    setStep: Function
}

const Login1 = (props: Login1Props) => {
    const [email, setEmail] = props.email;
    const { setStep } = props;

    const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep();
    }

    useEffect(() => {
        let hover = document.getElementById("email")!
        let tip = document.getElementById("emailTip")!

        const displayTip = () => {
            tip.style.visibility = "visible";
        }
        const hideTip = () => {
            tip.style.visibility = "hidden";
        }
        hover.addEventListener("mouseover", displayTip);
        hover.addEventListener("mouseout", hideTip);
        return () => {
            hover.removeEventListener("mouseover", displayTip);
            hover.removeEventListener("mouseout", hideTip);
        }
    }, [])

    return (
    <Container>
        <label htmlFor="" className="relative">
            Email
            <InformationCircleIcon
                id="email"
                className="relative inline bottom-[3px] w-4 h-4 ml-1"
            />
            <ToolTip id="emailTip" className="invisible">
                If your account is linked to an email you no longer have access to, sign into your account and update your email under account settings
            </ToolTip>
        </label>
        <input 
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
            className="w-[430px]"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
            required
        />
        {email ?
            <Button1
                onClick={buttonHandler}
            >
                Next
            </Button1>
        :
            <Button1 disabled>
                Next
            </Button1>
            }
        <div className="relative mb-[76px]">
            <Underline 
                href="https://www.teslUnderline.com/support/account-support?redirect=no" 
                rel="noreferrer" 
                target="_blank"
            >
                Trouble Signing In?
            </Underline>
        </div>
    </Container>
  )
}

export default Login1

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
        background-color: rgba(245,245,245);
        margin-bottom: 36px;
    }
`;

const Underline = styled.a`
    cursor: pointer;
    display: block;
    margin: auto;
    width: 190px;
    font-size: 19px;
    letter-spacing: 1.4px;
    :after{
        content: "";
        position: absolute;
        bottom: .5px;
        left: 118px;
        height: 0;
        width: 44%;
        border-bottom: 1.4px solid black;
        transition: width 0.3s ease;
    }
    :hover:after{
        border-bottom: 3px solid black;
    }
`;

const ToolTip = styled.span`
    position: absolute;
    bottom: -140px;
    left: -140px;
    width: 500px;
    padding: 26px 30px;
    background-color: white;
    font-weight: 450;
    box-shadow: 0px 10px 20px rgba(20,20,20,.2);
    z-index: 10;
`;

const Button1 = styled.button`
    padding: 10px 0;
    margin-bottom: 28px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(40, 65, 255, .8);
    border-radius: 4px;
    :hover{
        background-color: rgba(20, 35, 205, .8);
    }
    :disabled{
        background-color: rgba(0,65, 205, .4);
        cursor: not-allowed;
    }
`;
