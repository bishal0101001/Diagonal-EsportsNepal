import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerForTournamentAction } from "../actions/tournamentActions";

const Event = ({ title, participants }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  // console.log(userInfo);
  const { pathname: path } = useLocation();
  const handleClick = () => {
    console.log(path);
    dispatch(registerForTournamentAction("asd"));
    navigate(`${userInfo ? path : ""}/register`);
  };

  return (
    <div className="__event">
      <div className="container">
        <h1>{title}</h1>
        <div className="_player-container">
          {participants.map((player) => {
            return (
              <div key={player.id}>
                <img src={player.img} alt="" />
                <span>{player.name}</span>
              </div>
            );
          })}
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 1</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 2</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 3</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 4</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 5</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 6</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 7</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 8</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 9</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 10</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 11</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 12</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 13</span>
          </div>
          <div>
            <img src="/imgs/solo-clash.webp" alt="" />
            <span>Player 14</span>
          </div>
        </div>
      </div>
      <div className="_sidebar">
        <h1>Rules</h1>
        <div className="_rules-container">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, repellat!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto,
              consequuntur?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
              cumque.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              distinctio?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestiae, pariatur.
            </li>
          </ul>
        </div>
        <div className="_register-container">
          <button className="register" onClick={handleClick}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
