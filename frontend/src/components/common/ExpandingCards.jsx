import React from "react";
import ExpandingCard from "./ExpandingCard";

const ExpandingCards = () => {
  return (
    <div className="__expanding-cards">
      <ExpandingCard
        img="/imgs/grand-squad-clash.jpg"
        heading="Grand Squad Clash"
      />
      <ExpandingCard img="/imgs/Squad-Battle.jpg" heading="Squad Triumph" />
      <ExpandingCard img="/imgs/Deadly-Duo.jpg" heading="Deadly Duo" />
      <ExpandingCard img="/imgs/solo-clash.webp" heading="Solo Rule" />
    </div>
  );
};

export default ExpandingCards;
