import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { selectCars } from '../app/Store/Car/carSlice'
import { useAppDispatch } from '../app/Utils/hooks/useAppDispatch'
import { useAppSelector } from '../app/Utils/hooks/useAppSelector'
import { carsData } from '../teslaCarInfo'

interface DisplayProps{
    id: number
    title: string
    backgroundImg: string
    homeRef: React.RefObject<HTMLDivElement>
}

const CarDisplay = (props: DisplayProps) => {
  let myRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCars);

  return (
    <Container ref={myRef}>
      <div>
        <h1>
          {props.id}
        </h1>
        <p>
          Schedule a Demo Drive
        </p>
      </div>
      <div>
        <Link to={`/cars/${props.id}`}>
          <Button>
            Custom Order
          </Button>
        </Link>
        <Link to={`/cart`}>
          <Button>
            View Inventory
          </Button>
        </Link>
      </div>
      {props.id !== carsData.length &&
        <DownArrow
          onClick={() =>
            props.homeRef?.current?.scrollTo({
              behavior: 'smooth',
              top: cars[props.id].ref.offsetTop
            })
          }
          src='images/down-arrow.svg'
        />
      }
    </Container>
  )
}

export default CarDisplay;

const Container = styled.div`

`;

const Button = styled.button`

`;

const DownArrow = styled.img`

`;


