import React from "react";
import Event from "../../components/Event";

import { soloPlayers } from "../../services/fakePlayerServices";

const GrandEvent = () => {
  return (
    <div>
      <h1>Grand Event</h1>
      <Event title="Participants" participants={soloPlayers} />
    </div>
  );
};

export default GrandEvent;
