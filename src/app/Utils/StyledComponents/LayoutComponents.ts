/** @format */

import styled from "styled-components";

export interface StyledProps {
  show: boolean
}

export const Container = styled.div`
  border: 1px solid red;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  min-width: 100vw;
  padding: 0 20px;
  min-height: 60px;
  z-index: 1;
`;

export const Nav = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
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

export const Cover = styled.div`
  position: absolute;
  display: ${({ show }: StyledProps) => 
    show ? "block" : "none"
  };
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  background-color: rgba(0,0,0,.65);
  filter: blur();
`;

export const SmallNav = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 20px;
  width: 390px;
  background: white;
  list-style: none;
  text-align: start;
  z-index: 16;
  transition: transform 0.2s ease-in;
  transform: ${({ show }: StyledProps) =>
    show ? "translateX(0)" : "translateX(100%)"};
  ul {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding-top: 30px;
    li {
        padding: 5px 0 5px 0;
        margin-bottom: 8px;
        cursor: pointer;
        h1 {
          width: 320px;
          padding: 5px 0px 5px 20px;
          font-size: 20px;
          font-weight: 500;
          border-radius: 5px;
        }
        h1:hover{
          background-color: rgba(0, 0, 0, .05);
          box-shadow: 0px .5px 1px black;
        }
    }
  }
`;

export const Close = styled.div`
  display: flex;
  justify-content: flex-end;
`;
