import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import styled from 'styled-components';
import { useCaptcha } from '../../app/Utils/hooks/useCaptcha';

interface captchaProps{
  cap: [cap: string, setCap: Function]
}

const Captcha = (props: captchaProps) => {
  const [cap, setCap] = props.cap;


  return (
    <Container >
      <p>{ cap }</p>
      <ArrowPathIcon
        className="absolute cursor right-2 top-2 w-6 h-6"
        onClick={() => setCap()}
      />
    </Container>
  )
}

export default Captcha

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 430px;
  background-color: rgba(245,245,245);
  height: 110px;
  border-radius: 5px;
  margin-bottom: 50px;
  p{
    position: relative;
    top: 14px;
    font-size: 28px;
    letter-spacing: 5px;
  }
`;