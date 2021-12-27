const TableExtract = ({ alldata }) => {
  // console.log({ alldata });
  console.log(alldata.map((data) => data.entity));
  return (
    <table>
      {alldata.map((data, indx) => (
        <tr key={indx}>{data.sentiment}</tr>
      ))}
    </table>
  );
};

export default TableExtract;
