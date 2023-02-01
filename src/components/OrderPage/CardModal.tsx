import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from '../../app/Utils/StyledComponents/DisplayComponents';

interface cardProps{
  setcard: Function
}

const CardModal = (props: cardProps) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  return (
    <Container>

      {name && number && expMonth && expYear && cvv ?
        <Button> Continue </Button>
      :
        <Button disabled> Continue </Button>}
    </Container>
  )
}

export default CardModal;

const Container = styled.div`
  
`;