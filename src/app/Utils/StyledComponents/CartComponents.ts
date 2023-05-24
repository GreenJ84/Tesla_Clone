import styled from "styled-components";

export const CartBody = styled.main`
min-height: 100vh;
padding-bottom: 100px;
@media screen and (min-width: 1280px) {
  padding: 0 40px;
}
@media screen and (max-width: 1280px) {
  width: 700px;
  padding-bottom: 200px;
}
@media screen and (max-width: 750px) {
  width: 90vw;
}
`;

export const CartContainer = styled.section`
  display: flex;
  margin-bottom: 200px;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (min-width: 1280px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 1280px) {
    flex-direction: column;
  }
`;

export const Cart = styled.ul`
  border-bottom: 1.5px solid rgba(225, 225, 225);
  @media screen and (min-width: 1280px) {
    width: 640px;
    margin-right: 35px;
    border: none;
  }
`;

export const EmptyCart = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  h3{
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 1.2px;
    margin: 20px 0 40px;
  }
  button{
    padding: 10px 0;
    margin-bottom: 40px;
    width: 30%;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
`;

export const Checkout = styled.section`
  visibility: hidden;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  left:0;
  padding: 20px 0;
  background-color: white;
  box-shadow: 0 0 10px rgba(200, 200, 200);
  z-index: 1000;
  button {
    padding: 10px 0;
    width: 640px;
    max-width: 90vw;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
  button:disabled {
    background-color: rgba(0, 35, 205, 0.4);
  }
  bottom: 0;
  @media screen and (max-width: 1280px) {
    visibility: visible;
  }
`;

export const CartItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 158px;
  list-style: none;
  >img{
    height 100px;
    width: 100px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(200, 200, 200);
    :hover{
      box-shadow: 0 0 14px rgba(200, 200, 200);
    }
  }
  >div{
    position: relative;
    left: -16%;
    top: -20px;
    >h3{
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 1.2px;
      margin-bottom: 5px;
    }
    >div{
      font-size: 18px;
      >input{
        background-color: rgba(240 , 240, 240);
        padding: 0 0 0 5px;
        margin: 0 10px;
        max-width: 30px;
      }
      >button{
        padding-bottom: .5px;
        color: rgba(80, 80, 80);
        border-bottom: 1.5px solid black;
        :hover{
          padding-bottom: 0px;
          color: rgba(0, 0, 0);
          border-bottom: 2px solid black;
        }
      }
    }
  }
  >p{
    position: relative;
    top: -38px;
    font-size: 22px;
    font-weight: 500;
  }
@media only screen and (max-width: 750px){
  >div{
    left: -10vw;
  }
}
`;

export const OrderSumaryContainer = styled.div`
  h2{
    margin-top: 45px;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 1.2px;
  }
  >div{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    >div>p{
      color: rgba(80, 80, 80);
      margin-bottom: 10px;
    }
    >div>p:last-child{
      color: black;
      font-weight: 600;
      font-size: 26px;
      letter-spacing: 1.2px;
      margin-top: 20px;
    }
    >div:nth-of-type(2){
      text-align: end;
    }
  }
  button{ 
    visibility: hidden;
  }
@media screen and (min-width: 1280px) {
  margin: 0;
  width: 540px;
  padding: 0 40px;
  height: 360px;
  box-shadow: 0 10px 30px rgba(150, 150, 150, .6);
  border-radius: 10px;
  button {
    visibility: visible;
    padding: 10px 0;
    width: 460px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.2px;
    margin-top: 20px;
    color: white;
    background-color: rgba(20, 65, 255, 0.8);
    border-radius: 4px;
  }
  button:hover {
    background-color: rgba(0, 35, 205, 0.8);
  }
  button:disabled {
    background-color: rgba(0, 35, 205, 0.4);
  }
}
`;