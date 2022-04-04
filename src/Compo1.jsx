import React, { useState } from "react";
const Compo1 = (props) => {
  const [line, newLine] = useState(false);

  const cutLine = () => {
    newLine(true);
  };
  return (
    <div className="todo_style">
      <span onClick={cutLine}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>
      <li style={{ textDecoration: line ? "line-through" : "none" }}>
        {props.text}
      </li>
    </div>
  );
};

export default Compo1;
