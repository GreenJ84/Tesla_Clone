import React from 'react'
import styled from 'styled-components';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface show {
    state: boolean
    set: Function
}

const Show = (props: show) => {
  return (
    <Container onClick={() => props.set()}>
        {props.state ? 
            <EyeIcon />
        :
            <EyeSlashIcon />
        }
    </Container>
  )
}

export default Show;

const Container = styled.div`

`;