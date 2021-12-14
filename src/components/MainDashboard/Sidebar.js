import react, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Sidebar.css";
import data from "./data.json";
import DropdownTreeSelect from "react-dropdown-tree-select";
const baseURL = "https://newerver.herokuapp.com/newslist";

const assignObjectPaths = (obj, stack) => {
  Object.keys(obj).forEach((k) => {
    const node = obj[k];
    if (typeof node === "object") {
      node.path = stack ? `${stack}.${k}` : k;
      assignObjectPaths(node, node.path);
    }
  });
};
export default function Sidebar() {
  const [filtervalues, setValue] = useState([]);
  const onChange = (currentNode, selectedNodes) => {
    console.log("path::", currentNode.path);
    console.log(selectedNodes);
    setValue([...selectedNodes]);
  };
  console.log("filter", filtervalues);
  assignObjectPaths(data);
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response?.data);
      var arr2 = ["IBM", "AWS"],
        res = response?.data.filter(
          (item) => !!arr2.includes(item?.dictionary_token)
        );
      console.log(res);
    });
  }, []);
  return (
    <>
      <div className="Sidebar_Main">
        <DropdownTreeSelect
          data={data}
          onChange={onChange}
          className="bootstrap-demo"
        />
      </div>
    </>
  );
}
