import React from 'react'
import styled from 'styled-components';
import { XMarkIcon } from '@heroicons/react/24/solid';
import NavList, { IconStyle } from './NavList';

const PopupMenu = (props: {toggle: Function}) => {

  return (
      <PopupMenuContainer>
        <XMarkIcon 
            onClick={props.toggle()}
            className={ CloseIcon } 
        />
          <NavList toggle={props.toggle()} wide={true}/>
      </PopupMenuContainer>
  )
}

export default PopupMenu;

const PopupMenuContainer = styled.div`
    position: fixed;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    padding: 86px 0 0 30px;
    background-color: rgba(240, 240, 240, .94);
    >ul{
        list-style: none;
        >li{
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            font-size: 25px;
            font-weight: 600;
            letter-spacing: 1.15px;
            color: rgba(90,90,90);
            :hover{
                color: black;
            }
        }
    }
`;

const CloseIcon = `absolute ${IconStyle} lg:w-12 lg:h-12 top-4 right-4`;