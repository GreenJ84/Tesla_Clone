import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const FinalOrder = (props: {subTot: number}) => {
    const nav = useNavigate();
    const { subTot } = props;
  
    const getTax = (value: number) => {
        return Math.round((value * .103)*100)/100
    }
    
    return (
        <Container>
            <div>
                <div>
                    <p>Subtotal</p>
                    <p>Shipping</p>
                    <p>Sales Tax</p>
                    <h2>Total Due</h2>
                </div>
                <div>
                    <p> $ { subTot }.00</p>
                    <p> Free </p>
                    <p> $ { getTax(subTot)} </p>
                    <h2> $ { subTot + getTax(subTot) }</h2>
                </div>
            </div>
        </Container>
    );
};

export default FinalOrder;

const Container = styled.div`
    margin-bottom: 50px;
    >div{
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        line-height: 28px;
        >div{
            >p{
                color: rgba(60, 60, 60);
                margin-bottom: 10px;
            }
            >h2{
                color: black;
                font-weight: 600;
                font-size: 26px;
                letter-spacing: 1.2px;
                margin-top: 20px;
            }
        }
        >div:nth-of-type(2){
        text-align: end;
        }
    }
    @media screen and (min-width: 1280px) {
        margin: 0;
        width: 540px;
        padding: 0 40px;
        height: 360px;
        box-shadow: 0 10px 30px rgba(150, 150, 150, .6);
        border-radius: 10px;
    }
`;