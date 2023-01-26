import React, { useState } from 'react'
import Show from '../Layout/Show'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

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
        <>
            <label htmlFor="" inputMode='email'>Email</label>
            <input 
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                required
            />

            <label htmlFor="">
                Password
                <span><InformationCircleIcon /></span>
                <span>Password must be at least 8 characters and include at least 1 number and 1 letter</span>
            </label>
            <input 
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                required
            />
            <Show state={ showPass } set={ showPassHandler }/>

            <label htmlFor="">Confirm Password</label>
            <input 
                className={confirmMatch ? 
                    ""
                :
                    ""
                }
                type={showCon ? "text" : "password"} 
                value={conPass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConPass(e.currentTarget.value)}
                required
            />
            <Show state={ showCon } set={ showConHandler }/>
        </>
  )
}

export default Step2;