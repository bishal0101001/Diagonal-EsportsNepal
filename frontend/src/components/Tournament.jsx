import React from "react";
import { Link } from "react-router-dom";

import GroupsIcon from "@mui/icons-material/Groups";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Tournament = ({
  heading,
  img,
  poolPrize,
  participants,
  totalPlayersTitle,
  route,
  auth,
}) => {
  return (
    <div className="__tournament-card">
      <div className="img-container">
        <img src={img} alt={totalPlayersTitle} />
        <h2>{heading}</h2>
      </div>
      <div className="tournament-infos">
        <ul>
          <li>{<LocalAtmIcon />} Pool Prize:</li>
          <li>{poolPrize}</li>
        </ul>
        <ul>
          <li>{<AccessTimeIcon />} Time:</li>
          <li>00:05:59</li>
        </ul>
        <ul>
          <li>{<GroupsIcon />} Participants:</li>
          <li>{participants}</li>
        </ul>
        <button className="register card-btn">
          <Link to={auth ? route : "/register"}>Register Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Tournament;
