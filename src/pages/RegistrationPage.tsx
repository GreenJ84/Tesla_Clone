import React, { useState } from 'react'
import styled from 'styled-components';

import Header from '../components/Layout/Header';
import Step1 from '../components/RegistrationPage/Step1';
import Step2 from '../components/RegistrationPage/Step2';

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [secStep, setSecStep] = useState(false)
    // const nav = useNavigation();

    return (
    <>
        <Header />
        <Container>
            <p> Step { !secStep? "1" : "2"} of 2</p>
            <h1>Create Account</h1>
            <form>
                {!secStep ?
                    <Step1 
                        firstName={[firstName, setFirstName]}
                        lastName={[lastName, setLastName]}
                        username={[username, setUsername]}
                    />
                :
                    <Step2 
                        email={[email, setEmail]} 
                        password={[password, setPassword]}
                    />
                }
            </form>
        </Container>
    </>
  )
}

export default RegistrationPage;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    top: 100px;
    width: 400px;
    margin: 0 auto;
    p{
        margin-bottom: 25px;
    }
    h1{
        font-size: 44px;
        font-weight: 550;
        letter-spacing: 1.6px;
        margin-bottom: 32px;
    }
    form{
        display: flex;
        flex-direction: column;
    }
`;
