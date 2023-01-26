import React, { useState } from 'react'
import Show from '../Layout/Show'

interface Step2 {
    email: string
    setEmail: Function
    password: string
    setPassword: Function
}

const Step2 = (props: Step2) => {
    const { email, setEmail, password, setPassword } = props;
    const [showPass, setShowPass] = useState(false);
    const [showCon, setShowCon] = useState(false);
    const [conPass, setConPass] = useState("");

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
            />

            <label htmlFor="">Password</label>
            <input 
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
            />
            <Show state={ showPass } set={ setShowPass }/>

            <label htmlFor="">Confirm Password</label>
            <input 
                type={showCon ? "text" : "password"} 
                value={conPass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConPass(e.currentTarget.value)}
            />
            <Show state={ showCon } set={ setShowCon }/>
        </>
  )
}

export default Step2;