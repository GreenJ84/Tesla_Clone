import React from 'react'
import styled from 'styled-components';
import { carData } from '../../teslaCarInfo';

interface CartProps{
    product: carData
}

const CartItem = (props: CartProps) => {
    const { product } = props;
  return (
    <Container>
        <img src={product.backgroundImg} alt={product.title} />
        <div>
            <p>{ product.title}</p>
            <div>
                <input type="number" value={ product.quantity} min={0} max={3} />
                <p>Remove</p>
            </div>
              <p>${ product.price }.00</p>
        </div>
    </Container>
  )
}

export default CartItem

const Container = styled.li`

`;