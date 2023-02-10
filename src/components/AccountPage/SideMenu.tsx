import React from 'react'
import styled from 'styled-components';
import NavList from './NavList';

const SideMenu = (props: {toggle: Function}) => {
  return (
    <SideMenuContainer>
      <NavList toggle={ props.toggle()} wide={false}/>
    </SideMenuContainer>
  )
}

export default SideMenu;

const SideMenuContainer = styled.div`
    width: 405px;
    padding: 0 0 0 60px; 
`;