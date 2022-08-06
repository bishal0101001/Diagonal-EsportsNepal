import React from "react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ data }) => {
  return (
    <table className="__table">
      <TableHeader />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
