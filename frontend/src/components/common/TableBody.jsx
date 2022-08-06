import React from "react";
// import { useSelector } from "react-redux";

const TableBody = ({ data }) => {
  // const { data } = useSelector((state) => state.tableData);
  return (
    <>
      <tbody className="__table-body">
        {data?.map((data) => (
          <tr key={data.id} className={data.rank === 1 ? "first" : ""}>
            <td className="rank">{data.rank}</td>
            <td className="team">{data.team}</td>
            <td>{data.placement}</td>
            <td>{data.kill}</td>
            <td>{data.placement + data.kill}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
