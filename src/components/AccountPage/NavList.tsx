import styled from "styled-components";
import { ArrowRightOnRectangleIcon, CreditCardIcon, HomeIcon, InboxStackIcon, RectangleStackIcon, UserIcon } from '@heroicons/react/24/outline';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLogout } from "../../app/Store/User/userSlice";

const NavList = (props: {wide: boolean, toggle: Function}) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    return (
        <NavListContainer wide={props.wide}>
            <li onClick={() => props.toggle()}>
                <HomeIcon className={ ActiveIcon } />
                Dashboard</li>
            <li>
                <UserIcon className={ IconStyle } />
                Profile Settings
            </li>
            <li>
                <CreditCardIcon className={ IconStyle } />
                Payment Method
            </li>
            <li>
                <InboxStackIcon className={ IconStyle } />
                Loot Box
            </li>
            <li>
                <RectangleStackIcon className={ IconStyle } />
                Order History</li>
            <li 
                onClick={() => { 
                    dispatch(setLogout())
                    nav("/")
                }}
            >
                <ArrowRightOnRectangleIcon className={ IconStyle }/>
                Sign Out
            </li>
        </NavListContainer>
    )
}
export default NavList;

export const NavListContainer = styled.ul`
    list-style: none;
    >li{
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        font-size: ${(props:{wide: boolean }) => props.wide ? "25px;" : "20px;"}
        font-weight: 600;
        letter-spacing: 1.15px;
        color: rgba(90,90,90);
        :hover{
            color: black;
        }
    }
`;

export const IconStyle = 'inline w-10 h-10 mr-4 px-[8px] py-[8px] rounded-[50%] hover:bg-[rgba(90,90,90,.1)]';
export const ActiveIcon = `${IconStyle} bg-[rgba(90,90,90,.2)]`;