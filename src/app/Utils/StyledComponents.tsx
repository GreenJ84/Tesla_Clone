/** @format */

import styled from "styled-components";

interface StyledProps {
  show: boolean
}

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 20px;
  min-height: 60px;
  z-index: 1;
`;

export const Nav = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  @media (max-width: 770px) {
    display: none;
  }
`;

export const SideMenu = styled.div`
  display: flex;
  align-items: center;
  a {
    font-weight: 600;
    text-transform: small-caps;
    margin-right: 10px;
  }
`;

export const SmallNav = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 20px;
  width: 300px;
  background: white;
  list-style: none;
  text-align: start;
  z-index: 16;
  transition: transform 0.2s ease-in;
  transform: ${({ show }: StyledProps) =>
    show ? "translateX(0)" : "translateX(100%)"};
  ul {
    list-style: none;
    li {
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
        h1 {
          font-size: 16px;
          font-weight: 600;
        }
    }
  }
`;

export const Cart = styled.div``;


export const Close = styled.div``;

export const BurgerIcon = styled.div``;