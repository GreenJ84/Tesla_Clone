/** @format */

import styled from "styled-components";

export const ConfirmationContainer = styled.div`
  position: relative;
  width: 80vw;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 100px;
  > h1 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  > p {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 60px;
  }
  span {
    cursor: pointer;
    border-bottom: 1.2px solid black;
    :hover {
      border-bottom: 2px solid black;
    }
  }
  > div:first-of-type {
    > p {
      font-size: 24px;
      margin-bottom: 20px;
      > li {
        position: relative;
        left: 40px;
        margin-top: 10px;
      }
    }
    > p:nth-of-type(3) {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1.1px;
    }
  }
  > div:nth-of-type(2) {
    border-top: 1px solid rgba(200, 200, 200);
    border-bottom: 1px solid rgba(200, 200, 200);
  }
`;

export const ConfirmationListItem = styled.li`
  display: flex;
  list-style: none;
  margin: 40px 0;
  min-height: 200px;
  align-items: center;
  > img {
    width: 160px;
    height: 160px;
    margin-right: 20px;
  }
  > div {
    > div {
      display: flex;
      justify-content: space-between;
      > h3 {
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 5px;
        :nth-of-type(2) {
          font-weight: 700;
        }
      }
    }
    > p {
      font-size: 18px;
      line-height: 20px;
      margin-bottom: 10px;
    }
  }
  @media only screen and (max-width: 800px) {
    > img {
      align-self: start;
    }
  }
`;
