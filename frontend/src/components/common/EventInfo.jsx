import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EventInfo = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div className="__event-info">
      <h2>Grand Squad Clash</h2>
      <div className="info">
        <ul className="info-titles">
          <li>Pool Prize:</li>
          <li>Time:</li>
          <li>Round:</li>
        </ul>
        <ul className="info-values">
          <li>Rs 10,000</li>
          <li>06:00 - 06:30</li>
          <li>Second</li>
        </ul>
      </div>
      <div className="button-container">
        <Link to={userInfo ? "/events/grand-event" : "/register"}>
          <button className="register">Register now</button>
        </Link>
      </div>
    </div>
  );
};

export default EventInfo;
