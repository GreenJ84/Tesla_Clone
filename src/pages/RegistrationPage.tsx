import React, { useState } from 'react'

import Header from '../components/Layout/Header';
import Step1 from '../components/RegistrationPage/Step1';
import Step2 from '../components/RegistrationPage/Step2';

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const nav = useNavigation();

  return (
    <>
        <Header />
        <form>
            <Step1 
                firstName={[firstName, setFirstName]}
                lastName={[lastName, setLastName]}
                username={[username, setUsername]}
            />
            <Step2 
                email={[email, setEmail]} 
                password={[password, setPassword]}
            />
        </form>
    </>
  )
}

export default RegistrationPage
