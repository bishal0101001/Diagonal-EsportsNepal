import React from "react";

const ExpandingCard = ({ img, heading }) => {
  return (
    <div className="__expanding-card">
      <div className="panel active" style={{ backgroundImage: `url(${img})` }}>
        <h3>{heading}</h3>
      </div>
    </div>
  );
};

export default ExpandingCard;
