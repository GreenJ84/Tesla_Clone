/** @format */

import styled from "styled-components";

export interface StyledProps {
  show: boolean;
}

export const AdModalContainer = styled.aside`
  position: sticky;
  display: ${({ show }: StyledProps) => (show ? "flex" : "none")};
  top: 0;
  align-items: center;
  width: 100vw;
  height: 70px;
  font-size: 20px;
  text-align: center;
  background-color: rgba(250, 250, 250);
  z-index: 20;
  p {
    position: relative;
    width: 90vw;
    margin: 0 auto;
  span {
      cursor: pointer;
      border-bottom: 1.5px solid black;
    }
    span:hover {
      border-bottom: 3px solid black;
    }
  }
  @media only screen and (max-width: 750px) {
    font-size: 18px;
  }
`;

export const NavContainer = styled.header`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  min-width: 100vw;
  padding: 0 20px;
  min-height: 60px;
  z-index: 10;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const SideMenu = styled.nav`
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
  display: ${({ show }: StyledProps) => (show ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.65);
  filter: blur();
`;

export const SmallNav = styled.nav`
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
      h1:hover {
        background-color: rgba(0, 0, 0, 0.05);
        box-shadow: 0px 0.5px 1px black;
      }
    }
  }
`;

export const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 2px;
  border-radius: 50%;
  :hover{
    background-color: rgba(0, 0, 0, 0.1);
    border: .5px solid rgba(0, 0, 0, 0.5);
  }
`;
