/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";


import { ResourceContainer } from "../../app/Utils/StyledComponents/AccountComponents";

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
        aria-label={props.title}
        className={props.desc && "h-[140px]"}
      />
      <div
        className={
          props.desc
            ? "flex-column px-6 pt-[16px]"
            : "flex justify-between px-6 pt-2"
        }
      >
        <h2 className={props.desc ? "" : "w-[200px]"}>{props.title}</h2>
        {props.desc && <p>{props.desc}</p>}
        {props.link === "View Solar" ? (
          <a
            href={props.site}
            target="_blank"
            rel="noreferrer noopener"
          >
            {props.link}
          </a>
        ) : (
          <button
            onClick={() => {
              props.site
                ? nav(props.site)
                : alert("Car management not available from a clone site.....");
            }}
          >
            {props.link}
          </button>
        )}
      </div>
    </ResourceContainer>
  );
};

export default AccountResources;