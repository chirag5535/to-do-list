import React, { useState, useEffect } from "react";

const getLocalStorage = () => {
  let list = localStorage.getItem("lists3");
  // console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists3"));
  } else {
    return [];
  }
};

const TODO_List = () => {
  const [setitem, setNewItem] = useState("");
  const [newdata, newSetData] = useState(getLocalStorage());
  const [toogle, setToggle] = useState(true);
  const [editData, setEditData] = useState(null);

  const itemEvent = (event) => {
    setNewItem(event.target.value);
  };
  const clickItem = () => {
    // alert("hello");
    if (!setitem) {
      alert("Please Enter The Data");
    } else if (setitem && !toogle) {
      newSetData(
        newdata.map((elem) => {
          // console.log(elem);
          if (elem.id === editData) {
            return { ...elem, name: setitem };
          }
          return elem;
        })
      );
      setToggle(true);
      setNewItem("");
      setEditData(null);
    } else {
      newSetData((oldData) => {
        const allData = {
          id: new Date().getTime().toString(),
          name: setitem,
        };
        console.log(allData.id);
        // console.log(allData.name);
        return [...oldData, allData];
      });
      setNewItem("");
    }
  };

  const deleteItem = (id) => {
    // console.log(id);
    newSetData((oldData) => {
      return oldData.filter((elem) => {
        // console.log(elem);
        return id !== elem.id;
      });
    });
  };
  const editItem = (id) => {
    const editData = newdata.find((elem) => {
      // console.log(elem);
      return elem.id === id;
    });
    // console.log(editData);
    setToggle(false);
    setNewItem(editData.name);
    setEditData(id);
  };

  useEffect(() => {
    localStorage.setItem("lists3", JSON.stringify(newdata));
  }, [newdata]);

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>TODo List</h1>
          <br />
          <input
            type="text"
            placeholder="Enter Your Task"
            onChange={itemEvent}
            value={setitem}
          ></input>
          {toogle ? (
            <button onClick={clickItem}>+</button>
          ) : (
            <i
              className="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={clickItem}
            ></i>
          )}

          <ol>
            {newdata.map((val) => {
              return (
                <div className="todo_style" key={val.id}>
                  <i
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    onClick={() => editItem(val.id)}
                  ></i>
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => deleteItem(val.id)}
                  ></i>
                  <li>{val.name}</li>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default TODO_List;
