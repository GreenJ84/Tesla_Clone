import React, { useState } from 'react'
import { useNavigation } from 'react-router-dom';
import Header from '../components/Layout/Header';

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passCon, setPassCon] = useState("");
    const nav = useNavigation()

  return (
    <>
        <Header />
        <form>
            {/* Step 1 */}
            {/* Step 2 */}
        </form>
    </>
  )
}

export default RegistrationPage
