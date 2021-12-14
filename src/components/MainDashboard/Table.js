import * as React from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const Table = ({ alldata }) => {
  const rowStyle = (row, rowIndex) => {
    return rowIndex % 2 === 0
      ? { backgroundColor: "#F9FAFB" }
      : { backgroundColor: "white" };
  };
  const columns = [
    { dataField: "news_headline", text: "Headline" },
    {
      dataField: "sentiment",
      text: "Sentiment",
      style: function callback(cell, row, rowIndex, colIndex) {
        return cell === "POSITIVE" ? { color: "green" } : { color: "red" };
      },
    },
    {
      dataField: "entity[0]",
      text: "entity",
      formatter: (cell, row) => {
        let data = "";
        for (let item in row.entity[0]) {
          data += `${item}: ${row.entity[0][item]},  `;
        }
        return " " + data;
      },
    },
  ];
  return (
    <div>
      <div className="scrolling-header">Reference Table</div>

      <div style={{ width: "90%", marginLeft: "5%", marginTop: "20px" }}>
        <BootstrapTable
          keyField="news_headline"
          data={alldata}
          columns={columns}
          rowStyle={rowStyle}
          pagination={paginationFactory()}
        />
      </div>
    </div>
  );
};

export default Table;
