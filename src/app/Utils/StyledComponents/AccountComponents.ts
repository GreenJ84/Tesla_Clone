import styled from "styled-components";

export const AccountContainer = styled.div`
    display: flex;
    ${(props: { wide: boolean }) => props.wide && "padding-top: 140px;"};
`;

export const AccountMain = styled.main`
    max-width: 900px;
    ${(props: { wide: boolean }) => props.wide ? "padding: 0px 0 100px 30px;" : "padding: 86px 0 100px 30px;"}
    >h1{
        font-size: 46px;
        font-weight: 500;
        letter-spacing: 1.15px;
        margin-bottom: 30px;
    }
`;

export const SideMenuContainer = styled.nav`
    width: 405px;
    padding: 0 0 0 60px; 
`;

export const PopupMenuContainer = styled.nav`
    position: fixed;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    padding: 86px 0 0 30px;
    background-color: rgba(240, 240, 240, .94);
    >ul{
        list-style: none;
        >li{
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            font-size: 25px;
            font-weight: 600;
            letter-spacing: 1.15px;
            color: rgba(90,90,90);
            :hover{
                color: black;
            }
        }
    }
`;

export const NavListContainer = styled.ul`
    list-style: none;
    >li{
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        font-size: ${(props: { wide: boolean }) =>
          props.wide ? "25px;" : "20px;"}
        font-weight: 600;
        letter-spacing: 1.15px;
        color: rgba(90,90,90);
        :hover{
            color: black;
        }
    }
`;

export const IconStyle =
    "inline w-10 h-10 mr-4 px-[8px] py-[8px] rounded-[50%] hover:bg-[rgba(90,90,90,.1)]";
  
export const ActiveIcon = `${IconStyle} bg-[rgba(90,90,90,.2)]`;

export const CloseIcon = `absolute ${IconStyle} lg:w-12 lg:h-12 top-4 right-4`;

export const ResourceContainer = styled.li`
  display: inline-flex;
  flex-direction: column;
  width: 390px;
  height: 268px;
  margin: 0 26px 26px 0;
  border-radius: 5px;
  border: 1.4px solid rgba(120, 120, 120, 0.5);
  > img {
    border-radius: 5px 5px 0 0;
  }
  > div {
    color: rgba(20, 20, 20, 0.8);
    > h2 {
      font-size: 15.8px;
      font-weight: 600;
    }
    > p {
      color: inherit;
      margin-bottom: 16px;
    }
    > button, > a {
      border-bottom: 1.5px solid black;
      padding-bottom: 0;
      margin-bottom: 0px;
      line-height: 20px;
      height: 22px;
      :hover {
        border-bottom: 2px solid black;
        line-height: 19px;
      }
    }
  }
`;