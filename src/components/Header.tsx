import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectCars } from '../app/Store/Car/carSlice';
import { storeType } from '../app/Store/store';
import { useCartState } from '../app/Utils/hooks/useCartState';

interface HeaderType{

}

const Header = (props: HeaderType) => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const { homeRef, bgColor } = props;
    const user = useSelector((state: storeType) => state.user);
    const cars = useSelector(selectCars);
    const [menuStatus, setMenuStatus] = useState(false);
    const cartData = useCartState();

    return (
        <Container>
            <Link to="/">
                <img src="/images/logo.svg" alt="" />
            </Link>

        </Container>
    )
}

export default Header

const Container = styled.div`
    min-height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;