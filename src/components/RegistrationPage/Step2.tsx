import React, { useState } from 'react'
import Show from '../Layout/Show'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import styled from 'styled-components'

interface Step2 {
    email: [string, Function]
    password: [string, Function]
}

const Step2 = (props: Step2) => {
    const [email, setEmail] = props.email;
    const [password, setPassword] = props.password;
    const [showPass, setShowPass] = useState(false);
    const [showCon, setShowCon] = useState(false);
    const [conPass, setConPass] = useState("");
    const confirmMatch = !conPass || conPass === password

    const showPassHandler = () => {
        showPass ?
            setShowPass(false) : setShowPass (true)
    }
    const showConHandler = () => {
        showCon ?
            setShowCon(false) : setShowCon (true)
    }


    return (
        <Container>
            <label htmlFor="" inputMode='email'>Email</label>
            <input 
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                pattern="/([A-Za-z]+[1-9]+[!#$%&]){8,}/g"
                required
            />

            <label htmlFor="">
                Password
                <span><InformationCircleIcon className="relative inline bottom-[3px] w-4 h-4 ml-1" /></span>
            </label>
            <input 
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                className="w-[430px]"
                pattern="/([A-Za-z]+[1-9]+[!#$%&]){8,}/g"
                required
            />
            <div>
                { password && <Show state={showPass} set={showPassHandler} />}
            </div>

            <label htmlFor="">Confirm Password</label>
            <input 
                className={confirmMatch ? 
                    "w-[430px]"
                :
                    "w-[430px]"
                }
                type={showCon ? "text" : "password"} 
                value={conPass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConPass(e.currentTarget.value)}
                pattern="/([A-Za-z]+[1-9]+[!#$%&]){8,}/g"
                required
            />
            <div>
                { conPass && <Show state={showCon} set={showConHandler} />}
            </div>
            { email && password && conPass ?
                <button>
                    Create Account
                </button>
            :
                <button disabled>
                    Create Account
                </button>
            }
        </Container>
  )
}

export default Step2;

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
    div{
        position: relative;
        width: 1;
        height: 0;
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