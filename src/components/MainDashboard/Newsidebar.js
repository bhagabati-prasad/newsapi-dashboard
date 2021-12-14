import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

const options = [
  { label: "AWS", value: "AWS" },
  { label: "IBM", value: "IBM" },
];

const options1 = [
  { label: "Infosys", value: "Infosys" },
  { label: "TCS", value: "TCS" },
];
const baseURL = "https://newerver.herokuapp.com/newslist";
const Example = () => {
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [filteredlist, setFiltered] = useState([]);
  const [filteredlist2, setFiltered2] = useState([]);
  const [total, setTotal] = useState([]);
  const [menu, setMenu] = useState("true");
  console.log("1st", selected);
  console.log("2nd", selected2);
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response?.data);
      console.log(response);
      var arr2 = ["IBM", "AWS"];
      if (!!selected.length) {
        let res = response?.data.filter((item) =>
          selected.map((s) => s?.label).includes(item?.dictionary_token)
        );
        console.log("filtered", res);
        if (!!res.length) {
          setFiltered(res);
          console.log("Array1", filteredlist);
        }
      }
      if (!!selected2.length) {
        let res2 = response?.data.filter((item) =>
          selected2.map((s) => s?.label).includes(item?.dictionary_token)
        );
        console.log("filtered", res2);
        if (!!res2.length) {
          setFiltered2(res2);
          console.log("Array2", filteredlist2);
        }
      }
      setTotal([...total, ...filteredlist]);
      setTotal([...total, ...filteredlist2]);
      console.log(total);
    });
  }, [selected, selected2]);

  return (
    <div style={{ width: "120px" }}>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        // disableSearch={true}
        // displayValue="name"
        // isOpen={true}
      />

      <MultiSelect
        options={options1}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default Example;
