import React from "react";

import Tournaments from "../components/Tournaments";

const Events = () => {
  return (
    <div className="__events_page">
      <div className="event-container">
        <h1>Events</h1>
        {/* <img src="/imgs/grand-squad-clash.jpg" alt="Grand Event" /> */}
        <div className="info-container">
          <h2>LOAD, AIM & FIRE </h2>
          <p>
            Esports NEPAL's tournaments are a revolutionary new way for both
            professional and casual gamers to test their merit against one
            another. Our finely tuned competitive tournaments offer a wide array
            of possibilities for each player's abilities to be shown off to
            their peers. Play tournaments for money on the platform of your
            choice. We offer Xbox One tournaments , as well as PS4 tournaments
            and PC tournaments. And don't worry, with the launch of the new
            consoles, we'll also offer Xbox Series X tournaments and PS5
            tournaments. Only here at Checkmate Gaming will you find the highest
            payouts and value for your competitive dollar when it comes to
            tournaments for money. Our tournaments with cash prizes and speedy
            payouts rival and supersede all other esports and online tournaments
            platforms currently. Sign up and join in on the experience right
            here at Checkmate Gaming.
          </p>
        </div>
      </div>
      <div className="routes">
        <Tournaments />
      </div>
    </div>
  );
};

export default Events;
