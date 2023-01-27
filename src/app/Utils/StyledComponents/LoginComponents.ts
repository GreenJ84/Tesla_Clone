import styled from "styled-components";

export const Underline = styled.a`
cursor: pointer;
display: block;
margin: auto;
width: 190px;
font-size: 19px;
letter-spacing: 1.4px;
:after {
  content: "";
  position: absolute;
  bottom: 0.5px;
  left: 118px;
  height: 0;
  width: 44%;
  border-bottom: 1.4px solid black;
  transition: width 0.3s ease;
}
:hover:after {
  border-bottom: 3px solid black;
}
`;

export const ToolTip = styled.span`
position: absolute;
bottom: -140px;
left: -140px;
width: 500px;
padding: 26px 30px;
background-color: white;
font-weight: 450;
box-shadow: 0px 10px 20px rgba(20, 20, 20, 0.2);
z-index: 10;
`;

export const Button = styled.button`
padding: 10px 0;
margin-bottom: 28px;
font-size: 20px;
font-weight: 600;
letter-spacing: 1.2px;
color: white;
background-color: rgba(40, 65, 255, 0.8);
border-radius: 4px;
:hover {
  background-color: rgba(20, 35, 205, 0.8);
}
:disabled {
  background-color: rgba(0, 65, 205, 0.4);
  cursor: not-allowed;
}
`;