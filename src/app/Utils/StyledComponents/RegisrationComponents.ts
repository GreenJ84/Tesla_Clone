/** @format */

import styled from "styled-components";
import { LoginContainer, LoginMainContainer, ToolTip } from "./LoginComponents";

export const RegMainContainer = styled(LoginMainContainer)`
  p {
    position: relative;
    top: 12px;
    font-weight: 600;
    color: rgba(100, 100, 100);
    margin-bottom: 15px;
  }
`;

const RegSubContainer = styled(LoginContainer)`
  > p {
    position: relative;
    top: -3px;
    font-size: 16px;
    color: rgba(100, 100, 100);
    margin-bottom: 30px;
    line-height: 22px;
    letter-spacing: 1px;
    font-weight: 400;
    span {
      cursor: pointer;
      color: rgba(20, 20, 20);
      text-decoration: underline;
    }
  }
  button {
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(10, 35, 205, 0.8);
  }
  button:disabled {
    background-color: rgba(0, 65, 205, 0.4);
    cursor: not-allowed;
  }
`;

export const Reg1Container = styled(RegSubContainer)`
> p {
  position: relative;
  top: -3px;
  font-size: 16px;
  color: rgba(100, 100, 100);
  margin-bottom: 30px;
  line-height: 22px;
  letter-spacing: 1px;
  font-weight: 400;
  span {
    cursor: pointer;
    color: rgba(20, 20, 20);
    text-decoration: underline;
  }
}
`;

export const Reg2Container = styled(RegSubContainer)`
  div {
    position: relative;
    width: 1;
    height: 0;
  }
`;

export const RegToolTip = styled(ToolTip)`
  bottom: -114px;
`;
