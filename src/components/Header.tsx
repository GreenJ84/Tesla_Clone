import React from 'react'
import styled from 'styled-components';

interface HeaderType{

}

const Header = (props: HeaderType) => {

    return (
        <Container>

        </Container>
    )
}

export default Header

const Container = styled.div`
    min-height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;