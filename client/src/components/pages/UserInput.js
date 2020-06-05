import React, { useState } from "react";
import "./UserInput.css";
import { post } from "../utilities.js";

const UserInput = ({reloadTodos}) => {

let [userTodo, setUserTodo] = useState('');

   const handleChange = (event) => {
     userTodo = event.target.value;
     setUserTodo(userTodo);
   }

  const handleAddTodo =  () => {
    let newTodo = {content: userTodo, completed: false};
    if (userTodo.length > 0) {
      post("/api/todo", newTodo).then(() => {
        setUserTodo('');
        reloadTodos();
      }); 
    }
  };

    return (
      <section>
        <label htmlFor="userInput"></label>
        <input
          className="UserInput-InputBox"
          id="userInput"
          type="text"
          value={userTodo}
          onChange={handleChange}
        ></input>
        <button className="UserInput-Add" onClick={handleAddTodo}>
          Add
        </button>
      </section>
    );
}

export default UserInput;
