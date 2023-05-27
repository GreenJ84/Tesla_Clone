import styled from "styled-components";

export const OrderPageContainer = styled.main`
  position: relative;
  width: 670px;
  margin: 0 auto 0;
  padding: 7vh 0 0;
  >button{
    position: relative;
    right: 2px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 24px;
    color: rgba(80, 80, 80, .9);
  }
  >button:hover{
    color: black;
  }
  >p{
    font-size: 20px;
    letter-spacing: 1.1px;
    word-spacing: 1.4px;
  }
@media only screen and (max-width: 750px){
  width: 80vw;
  padding: 10vh 0 0;
}
  @media only screen and (min-width: 1600px){
  width: 1100px;
  padding: 10vh 0 0;
}
`;

export const Order1Container = styled.form`
  h1{
    font-size: 56px;
    font-weight: 500;
    letter-spacing: 1.2px;
  }
  > div{
    display: flex;
    align-items: center;
    >input{
      margin-right: 10px;
      border: 2.5px solid black;
      border-radius: 3px;
      appearance: none;
    }
    >input::before{
      position: relative;
      top: -4px;
      left: -4px;
      visibility: hidden;
      background: transparent;
      font-size: 16px;
      font-weight: 600;
      content: '✓';
      color: black;
    }
    >input:checked::before{
      visibility: visible;
    }
    > label{
      font-size: 20px;
      font-weight: 500;
      color: rgba(90, 90, 90);
    }
  }
  >h2:first-of-type{
    margin-top: 36px;
    margin-bottom: 8px;
  }
  >h2{
    font-size: 32px;
    font-weight: 550;
  }
@media only screen and (min-width: 1600px){
  h1{
    margin-bottom: 20px;
  }
}
`;

export const Form = styled.fieldset`
  display: flex;
  justify-content: space-between;
  input[type="radio"]{
    position: relative;
    margin-right: 4px;
    width: 28px;
    height: 28px;
    border: 1.5px solid rgba(80, 80, 80);
    border-radius: 50%;
    appearance: none;
  }
  input[type="radio"]:checked::after{
    content: "•";
    position: absolute;
    top: -37.5px;
    left: -0.5px;
    font-size: 60px;
    color: rgba(50, 50, 50);
  }
  input[type="radio"] + label{
    font-size: 20px;
  }
  div{
    width: 47.5%;
    >label{
      display: block;
      font-size: 19px;
      font-weight: 600;
      color: rgba(110, 110, 110);
      margin-bottom: 8px;
    }
    >input{
      display: block;
      font-size: 18px;
      font-weight: 500;
      background-color: rgba(200, 200, 200, .22);
      border-radius: 5px;
      width: 100%;
      height: 50px;
      margin-bottom: 28px;
    }
  }
  `;

export const Form2 = styled.fieldset`
  label{
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 20px;
  }
  div:last-of-type{
    margin-bottom: 32px;
  }
  input[type="radio"]{
    position: relative;
    margin-right: 4px;
    width: 28px;
    height: 28px;
    border: 1.5px solid rgba(80, 80, 80);
    border-radius: 50%;
    appearance: none;
  }
  input[type="radio"]:checked::after{
    content: "•";
    position: absolute;
    top: -37.5px;
    left: -0.5px;
    font-size: 60px;
    color: rgba(50, 50, 50);
  }
  input[type="radio"] + label{
    font-size: 20px;
  }
  }
  `;

export const Order2Body = styled.div`
  padding-bottom: 100px;
  postion: relative;
  display: flex;
  flex-direction: column;
  width: 700px;
  >h1{
    position: relative;
    bottom: 16px;
    font-size: 60px;
    font-weight: 500;
  }
  >p{
    font-size: 19px;
    letter-spacing: 1.05px;
  }
@media screen and (min-width: 1600){
  max-width: 1100px;
}
@media screen and (max-width: 7500px) {
  max-width: 90vw;
}
`;

export const Order2Container = styled.div`
  display: flex;
  >div{
    display: flex;
    flex-direction: column;
    >ul{
      padding: 30px 0;
      margin-bottom: 70px;
      border-bottom: 1px solid grey;
    }
    >p:first-of-type{
      font-size: 19px;
      font-weight: 500;
      margin-bottom: 34px;
      color: rgba(30,30,30)
    }
    >p:nth-of-type(2){
      font-size: 18px;
      font-weight: 350;
      letter-spacing: 1.04px;
      margin-bottom: 32px;
    }
    >p:nth-of-type(3){
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 30px;
      letter-spacing: 1.04px;
      word-spacing: 1.2px;
      color: rgba(90, 90, 90);
      >span{
        color: inherit;
        border-bottom: 1.5px solid black;
        :hover{
          border-bottom: 2px solid black;
          color: black;
        }
      }
    }
  }
@media screen and (min-width: 1600px) {
  justify-content: space-between;
  >div>ul{
    border-bottom: none;
  }
  >div:first-of-type{
    min-width: 700px;
    margin-right: 80px;
  }
  >div:nth-of-type(2){
    min-width: 500px;
    padding: 20px 25px;
    border-radius: 5px;
    box-shadow: 0 4px 20px rgba(0,0,0,.2);
  }
}
@media screen and (max-width: 1600px) {
    flex-direction: column;
  }
`;

export const Address = styled.div`
  letter-spacing: 1.1px;
  line-height: 28px;
  margin-bottom: 27px;
  >div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    >h3{
      font-size: 20px;
      font-weight: 350;
      color: rgba(90, 90, 90);
      margin-bottom: 6px;
    }
    >button{
      position: relative;
      right: 26px;
      font-size: 20px;
      color: rgba(80, 80, 80);
      border-bottom: 1.5px solid rgba(80, 80, 80);
      line-height: 24px;
      :hover{
        border-bottom: 3px solid rgba(80, 80, 80);
        line-height: 25.5px;
        color: black;
      }
    }
  }
  >p{
      font-size: 20px;
      font-weight: 500;
      color: black;
  }
`;

export const OrderButton = styled.button`
padding: 10px 40px;
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
