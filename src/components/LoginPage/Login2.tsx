import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface Login2Props{
    email: string
    password: [string, Function]
    setStep: Function
}

const Login2 = (props: Login2Props) => {
    const [email, setEmail] = props.password;
    const { setStep } = props;

    const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep();
    }

    return (
        <Container>
            <label htmlFor="" className="relative">
                Password
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
            <a>Forgot Password?</a>
        </Container>
  )
}

export default Login2;

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
    a{
        cursor: pointer;
        font-size: 18px;
        text-align: center;
        letter-spacing: 1.4px;
        margin-bottom: 60px;
    }
    a:after{
        content: "";
        position: absolute;
        bottom: 200px;
        left: 130px;
        height: 0;
        width: 38%;
        border-bottom: 1.4px solid black;
        transition: width 0.3s ease;
    }
    a:hover:after{
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