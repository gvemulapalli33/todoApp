import React from "react";
import "./Todo.css";
import { post, deleteReq } from "../utilities.js";

const Todo= ({todoItem, reloadTodos}) => {

  const handleDelete = () => {
    deleteReq('/api/delete-todo', { id: todoItem._id }).then(reloadTodos);
  };

  const handleCheckbox = () => {  
    post("/api/todo-completed", {
      content: todoItem.content,
      completed: !todoItem.completed,
      id: todoItem._id
    }).then(reloadTodos); 
  };
  
  return (
    <>
    <label htmlFor={`todo-${todoItem._id}`}></label>
      <input
        id={`todo-${todoItem._id}`}
        className="checkbox"
        type="checkbox"
        onChange={handleCheckbox}
        checked={todoItem.completed}
      />
      <p className={`Todo-content ${todoItem.completed ? "completed" : null}`}>
      {todoItem.content}</p>
      <button aria-label="delete" className="delete" onClick={handleDelete}> 
        <span role="delete-image" aria-label="delete" title="delete this todo">
          ❌
        </span>
      </button>
      </>
  );
}
export default Todo;
