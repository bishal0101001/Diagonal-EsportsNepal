import React from "react";

import { rankData as rawData } from "./../services/rankData";

import EventTable from "../components/EventTable";
import Tournaments from "./../components/Tournaments";

const HomePage = () => {
  return (
    <div className="__homepage">
      <EventTable data={rawData} />
      <Tournaments />
    </div>
  );
};

export default HomePage;
