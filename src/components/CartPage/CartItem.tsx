/** @format */

import styled from "styled-components";
import { carData } from "../../teslaCarInfo";

interface CartProps {
  product: carData;
}

const CartItem = (props: CartProps) => {
  const { product } = props;
  return (
    <Container>
      <img
        src={`/images/${product.backgroundImg}`}
        alt={product.title}
      />
      <div>
        <p>{product.title}</p>
        <div className="flex">
          <p>
            Quantity: <input
            type="number"
            value={product.quantity}
            min={0}
            max={3}
          />
          </p>
          <p>Remove</p>
        </div>
      </div>
      <p>${product.price}.00</p>
    </Container>
  );
};

export default CartItem;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 158px;
  >img{
    height 100px;
    width: 100px;
  }
  >div{
    position: relative;
    left: -80px;
    top: -20px;
    >p{
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 1.2px;
      margin-bottom: 5px;
    }
    >div{
      font-size: 18px;
      >p:nth-of-type(2){
        padding-bottom: .5px;
        color: rgba(80, 80, 80);
        border-bottom: 1.5px solid black;
      }
      >p:nth-of-type(2):hover{
        padding-bottom: 0px;
        color: rgba(0, 0, 0);
        border-bottom: 2px solid black;
      }
    }
  }
  >p{
    position: relative;
    top: -38px;
    font-size: 22px;
    font-weight: 500;
  }
`;
