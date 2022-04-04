import React, { useState, useEffect } from "react";
import Compo1 from "./Compo1";

const getLocalStorageDAta = () => {
  let list = localStorage.getItem("lists2");
  if (list) {
    return JSON.parse(localStorage.getItem("lists2"));
  } else {
    return [];
  }
};
const ToDo_CutLine = () => {
  const [setitem, setNewItem] = useState("");
  const [newdata, newSetData] = useState(getLocalStorageDAta());

  const itemEvent = (event) => {
    setNewItem(event.target.value);
  };
  const clickItem = () => {
    newSetData((oldData) => {
      return [...oldData, setitem];
    });
    setNewItem("");
  };
  useEffect(() => {
    localStorage.setItem("lists2", JSON.stringify(newdata));
  }, [newdata]);

  return (
    <div className="main_div">
      <div className="center_div">
        <br />
        <h1>TODo List</h1>
        <br />
        <input
          type="text"
          placeholder="Enter Your Task"
          value={setitem}
          onChange={itemEvent}
        />
        <button onClick={clickItem}>+</button>
        <ol>
          {newdata.map((val, index) => {
            return <Compo1 text={val} key={index} />;
          })}
        </ol>
      </div>
    </div>
  );
};

export default ToDo_CutLine;
