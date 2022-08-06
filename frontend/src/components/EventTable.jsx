import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { paginate } from "../utils/paginate";

import Table from "./common/Table";
import EventInfo from "./common/EventInfo";
import Paginator from "./common/Paginator";

import { tableHeaderAction } from "../actions/tournamentDataActions";
// import { tableDataAction } from "./../actions/tournamentDataActions";

const EventTable = ({ data }) => {
  const dispatch = useDispatch();

  const columns = [
    { path: "rank", label: "#RANK" },
    { path: "team", label: "TEAM" },
    { path: "placement", label: "PLACEMENT PTS" },
    { path: "kill", label: "KILL PTS" },
    { path: "total", label: "TOTAL PTS" },
  ];

  const sortColumnData = useSelector((state) => state.sortColumn);

  const [currentPageNo, setCurrentPageNo] = useState("");
  const [pageSize, setPageSize] = useState("");

  const setCurrentPage = (currentPage) => {
    setCurrentPageNo(currentPage);
  };
  const setPageSizer = (pageSize) => {
    setPageSize(pageSize);
  };

  const sortedData = _.orderBy(
    data,
    [sortColumnData?.path],
    [sortColumnData?.order]
  );
  const paginatedData = paginate(sortedData, pageSize, currentPageNo);

  useEffect(() => {
    dispatch(tableHeaderAction(columns));
  });

  return (
    <div className="__event_table">
      <div className="event-info-container">
        <EventInfo />
        <div className="table-container">
          <div className="table-only-container">
            <Table data={paginatedData} />
          </div>
          <div className="pagination">
            <Paginator
              rankData={data}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSizer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
