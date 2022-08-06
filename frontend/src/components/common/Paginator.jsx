import React, { useState, useEffect } from "react";

import { Pagination } from "@mui/material";

const Paginator = ({ rankData, setCurrentPage, setPageSize }) => {
  const pageSize = 10;
  const pages = rankData.length > pageSize ? (rankData.length > 20 ? 3 : 2) : 1;
  const [currentPageNo, setCurrentPageNo] = useState("1");

  useEffect(() => {
    setCurrentPage(currentPageNo);
    setPageSize(pageSize);
  });

  const handleChange = (event, value) => {
    setCurrentPageNo(value);
  };

  return (
    <div>
      <Pagination
        count={pages}
        size="large"
        color="primary"
        className="pagination-nav"
        onChange={handleChange}
      />
    </div>
  );
};

export default Paginator;
