import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";

import { sortColumnAction } from "../../actions/tournamentDataActions";

const TableHeader = () => {
  const dispatch = useDispatch();
  const {
    headers: { columns },
  } = useSelector((state) => state.tableData);
  const sortColumnData = useSelector((state) => state.sortColumn);

  const raiseSort = (path) => {
    let sortColumn = { ...sortColumnData };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    dispatch(sortColumnAction(sortColumn));
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumnData.path) return null;
    if (sortColumnData.order === "asc") return <ArrowDropUpSharpIcon />;
    return <ArrowDropDownSharpIcon />;
  };

  return (
    <thead className="__table-header">
      <tr>
        {columns &&
          columns?.map((column) => (
            <th
              key={column.path}
              className={column.path === "rank" ? "thead-rank" : ""}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
