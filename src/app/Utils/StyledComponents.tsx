/** @format */

import styled from "styled-components";

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

`;

export const Cart = styled.div``;

export const SmallNav = styled.div``;

export const Close = styled.div``;

export const BurgerIcon = styled.div``;