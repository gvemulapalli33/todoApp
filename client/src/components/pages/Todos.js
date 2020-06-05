import React, {useState, useEffect} from "react";
import Todo from "./Todo";
import UserInput from "./UserInput";
import { get } from "../utilities.js";
import { GlobalStyle, defaultTheme, darkTheme, primaryFont, typeScale } from "../../utils";
import styled from "styled-components";
import "./Todos.css";

const Todos = () => {
  
  let [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (status !== 'loading') return;

    get("/api/todos").then((todos) => {
      setTodos(todos);
      setStatus('loaded');
    });
  }, [status]);


  return (
    <>
      <header>To Do's for the Day!</header>
      <main>
      <section>
        <UserInput reloadTodos={() => setStatus('loading')} />
          {todos ? (
          <ul className="Todos-list">
            {todos.map((todo, index) => (
              <li key={`listItem-${index}`}>
                <Todo todoItem={todo} 
                  reloadTodos={() => setStatus('loading')}
                />
              </li>
            ))}
          </ul>
          ) :  (
          <p className={styles.loading}>loading todos...</p>
        )}
      </section>
      </main>
    </>
  );
}

export default Todos;
