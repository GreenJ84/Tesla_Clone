import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface ResourceProps {
    img: string;
    title: string;
    desc?: string;
    link: string;
    site?: string;
}

const AccountResources = (props: ResourceProps) => {
    const nav = useNavigate();

    return (
        <ResourceContainer>
            <img
                src={props.img}
                alt={props.title}
                className={props.desc ? "h-[140px]" : ""}
            />
            <div className={props.desc ? "flex-column px-6 pt-[16px]" : "flex justify-between px-6 pt-2"}>
                <h2
                    className={props.desc? "" : "w-[200px]"}
                >
                    {props.title}
                </h2>
                {props.desc &&
                    <p>{props.desc}</p>
                }
                <button
                    onClick={() => {
                        props.site ?
                            nav(props.site)
                        : 
                            alert('Car management not available from a clone site.....')
                    }}
                >
                    {props.link}
                </button>
            </div>
        </ResourceContainer>
  )
}

export default AccountResources;

const ResourceContainer = styled.li`
    display: inline-flex;
    flex-direction: column;
    width: 390px;
    height: 268px;
    margin: 0 26px 26px 0;
    border-radius: 5px;
    border: 1.4px solid rgba(120,120,120, .5);
    >img{
        border-radius: 5px 5px 0 0;
    }
    >div{
        color: rgba(20,20,20, .8);
        >h2{
            font-size: 15.8px;
            font-weight: 600;
        }
        >p{
            color: inherit;
            margin-bottom: 16px;
        }
        >button{
            border-bottom: 1.5px solid black;
            padding-bottom: 0;
            margin-bottom: 0px;
            line-height: 20px;
            height: 22px;
            :hover{
                border-bottom: 2px solid black;
                line-height: 19px;
        }
        }
    }
`;