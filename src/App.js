import React, { useState, useEffect } from "react";
import css from './App.css';

const App = () => {
  const getLocalItem = () => {
    let list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(getLocalItem());

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  console.log(newItem);

  function addItem() {
    if (!newItem) {
      alert("Please Enter an Task");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function deleteall() {
    alert("Are you sure to delete all task");
    setItems([]);
    }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <React.Fragment>
      <h1 className="header" align="center">To Do List App</h1>
      <div align="center">
        <input
          type="text"
          placeholder="Enter a Task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
      <div align="center">
        <button className="btn" onClick={() => addItem()}>Add Task</button>
      </div>
      <div align="center">
        <ol>
          {items.map((item) => {
            return (
              <div>
                <li className="listing" key={item.id} onClick={() => setShowEdit(item.id)}>
                  {item.value}
                  <button className="remove" onClick={() => deleteItem(item.id)}> ⊗ Remove</button>
                </li>
                {showEdit === item.id ? (
                  <div>
                    <input
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <button className="update" onClick={() => editItem(item.id, updatedText)}>
                      Update Task
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </ol>
      </div>
      <div align="center">
        <button className="deleteAll" onClick={() => deleteall()}>Delete All Task</button>
      </div>
      <br />
      <br />
    </React.Fragment>
  );
};

export default App;
